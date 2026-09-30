# Gotcha: Fuente Serif Heredando `font-bold` desde Tailwind

## Síntoma
Los títulos o encabezados con clase `font-serif` (o los elementos `h1`–`h4`) aparecen en negrita a pesar de que el diseño exige peso 400. Esto sucede en particular cuando Tailwind aplica `font-semibold` implícitamente o cuando una clase de componente hereda un peso tipográfico de un ancestro.

## Causa Raíz
Tailwind no resetea `font-weight` en etiquetas de bloque. Si en algún lugar del árbol existe una clase `font-bold` o `font-semibold` en un ancestro, los `h1`–`h4` heredan ese peso. Además, algunos navegadores aplican `bold` a los headings por defecto vía la hoja de estilos del agente de usuario.

## Solución
La regla de reset ya está en `src/index.css` y usa `!important` para ser inanulable:

```css
h1, h2, h3, h4, .font-serif, .font-editorial {
  font-family: var(--font-serif);
  font-weight: 400 !important;
}
```

**Si un nuevo componente necesita texto serif**, usa la clase `font-serif` de Tailwind y confía en que el reset del CSS global lo mantendrá en 400. Nunca añadir `font-bold` o `font-semibold` a un elemento que usa `font-serif`.
