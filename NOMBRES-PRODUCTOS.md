# Guía editorial de nombres comerciales

## Propósito

Esta guía define cómo nombrar los productos de Florería Valeria. Los nombres deben ser claros, elegantes, positivos y fáciles de recordar o solicitar por WhatsApp.

El nombre comercial complementa la fotografía y la descripción; nunca debe inventar flores, colores, formas, usos o contextos que el producto no tenga.

## Implementación técnica

Los nombres comerciales viven en `src/data/productNames.ts`. `src/data/productsData.ts` es un archivo autogenerado y no debe utilizarse como fuente permanente de los nombres visibles.

La asignación utiliza el `cloudinaryId` como referencia estable:

1. Los productos se agrupan por categoría y subcategoría.
2. Cada grupo se ordena naturalmente por el nombre del archivo de Cloudinary.
3. Se asigna el nombre comercial correspondiente.
4. El mismo nombre se muestra en tarjetas, favoritas, vista rápida y mensajes de WhatsApp.
5. Si falta un nombre comercial, se utiliza el nombre técnico como respaldo temporal.

Cambiar el nombre visible no afecta a Cloudinary. Nunca se deben modificar para este fin:

- `id`
- `cloudinaryId`
- `cloudinaryUrl`
- `category`
- `subcategory`
- Carpetas o nombres de archivo en Cloudinary

## Principios obligatorios

### 1. La fotografía y la descripción son la fuente de verdad

Antes de nombrar un producto se deben revisar ambos elementos. Si el nombre menciona una especie, color, forma, complemento o ubicación, esa característica debe estar confirmada.

Ejemplos:

- Si la descripción indica rosas amarillas, puede usarse `Canasta de Rosas Amarillas`.
- Si la imagen contiene flores blancas, no debe llamarse `Altar en Tonos Rosa`.
- Si contiene girasoles y margaritas, no debe llamarse `Arreglo de Rosas`.
- Si la información es insuficiente, debe elegirse un nombre neutral y no inventar detalles.

### 2. Los nombres deben ser sencillos

Se prefieren nombres concretos y naturales. Deben evitarse expresiones grandilocuentes, frases publicitarias y conceptos que parezcan generados automáticamente.

Bien:

- `Corona de Lirios`
- `Girasoles para el Altar`
- `Lirios con Margaritas`
- `Canasta de Rosas Amarillas`

Evitar:

- `Corona Amor Imperecedero`
- `Corona Armonía Celestial`
- `Luz Perpetua`
- `Gratitud Infinita`

### 3. No se permiten series mecánicas

Cada producto debe tener un nombre individual. No se puede repetir una base agregando adjetivos para crear variantes aparentes.

Ejemplo incorrecto:

- `Corona de Amor`
- `Corona de Amor Eterna`
- `Corona de Amor Serena`

Tampoco se deben crear nombres mediante una plantilla de base más `Radiante`, `Especial`, `Serena`, `Floral` u otro sufijo.

### 4. El nombre no debe repetir la categoría

La categoría ya aparece en la interfaz. El producto debe describir su identidad o composición.

En Quinceañera está prohibido utilizar:

- `de Quince`
- `para Quince`
- `de Quinceañera`

### 5. Todos los nombres deben ser positivos y estar en español

- No se utiliza numeración visible.
- No se mezclan palabras en inglés.
- El nombre debe ser pronunciable y fácil de escribir.
- No se utilizan nombres con connotaciones negativas, angustiosas o ambiguas.
- No debe existir ningún nombre duplicado en el catálogo.

### 6. La forma del producto debe reflejarse en el nombre

Si la descripción contiene `corazón` o indica que el arreglo tiene forma de corazón, el nombre debe incluir explícitamente `Corazón`.

Ejemplos:

- `Corazón de Rosas con Chocolates`
- `Corazón de Gerberas y Claveles`
- `Corona Corazón de Rosas y Margaritas`

## Reglas por categoría

### Ramos elegantes y clásicos

- Utilizar nombres femeninos en español o de uso natural en México.
- Cada nombre debe ser único en todo el catálogo.
- Evitar nombres con asociaciones negativas.
- No agregar números, colores ni descriptores al nombre femenino.

Ejemplos: `Renata`, `Valentina`, `Lucía`, `Elena`.

### Ramos de novia y quinceañera

- Utilizar nombres femeninos con las mismas reglas de los demás ramos.
- No incluir `Novia`, `Quince`, `Quinceañera` ni el nombre de la categoría.

### Bodas, templo y centros de mesa

- Nombrar con las flores dominantes, el color confirmado o la ubicación real.
- `Altar` o `Templo` solo se permiten cuando el producto corresponde a ese lugar.
- No usar `para la ceremonia`, porque es genérico.
- No llamar `Camino de Flores` a un arreglo de altar.

### Cumpleaños

- Cada producto debe tener un nombre individual.
- No utilizar `Fiesta`.
- Priorizar las flores, complementos o una expresión breve como `para celebrar`.
- No crear variantes mediante adjetivos repetidos.

### Canastas

- Puede conservarse `Canasta` para identificar el tipo de producto.
- Mencionar flores o colores solo cuando coincidan con la descripción y fotografía.
- No utilizar `Campestre`.

### Corazones

- Todos los productos cuya descripción mencione corazón deben incluir `Corazón` en el nombre.
- Se pueden mencionar complementos reales como chocolates o perfume.
- Las flores y colores deben coincidir exactamente con el producto.

### Quinceañera: centros de mesa y templo

- No repetir `Quince` ni `Quinceañera`.
- Utilizar la composición real: flores, colores o ubicación.
- Evitar nombres genéricos como `Arreglo Floral` o `para la ceremonia`.

### Eventos religiosos y arreglos de templo

- `Altar` y `Templo` se utilizan solamente en la subcategoría correspondiente.
- El nombre debe describir flores, colores o la ubicación real.
- No utilizar `Celebración religiosa`.
- No utilizar `Camino de Flores` para un arreglo que se coloca en el altar.

### Ermita

En los nombres de esta subcategoría no se utilizan:

- `Altar`
- `Recinto`
- `Jardín`
- `Campestre`
- `Celebración religiosa`

Se deben nombrar directamente las flores o mencionar la ermita cuando sea necesario. Ejemplos: `Cempasúchil Tradicional`, `Margaritas y Crisantemos`, `Flores para la Ermita`.

### Coronas

- Puede conservarse `Corona` para identificar el tipo de producto.
- Si tiene forma de corazón, el nombre también debe incluir `Corazón`.
- Priorizar especies y colores confirmados.
- No utilizar `Floral`, `Flores mixtas`, `Fresca` ni expresiones grandilocuentes.
- Evitar conceptos vagos si es posible describir la composición.

### Cruces

- Puede conservarse `Cruz` para identificar la forma.
- Mencionar las flores o colores confirmados.
- No usar un nombre de corazón, corona o altar.

### Cubre caja

- Puede conservarse `Cubre Caja` para identificar su función.
- Completar el nombre con flores o colores confirmados.
- Evitar conceptos vagos o solemnes en exceso.

### Pie de caja/altar

- No utilizar `Arreglo` ni `Centro` en el nombre visible.
- Utilizar las flores reales o un concepto sencillo de homenaje.
- Los colores deben estar confirmados por la fotografía o descripción.

## Palabras y expresiones excluidas

### Connotación negativa

- Dolor
- Tristeza
- Despedida
- Luto
- Ausencia
- Lágrimas
- Sacrificio
- Espinas
- Olvido
- Soledad
- Remedios
- Pérdida
- Sufrimiento
- Último o última

### Tono pretencioso o artificial

- Imperecedero
- Celestial
- Perpetuo o perpetua
- Infinito o infinita
- Noble
- Divino o divina
- Eterno o eterna como sufijo de una serie
- Sereno o serena como sufijo de una serie

### Expresiones genéricas o prohibidas

- Fiesta
- Para la ceremonia
- Celebración religiosa
- Flores para la comunidad
- Campestre
- Camino de Flores para un arreglo de altar

Las restricciones adicionales de `Ermita`, `Coronas` y `Pie de caja/altar` se aplican solo dentro de esas categorías, tal como se especifica arriba.

## Proceso para nombrar un producto nuevo

1. Confirmar que el `cloudinaryId` sea definitivo.
2. Identificar categoría y subcategoría.
3. Leer la descripción detallada completa.
4. Revisar visualmente la fotografía.
5. Anotar flores, colores, forma, complementos y ubicación confirmados.
6. Aplicar las reglas específicas de la categoría.
7. Proponer un nombre breve en español.
8. Comprobar que no repita la categoría ni use lenguaje excluido.
9. Confirmar que no exista otro producto con el mismo nombre.
10. Agregarlo al grupo correspondiente en `src/data/productNames.ts`.
11. Validar tarjeta, vista rápida, favoritas y mensaje de WhatsApp.

## Lista de comprobación antes de publicar

- [ ] El nombre coincide con la fotografía.
- [ ] El nombre coincide con la descripción.
- [ ] Todas las flores y colores mencionados están confirmados.
- [ ] Incluye `Corazón` cuando la descripción menciona esa forma.
- [ ] No repite la categoría.
- [ ] No contiene numeración.
- [ ] No utiliza una plantilla repetitiva.
- [ ] No contiene palabras negativas, pretenciosas o prohibidas.
- [ ] No está duplicado en el catálogo.
- [ ] Es fácil de pronunciar y solicitar por WhatsApp.

## Validación técnica

Después de modificar nombres se debe confirmar:

- Todos los productos tienen un nombre comercial.
- No existen nombres duplicados.
- Las reglas semánticas por categoría se cumplen.
- `npx tsc --noEmit` termina correctamente.
- `npx expo export --platform web` termina correctamente.

Si se cambia el orden o nombre de archivos existentes en Cloudinary, se debe revisar toda la asignación del grupo: el orden natural del archivo determina qué nombre recibe cada producto.
