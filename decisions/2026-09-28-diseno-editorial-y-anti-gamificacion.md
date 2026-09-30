# Decisión: Diseño Editorial y Filosofía Anti-Gamificación

- **Fecha:** 2026-09-28
- **Estado:** Aprobado / En Producción
- **Impacto:** Sistema de Diseño, Copys y Componentes UI

---

## 1. Contexto y Problema
La gran mayoría de aplicaciones de lectura actuales (Goodreads, StoryGraph, Kindle) reproducen dinámicas de productividad tóxica: barras de progreso agresivas, medidores de velocidad, comparativas sociales de cantidad y alertas ansiosas para no perder la racha. Librito fue concebido para lectores que conciben la lectura como un refugio íntimo, pausado y estético.

## 2. Decisión Tomada
1. Implementar la estética editorial **«Warm Paper & Serif Analytics»**:
   - Fondo papel cálido (`#fdf9f4`), tinta oscura (`#17191c`), arcilla terracota (`#5d2a1a`) y acentos en durazno suave (`#ffdad3`, `#ff866c`).
   - Tipografía serif (`Source Serif 4` / `Signifier`) **estrictamente en peso 400 regular**, forzado con `!important` para anular el negrita automático de Tailwind en etiquetas `h1`-`h4`.
2. Reemplazar métricas de estrés por rituales de apreciación:
   - Registro de «Vibras literarias» (Inolvidable, Reflexivo, Reconfortante, Desafiante, Poético, Melancólico) en lugar de scores matemáticos fríos.
   - Puntos ritual y sellos simbólicos («Café & Tinta», «Santuario Lector») sin clasificaciones punitivas.

## 3. Razón Principal
Proteger la calma del lector. Cada interacción debe sentirse táctil (efecto lomo de libro `book-spine-effect`, texturas de papel y transiciones suaves) y dignificar el tiempo de lectura.

## 4. Consecuencias
- **Positivas:** Identidad visual única y de alta fidelidad percibida; fuerte empatía con el perfil de usuario lector exigente.
- **Negativas / Cuidados:** Exige disciplina estricta al codificar: ningún desarrollador o agente debe introducir componentes con `font-bold` en títulos ni colores neón.
