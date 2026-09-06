/**
 * Sube fotos nuevas a Cloudinary y las registra en `src/data/productsData.ts`.
 *
 * Uso:
 *   node scripts/upload-products.mjs <carpetaFotos> <categorySlug> <subcategorySlug> [cloudinaryFolder]
 *
 * `cloudinaryFolder` es el campo `folder` de la subcategoría en
 * src/data/categories.ts (puede omitirse/estar vacío para categorías planas).
 *
 * El script solo sube imágenes y agrega filas a ALL_PRODUCTS con datos
 * técnicos + un placeholder de nombre/descripción. El nombre comercial y la
 * descripción curada se agregan aparte en productNames.ts/productDescriptions.ts
 * siguiendo NOMBRES-PRODUCTOS.md.
 */

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { extname, basename, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { v2 as cloudinary } from 'cloudinary';

const PROJECT_ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const PRODUCTS_DATA_PATH = join(PROJECT_ROOT, 'src/data/productsData.ts');
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const ARRAY_END_MARKER = '\n];\n\nimport { getDetailedDescription }';

function loadEnvFile() {
  let contents;
  try {
    contents = readFileSync(join(PROJECT_ROOT, '.env'), 'utf8');
  } catch {
    return;
  }
  for (const line of contents.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const equalsIndex = trimmed.indexOf('=');
    if (equalsIndex === -1) continue;
    const key = trimmed.slice(0, equalsIndex).trim();
    const value = trimmed.slice(equalsIndex + 1).trim();
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function parseArgs() {
  const [photosDir, category, subcategory, cloudinaryFolder = ''] = process.argv.slice(2);
  if (!photosDir || !category || !subcategory) {
    fail(
      'uso: node scripts/upload-products.mjs <carpetaFotos> <categorySlug> <subcategorySlug> [cloudinaryFolder]',
    );
  }
  return { photosDir: resolve(process.cwd(), photosDir), category, subcategory, cloudinaryFolder };
}

function listImageFiles(dir) {
  return readdirSync(dir)
    .filter((file) => IMAGE_EXTENSIONS.has(extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'es', { numeric: true, sensitivity: 'base' }));
}

function buildPublicId(category, folder, filename) {
  const base = basename(filename, extname(filename));
  const segments = ['floreria', category, folder, base].filter(Boolean);
  return segments.join('/');
}

async function uploadImage(localPath, publicId) {
  return cloudinary.uploader.upload(localPath, {
    public_id: publicId,
    overwrite: false,
    resource_type: 'image',
  });
}

function nextProductId(productsDataSource) {
  const ids = [...productsDataSource.matchAll(/"id":\s*(\d+)/g)].map((match) => Number(match[1]));
  return Math.max(0, ...ids) + 1;
}

function placeholderName(category, subcategory, index) {
  return `${category}/${subcategory} ${index}`;
}

function formatProductEntry(product) {
  return `  {
    "id": ${product.id},
    "cloudinaryId": "${product.cloudinaryId}",
    "name": "${product.name}",
    "category": "${product.category}",
    "subcategory": "${product.subcategory}",
    "description": "${product.description}",
    "cloudinaryUrl": "${product.cloudinaryUrl}",
    "width": ${product.width},
    "height": ${product.height}
  }`;
}

function insertProductsIntoDataFile(products) {
  const source = readFileSync(PRODUCTS_DATA_PATH, 'utf8');
  const markerIndex = source.indexOf(ARRAY_END_MARKER);
  if (markerIndex === -1) {
    fail(`no se encontró el marcador de cierre de ALL_PRODUCTS en ${PRODUCTS_DATA_PATH}`);
  }

  const before = source.slice(0, markerIndex);
  const after = source.slice(markerIndex);
  const trimmedBefore = before.replace(/\}\s*$/, (match) => (match.trimEnd().endsWith(',') ? match : match.replace('}', '},')));

  const newEntries = products.map(formatProductEntry).join(',\n');
  const updated = `${trimmedBefore}\n${newEntries}${after}`;

  const totalProducts = [...updated.matchAll(/"id":\s*\d+/g)].length;
  const withUpdatedHeader = updated
    .replace(/Generated: .*/, `Generated: ${new Date().toISOString()}`)
    .replace(/Total Products: \d+/, `Total Products: ${totalProducts}`);

  writeFileSync(PRODUCTS_DATA_PATH, withUpdatedHeader);
}

async function main() {
  loadEnvFile();

  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    fail('faltan CLOUDINARY_CLOUD_NAME/CLOUDINARY_API_KEY/CLOUDINARY_API_SECRET en .env');
  }
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

  const { photosDir, category, subcategory, cloudinaryFolder } = parseArgs();
  const files = listImageFiles(photosDir);
  if (files.length === 0) {
    fail(`no se encontraron imágenes (.jpg/.jpeg/.png/.webp) en ${photosDir}`);
  }

  const productsDataSource = readFileSync(PRODUCTS_DATA_PATH, 'utf8');
  let nextId = nextProductId(productsDataSource);

  const uploaded = [];
  for (const file of files) {
    const localPath = join(photosDir, file);
    const publicId = buildPublicId(category, cloudinaryFolder, file);
    process.stderr.write(`Subiendo ${file} -> ${publicId} ... `);
    let response;
    try {
      response = await uploadImage(localPath, publicId);
    } catch (error) {
      console.error('FALLÓ');
      fail(
        `subida de "${file}" falló (${error.message ?? error}). ` +
          `No se modificó productsData.ts. Productos ya subidos a Cloudinary en esta corrida: ` +
          `${uploaded.map((p) => p.cloudinaryId).join(', ') || 'ninguno'}.`,
      );
    }
    process.stderr.write('OK\n');

    uploaded.push({
      id: nextId++,
      cloudinaryId: response.public_id,
      name: placeholderName(category, subcategory, uploaded.length + 1),
      category,
      subcategory,
      description: 'Hermoso arreglo floral.',
      cloudinaryUrl: response.secure_url,
      width: response.width,
      height: response.height,
      localPath,
    });
  }

  insertProductsIntoDataFile(uploaded);

  console.log(
    JSON.stringify(
      uploaded.map(({ id, cloudinaryId, category, subcategory, localPath, cloudinaryUrl }) => ({
        id,
        cloudinaryId,
        category,
        subcategory,
        localPath,
        cloudinaryUrl,
      })),
      null,
      2,
    ),
  );
}

main().catch((error) => fail(error.stack ?? String(error)));
