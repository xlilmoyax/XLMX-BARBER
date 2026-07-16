# AGENTS.md — Instrucciones para agentes (idioma: español)

Breve guía para agentes IA que trabajen en este repositorio. El objetivo es que el agente hable y responda en español por defecto y conozca las convenciones del proyecto.

**Comandos útiles**
- **Instalar dependencias:** `npm install`
- **Desarrollo (servidor Vite):** `npm run dev` (puerto `3000` por defecto)
- **Construir:** `npm run build`
- **Previsualizar build:** `npm run preview`

**Variables de entorno importantes**
- `VITE_SUPABASE_URL` — URL de Supabase (usada en `src/lib/supabaseClient.ts`).
- `VITE_SUPABASE_ANON_KEY` — Key pública de Supabase.
- `GEMINI_API_KEY` — (opcional) clave para integraciones AI descritas en `README.md`.

**Puntos de entrada y archivos clave**
- `package.json` — scripts y dependencias.
- `vite.config.ts` — configuración de Vite (base: `/XLMX-BARBER/`).
- `src/main.tsx` — punto de entrada de React.
- `src/App.tsx` — componente raíz de la app.
- `src/types.ts` — tipos compartidos (revisa `RegisteredUser` y `Screen`).
- `src/lib/supabaseClient.ts` — cliente y mapeos de Supabase (ojo: conversiones snake_case ↔ camelCase).
- `src/components/` — vistas y componentes principales (por ejemplo `HomeView.tsx`, `Header.tsx`, `MembershipsView.tsx`).
- `README.md` — instrucciones de ejecución y notas del proyecto.

Enlaces rápidos:
- [package.json](package.json)
- [vite.config.ts](vite.config.ts)
- [src/main.tsx](src/main.tsx)
- [src/App.tsx](src/App.tsx)
- [src/types.ts](src/types.ts)
- [src/lib/supabaseClient.ts](src/lib/supabaseClient.ts)
- [src/components](src/components)
- [README.md](README.md)

**Convenciones y advertencias**
- Idioma: la app usa strings en español para rutas y pantallas (`Screen` en `src/types.ts`). Responder y generar contenido en español salvo que el desarrollador pida lo contrario.
- Tipos: `RegisteredUser` en `src/types.ts` define `membership` como `'gold' | 'plata' | 'bronce'` y `created_at` en snake_case. En `src/lib/supabaseClient.ts` los mapeos usan `createdAt` y el default de `membership` es `'ninguno'`. Evitar romper la compatibilidad: adapta mapeos si cambias los tipos.
- Rutas y base: Vite está configurado con `base: '/XLMX-BARBER/'`. Tenlo en cuenta al generar URLs relativas.

**Cómo ayudar al equipo**
- Antes de proponer cambios estructurales, ejecuta `npm run dev` y verifica que la UI arranca.
- Para cambios en la base de datos o supabase, revisa `src/lib/supabaseClient.ts` y actualiza los mapeos camelCase/snake_case.
- Al generar o traducir textos, mantener terminología en español consistente con las rutas (`sobre-nosotros`, `servicio-domicilio`, `membresias`, etc.).

Si quieres que expanda estas instrucciones (por ejemplo: reglas de lint, flujo de despliegue, hooks de Git), dime qué área prefieres y lo añado.
