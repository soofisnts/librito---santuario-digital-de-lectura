# Gotcha: Tailwind CSS v4 — No usar `tailwind.config.js`

## Síntoma
El proyecto falla al compilar (`vite build`) o `npx tailwindcss` no detecta las clases personalizadas si se crea un archivo `tailwind.config.js` o `tailwind.config.ts` en la raíz.

## Causa Raíz
El proyecto usa **Tailwind CSS v4** a través del plugin oficial de Vite (`@tailwindcss/vite`). En v4, la configuración **ya no vive en un archivo `tailwind.config`** sino que se declara directamente dentro del CSS mediante directivas `@theme`, `@layer` y la importación raíz `@import "tailwindcss";`.

## Solución
Toda la configuración de diseño va en `src/index.css`:

```css
@import "tailwindcss";

@layer base {
  :root {
    --font-serif: "Source Serif 4", Georgia, serif;
  }
}
```

Si necesitas tokens personalizados (colores, espaciados, radios), agrégalos con `@theme` en ese mismo archivo.

**Nunca crear `tailwind.config.js`** salvo que se migre explícitamente a la API clásica de v3.
