<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Deploy: git push a `main` (verificado seguro)

**Actualizado 2026-06-22.** El miedo previo era que `git push` filtrara `private/`. **Verificado: no ocurre** — `private/` está en `.gitignore` y NO está en `origin/main`. `git push` es seguro para las credenciales.

### Qué construye Vercel
- Vercel construye el **app de la RAÍZ del repo** (root `app/`, root `package.json`), NO `Website/`.
- `Website/` es una copia stale (deuda técnica, pendiente de limpiar). **Editar en la raíz.**
- El flujo viejo de "arrastrar carpeta Website" choca con el límite de 100 archivos de GitHub web → preferir git push.

### Flujo de deploy
1. Editar archivos en la **raíz** del repo.
2. `git commit` por unidad lógica.
3. `git push` a una rama → Vercel hace **preview**; merge/push a `main` → **producción**.

### Reglas de seguridad (mantener)
- `private/`, `.env`, `.env*.local` están en `.gitignore` — mantenerlos así. NUNCA quitarlos del ignore.
- No usar `git add .` a ciegas; añadir archivos explícitos.
- `node_modules/` y `.next/` nunca se commitean — Vercel instala/compila al deployar.
- Secretos reales van en variables de entorno de Vercel (dashboard), no en el repo. Las `NEXT_PUBLIC_*` son públicas por diseño (se incrustan en el bundle).
