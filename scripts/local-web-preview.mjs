import { spawn } from 'node:child_process';
import { watch } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { basename, extname, join, normalize, resolve } from 'node:path';

const PROJECT_ROOT = process.cwd();
const DIST_DIR = resolve(PROJECT_ROOT, 'dist');
const PORT = 4173;
const clients = new Set();
const watchedPaths = ['src', 'assets', 'public', 'App.tsx', 'index.ts', 'app.json'];
const mimeTypes = {
  '.avif': 'image/avif',
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
};

let rebuildTimer;
let rebuilding = false;
let rebuildQueued = false;

const reloadSnippet = `<script>
  const source = new EventSource('/__reload');
  source.onmessage = () => window.location.reload();
</script>`;

const broadcastReload = () => {
  for (const client of clients) client.write('data: reload\n\n');
};

const rebuild = () => {
  if (rebuilding) {
    rebuildQueued = true;
    return;
  }

  rebuilding = true;
  console.log('Recompilando la web…');
  const exportProcess = spawn('npx', ['expo', 'export', '--platform', 'web'], {
    cwd: PROJECT_ROOT,
    stdio: 'inherit',
  });

  exportProcess.on('exit', (code) => {
    rebuilding = false;
    if (code === 0) {
      console.log('Listo. Actualizando el navegador.');
      broadcastReload();
    } else {
      console.error(`La compilación terminó con código ${code}.`);
    }

    if (rebuildQueued) {
      rebuildQueued = false;
      rebuild();
    }
  });
};

const scheduleRebuild = () => {
  clearTimeout(rebuildTimer);
  rebuildTimer = setTimeout(rebuild, 300);
};

for (const watchedPath of watchedPaths) {
  watch(join(PROJECT_ROOT, watchedPath), { recursive: true }, scheduleRebuild);
}

const server = createServer(async (request, response) => {
  if (request.url === '/__reload') {
    response.writeHead(200, {
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Content-Type': 'text/event-stream',
    });
    response.write('\n');
    clients.add(response);
    request.on('close', () => clients.delete(response));
    return;
  }

  const requestPath = decodeURIComponent((request.url ?? '/').split('?')[0]);
  const candidatePath = requestPath === '/'
    ? join(DIST_DIR, 'index.html')
    : normalize(join(DIST_DIR, requestPath));
  const safePath = candidatePath.startsWith(`${DIST_DIR}/`) || candidatePath === DIST_DIR
    ? candidatePath
    : join(DIST_DIR, 'index.html');

  try {
    const fileInfo = await stat(safePath);
    const filePath = fileInfo.isDirectory() ? join(safePath, 'index.html') : safePath;
    const contents = await readFile(filePath);
    const extension = extname(filePath);
    const body = basename(filePath) === 'index.html'
      ? Buffer.from(contents.toString().replace('</body>', `${reloadSnippet}</body>`))
      : contents;

    response.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Type': mimeTypes[extension] ?? 'application/octet-stream',
    });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Archivo no encontrado.');
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Vista previa local: http://localhost:${PORT}`);
  rebuild();
});

process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});
