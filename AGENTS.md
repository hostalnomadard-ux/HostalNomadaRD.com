<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Deploy: drag-and-drop únicamente

**Por qué:** `private/` contiene credenciales. `git push` riesgo de leak accidental.

### Flujo de deploy

1. Claude edita archivos en `Website/` localmente
2. Al terminar: Claude lista qué archivos cambiaron
3. Usuario abre github.com → repo → rama main
4. Usuario arrastra carpeta `Website/` completa al browser
5. GitHub hace commit automático → Vercel autodeploya

### NUNCA hacer

```
git push        ← prohibido (mezcla private/)
git add .       ← prohibido
git commit      ← prohibido
```

### SÍ se puede

```
git status      ← solo leer
git log         ← solo leer
git diff        ← solo leer
```

### Implicaciones para Claude

- Claude edita archivos en `Website/` libremente
- Claude NO crea commits ni hace push
- Al terminar sesión: listar archivos cambiados → usuario arrastra a GitHub
- `node_modules/` nunca se sube — Vercel instala con `npm install` al deployar
