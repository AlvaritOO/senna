# Sitio web — Senna Apart Hotel, Barrio El Tenis (Rancagua)

Sitio estático de una sola página (HTML + CSS + JS, sin dependencias ni build).

- `index.html` — la página completa: hero, servicios, la suite y su tarifa,
  galería con lightbox, ubicación con mapa, reserva por WhatsApp y footer.
- `el-tenis.html` — redirección a `index.html`, para no romper enlaces antiguos.

El sitio cubre **solo la sede de Barrio El Tenis** (Oficial Carlos María
O'Carrol 022, Rancagua). La sede de Requínoa quedó fuera de alcance: sus páginas
y menciones se eliminaron, pero las fotos siguen en `assets/img/requinoa-*.jpg`
y en `../SennaComercioRequinoa/` por si vuelve.

## Ver en local

```bash
python3 -m http.server 4173 --directory sitio-web
# luego abrir http://localhost:4173
```

## Publicar

Basta subir el contenido de esta carpeta a cualquier hosting estático
(Netlify, Vercel, GitHub Pages, cPanel, etc.). No requiere servidor ni base de datos.

## Editar contenido

- Tarifas, textos, distancias y dirección: directamente en `index.html`.
- Logotipo: `assets/logo/` (SVG oficial, versiones navy y blanca). El sitio usa
  la versión blanca en nav, footer y preloader, porque los tres van sobre fondo
  oscuro. El favicon (`favicon.svg`, `.ico`, `apple-touch-icon.png`) se generó
  a partir del isotipo sobre fondo crema.
- Colores y tipografía: variables al inicio de `css/styles.css` (`:root`).
- Mapa: el iframe de la sección Ubicación usa las coordenadas exactas
  `-34.1723848,-70.7346105`.
- Fotos: `assets/img/` (optimizadas a ~1600px). Las originales están en
  `../SennaOcarrolRancagua/`.
- Contacto WhatsApp: buscar `wa.me/` en `index.html`
  (Alexandra Cisterna, anfitriona: +56 9 6607 8526).

## Reserva por WhatsApp

La sección `#reserva` no procesa pagos ni consulta un calendario: arma un
mensaje de WhatsApp con las fechas elegidas y lo abre en `wa.me`. La lógica está
en `js/main.js` (bloque «Reserva: fechas → mensaje de WhatsApp»). La
disponibilidad se confirma a mano por WhatsApp.

## Tarifas publicadas

- **Por noche:** $59.500, IVA incluido, mínimo 1 noche, 2 personas.
- **Mensual:** 12 UF + $65.000 de gastos comunes.

Ambas viven en la tarjeta `.tarifa-card` de `index.html`; el precio por noche
se repite en la nota al pie del formulario de reserva.

## Datos pendientes

- Email de contacto y RUT / razón social (el cliente los dejó fuera por ahora).
- Las distancias de la sección Ubicación vienen de la ficha de Booking
  (calculadas con © OpenStreetMap); se publican tal cual, por decisión del cliente.

## Detalles de estilo

Todo va a canto vivo —formulario de reserva, fotos de galería, controles del
lightbox— salvo los CTA, que llevan un radio mínimo (`--radio-btn: 3px`) para
que se lean como botones. Si agregas componentes, mantén ese criterio.

No hay botón flotante de WhatsApp: los caminos a WhatsApp son el CTA de la
suite (abre la conversación sin fechas, con un mensaje que identifica de dónde
viene el contacto), el formulario de reserva (arma el mensaje con las fechas) y
los enlaces del footer.

## Animaciones

Definidas en `css/styles.css` y `js/main.js`: preloader, ken burns en el hero,
reveal on scroll, contadores, marquee, parallax, lightbox de galería.
Todas se desactivan automáticamente si el visitante tiene activado
"reducir movimiento" (accesibilidad).
