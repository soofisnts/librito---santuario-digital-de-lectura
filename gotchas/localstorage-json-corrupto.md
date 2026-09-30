# Gotcha: `localStorage` con JSON Corrupto — Pantalla Blanca al Recargar

## Síntoma
Después de una sesión de desarrollo con cambios en el modelo de datos (por ejemplo, añadir un nuevo campo a `Book` o `UserProfile`), el usuario recarga la app y ve una pantalla en blanco. La consola muestra un error de tipo `TypeError: Cannot read properties of undefined`.

## Causa Raíz
`localStorage` almacenó el estado bajo el esquema antiguo. Cuando el código actualizado intenta acceder a un campo que no existía (ej. `monthlyBenefitUnlocked` en `UserProfile`), la desestructuración o el acceso directo falla silenciosamente o lanza error.

## Solución
Todos los inicializadores de `LibritoContext.tsx` ya usan el patrón correcto:

```ts
const [user, setUser] = useState<UserProfile>(() => {
  const saved = localStorage.getItem('librito_user');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return {
        ...INITIAL_USER,  // ← siempre el fallback con el esquema actual
        ...parsed,        // ← encima, solo los campos que existen
        monthlyBenefitUnlocked: parsed.monthlyBenefitUnlocked ?? false, // ← valores nuevos con fallback
      };
    } catch {
      return INITIAL_USER; // ← JSON corrupto → reseteo limpio
    }
  }
  return INITIAL_USER;
});
```

**Regla:** Al añadir un campo nuevo a `UserProfile`, `Book` o `CommunityPost`, siempre:
1. Añadir el campo con valor por defecto en `INITIAL_*` de `src/data/mockData.ts`.
2. Hacer merge explícito en el inicializador con el operador `??` para el nuevo campo.
3. Mantener el bloque `try/catch` con fallback.
