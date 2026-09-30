# Decisión: Sistema de Beneficios Mensuales en Librerías Asociadas

- **Fecha:** 2026-09-28
- **Estado:** Aprobado / En Producción
- **Impacto:** `src/components/MonthlyBenefitCard.tsx`, `src/components/GoalSettingModal.tsx`, `src/data/bookstores.ts`

---

## 1. Contexto y Problema
En lugar de insignias virtuales vacías, Librito busca conectar la lectura digital con el ecosistema cultural físico. El usuario necesita un incentivo tangible que apoye las librerías independientes y premie la constancia sin convertir la lectura en una carrera de velocidad.

## 2. Decisión Tomada
1. Establecer una meta mensual flexible seleccionable por el lector (de 1 a 20 libros, valor por defecto: 4 libros).
2. Vincular el cumplimiento de la meta mensual al desbloqueo de un cupón tangible (`librito-oct15` con 15% de descuento en caja) aplicable en una red curada de 5 librerías asociadas de Buenos Aires:
   - El Ateneo Grand Splendid (Recoleta)
   - Librería Eterna Cadencia (Palermo Soho)
   - Librería Falena (Chacarita)
   - Librería Céspedes (Colegiales)
   - Clásica y Moderna (San Nicolás)
3. Regla ética de perseverancia de beneficios: Si un usuario ya desbloqueó su beneficio del mes y posteriormente decide aumentar su objetivo de lectura (por ejemplo, de 3 a 5 libros), **el beneficio de 15% permanece desbloqueado y activo** (`monthlyBenefitUnlocked: true`). No se le quita un derecho ganado.

## 3. Razón Principal
Respetar los principios éticos del diseño de comportamiento: celebrar el hábito sin castigar la ambición del lector cuando ajusta sus metas hacia arriba.

## 4. Consecuencias
- **Positivas:** Refuerza la confianza del usuario, vincula el producto digital con el comercio de proximidad y genera lealtad real.
- **Negativas / Cuidados:** La lógica de cálculo en `LibritoContext` debe chequear siempre tanto el flag `monthlyBenefitUnlocked` como `monthlyCompleted >= monthlyGoal`.
