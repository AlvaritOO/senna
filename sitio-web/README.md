# Sitio web — Senna Apartamentos con Servicio Hotelero

Sitio estático (HTML + CSS + JS, sin dependencias ni build). Páginas:

- `index.html` — portada de la marca con ambas sedes
- `el-tenis.html` — Senna Barrio El Tenis (Rancagua), 20 suites, tarifa 12 UF
- `requinoa.html` — Senna Requínoa (Comercio 15), estudio urbano, $280.000

## Ver en local

```bash
python3 -m http.server 4173 --directory sitio-web
# luego abrir http://localhost:4173
```

## Publicar

Basta subir el contenido de esta carpeta a cualquier hosting estático
(Netlify, Vercel, GitHub Pages, cPanel, etc.). No requiere servidor ni base de datos.

## Editar contenido

- Tarifas y textos: directamente en cada archivo `.html`.
- Colores y tipografía: variables al inicio de `css/styles.css` (`:root`).
- Fotos: `assets/img/` (optimizadas a ~1600px). Las originales están en
  `../SennaOcarrolRancagua/` y `../SennaComercioRequinoa/`.
- Contacto WhatsApp: buscar `wa.me/` en los HTML
  (Alexandra Cisterna, anfitriona de ambas sedes: +56 9 6607 8526).

## Animaciones

Definidas en `css/styles.css` y `js/main.js`: preloader, ken burns en heros,
reveal on scroll, contadores, marquee, parallax, lightbox de galería.
Todas se desactivan automáticamente si el visitante tiene activado
"reducir movimiento" (accesibilidad).
