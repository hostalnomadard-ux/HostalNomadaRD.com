# Hostal Nómada — Homepage Redesign

**Date:** 2026-05-27  
**Status:** Pending implementation  
**Replaces:** Design system in `2026-05-25-sirvoy-webapp-design.md` §5 and §6.1

---

## 1. Objetivo

Rediseñar la homepage para que sea **editorial, tropical y urbana** — no hogareña. El hostal está en la zona de bares y restaurantes del centro histórico de Santiago. La Cervecería Búcaro comparte el espacio. El edificio tiene historia patrimonial documentada. Todo eso tiene que vivir en el diseño.

**Audiencia:**
- Mochileros / viajeros internacionales
- Viajeros dominicanos (fin de semana, turismo interno)
- Corporativo last-minute (empresas con empleados en la ciudad, 1–varias noches)

**Lo que NO es:** un hostal familiar tranquilo. Es una base urbana para vivir Santiago.

---

## 2. Paleta de Color — Actualizada

Los colores son los del edificio real (pintura Tropical, marca dominicana).

| Token CSS | Color | Valor hex aprox.* | Uso |
|---|---|---|---|
| `--verde-fresco` | Tropical Verde Fresco 83 | `#52B788` | Hero, CTAs principales, secciones clave |
| `--royal-blue` | Tropical Royal 69 | `#2B5DB8` | Acentos, hover states, detalles, segunda CTA |
| `--cream` | Crema cálida | `#F5F0E8` | Fondos entre secciones |
| `--carbon` | Casi negro | `#1A1A1A` | Tipografía, footer, sección nocturna |
| `--blanco` | Blanco puro | `#FFFFFF` | Texto sobre verde/azul |
| `--blueprint-blue` | Azul plano original | `#0A2463` | Motivo decorativo sección historia |

*\* Confirmar contra chip de pintura Tropical físico. Estos valores son aproximaciones visuales.*

**Reemplaza** la paleta anterior (`#4E6B5A` forest green muted). El nuevo verde es más brillante, más tropical, más fiel al edificio real.

---

## 3. Tipografía

| Rol | Fuente | Variante |
|---|---|---|
| Títulos y display | Space Grotesk | Bold (700) |
| Cuerpo y UI | Space Grotesk | Regular (400) / Medium (500) |
| Pull quotes / historia | Space Grotesk | Light italic |

Tono de voz: **directo, con confianza, sin "bienvenidos a".** Más "75 años en la calle más histórica de Santiago" y menos "¡Bienvenidos a nuestro hermoso hostal!".

---

## 4. Layout de Homepage — Sección por Sección

### ① NAVBAR (sticky)
- Logo: "Hostal Nómada" texto bold + punto verde fresco como accento
- Links: Habitaciones · Nosotros · Cervecería · Contacto
- CTA: botón "Reservar" → verde fresco sólido
- Fondo: blanco/95 con blur, borde inferior sutil
- Mobile: hamburger → sheet lateral completo

### ② HERO — Full Bleed
- **Foto:** fachada del edificio (fuente: Airbnb/Hostelworld). El edificio ya tiene los colores reales — verde fresco + puertas azul royal. La foto habla sola.
- **Overlay:** gradiente sutil oscuro en la mitad inferior para legibilidad del texto
- **Contenido:**
  ```
  EYEBROW:   "Benito Monción esq. Máximo Gómez · Santiago, RD"
  H1:        "75 años en la calle más histórica de Santiago."
  SUB:       "Hostal boutique + Cervecería Búcaro en el centro histórico.
              Habitaciones privadas y compartidas con carácter."
  CTA 1:     [Reservar habitación]       → verde fresco, grande
  CTA 2:     [Conoce la Cervecería →]    → outline blanco
  ```
- **Rating strip** dentro del hero (parte baja): `⭐ 4.64 Airbnb · ⭐ 4.69 Hostelworld · 457 reseñas`

### ③ BARRA DE CONTEXTO
- Fondo: Royal Blue sólido
- Texto blanco, una línea, scroll horizontal en mobile
  ```
  📍 Centro Histórico  ·  🍺 Cervecería Búcaro  ·  🔐 Smart Lock  ·  🐾 Mascotas OK  ·  ✔ 14 años de anfitriones
  ```

### ④ HISTORIA DEL EDIFICIO — Editorial Split
- **Fondo:** Cream `#F5F0E8`
- **Layout:** foto izquierda / texto derecha en desktop; texto primero en mobile
- **Foto:** fachada o interior del edificio
- **Motivo decorativo:** fragmento del plano blueprint original (azul oscuro, tenue, como marca de agua detrás del texto)

**Copy:**
```
EYEBROW:   "Construido en 1948 · Patrimonio arquitectónico de Santiago"

H2:        "De consultorio a punto de encuentro."

PÁRRAFO:   "El arquitecto Pablo N. Pérez Rancier diseñó este edificio 
            Art Déco para el Dr. José de Jesús Jiménez Almonte — médico,
            botánico y campeón nacional de ajedrez. Aquí vivió, trabajó 
            y escribió parte de la flora dominicana. En su terraza, 
            Santiago debatía ciencia y movía piezas de ajedrez."

PÁRRAFO 2: "Hoy, más de 75 años después, el espacio renace como 
            Hostal Nómada y Cervecería Búcaro. El espíritu de encuentro, 
            conversación e hospitalidad que le dio vida — continúa."

PULL QUOTE (visual, grande):
           "Un médico que curaba corazones.
            Un botánico que nombraba orquídeas.
            Un ajedrecista que dominaba la mente.
            Esta fue su casa. Ahora es la tuya."

CHIP:      "Guía de Arquitectura de Santiago · Pág. 105"
```

**Motivo visual:** Ilustración botánica sutil de *Tolumnia jimenezii* (orquídea nombrada en honor al Dr.) como elemento decorativo en verde fresco / azul royal.

### ⑤ HABITACIONES — Cards Bold
- **Fondo:** Blanco
- **Layout:** grid 2 columnas desktop, 1 columna mobile
- **Cada card:**
  - Foto full-width (ratio 4:3)
  - Badge de tipo: "Privado" / "Compartido" en verde fresco
  - Nombre del cuarto
  - Capacidad · Cama · AC · Baño
  - Precio desde `$XX USD/noche`
  - Botón "[Reservar →]" en azul royal

### ⑥ AMENIDADES — Grid con Personalidad
- **Fondo:** Verde fresco muy claro (10% opacidad) o cream
- **Iconos:** Royal blue
- **Grid:** 4 columnas desktop, 2 mobile
- **La cervecería aparece como amenidad** — diferenciador único

```
📶 WiFi Gratis       ❄️ AC                🔐 Smart Lock      🐾 Mascotas OK
🚿 Ducha Caliente    🧺 Toallas y Sábanas  🚗 Estacionamiento  🍺 Cervecería Búcaro
```

### ⑦ "TU BARRIO" — Zona Urbana
- **Fondo:** Carbon `#1A1A1A` (sección oscura, energía nocturna)
- **Título:** "A pasos de todo."
- **Sub:** "Estás en el corazón del centro histórico. No en las afueras."
- **Layout:** lista visual con distancias + mapa embed (o foto nocturna del barrio)

```
🍻 1 min   — Bares de Benito Monción (en tu puerta)
🍽️  2 min   — Mejores restaurantes del centro
🏛️  2 min   — Monumento a los Héroes de la Restauración
🌳 5 min   — Parque Duarte
🏦 3 min   — Banco, farmacia, supermercado
✈️  25 min  — Aeropuerto Cibao
```

### ⑧ RESEÑAS — Editorial
- **Fondo:** Cream
- **Layout:** 3 cards horizontales desktop (scroll snap mobile)
- **Cada card:** estrellitas · cita entre comillas grandes · nombre + ciudad
- **Sin dark green monótono.** Fondo blanco por card, borde sutil

Reseñas seleccionadas (de las 4 reales):
1. Landon, Arlington VA — *"una sensación histórica del lugar que hizo que uno se sintiera bastante privilegiado"*
2. Ólfir, RD — *"un viaje hacia mi interior y vivir la experiencia de estar en una zona histórica"*  
3. Harold, Santo Domingo — *"Lugar cómodo, seguro y limpio. Tiene bares, tiendas y restaurantes cerca."*

### ⑨ CTA FINAL — Split
- **Layout:** 2 columnas iguales
- **Izquierda** (fondo verde fresco): "Reserva tu cuarto" → botón blanco
- **Derecha** (fondo royal blue): "Conoce la Cervecería Búcaro" → botón outline blanco

### ⑩ FOOTER
- **Fondo:** Carbon
- **Contenido:**
  - Logo + tagline breve
  - Dirección: #29 C. Benito Monción esq. Máximo Gómez 34, Santiago, RD
  - WhatsApp directo (botón verde)
  - Links: Habitaciones · Reservar · Cervecería · Nosotros · Contacto
  - Redes sociales: Instagram · Airbnb · Hostelworld
  - Copyright + rating badges

---

## 5. Motivos de Diseño — Blueprint

Los planos originales de 1948 firmados por el arquitecto (conservados por la familia) son un activo visual único.

**Uso en el sitio:**
- Fondo muy tenue (5–10% opacidad, monocromo azul oscuro) en la sección Historia
- Posible uso como hero de la página `/nosotros`
- No usar en hero principal — demasiado sutil para primera impresión

**Espacios del plano con valor narrativo:**
| Espacio original (1948) | Hoy |
|---|---|
| Sala de Espera | Cervecería Búcaro |
| Laboratorio | Habitaciones |
| Rayos X | Historia |
| Biblioteca | Sala común |
| Terraza Cubierta | Terraza del hostal |

---

## 6. Cambios vs. Código Actual

| Archivo actual | Cambio requerido |
|---|---|
| `globals.css` | Actualizar `--color-nomada-green` a Verde Fresco. Añadir `--royal-blue`, `--carbon`, `--blueprint-blue` |
| `components/home/Hero.tsx` | Reemplazar fondo verde sólido por imagen con overlay. Nuevo copy. Dual CTA. Rating strip. |
| `components/home/Reviews.tsx` | Cambiar layout de grid dark-green a cards cream/blanco |
| `components/home/Amenities.tsx` | Actualizar colores. Añadir Cervecería como amenidad. |
| `components/home/RoomsPreview.tsx` | Actualizar colores de cards |
| `components/layout/Navbar.tsx` | Añadir link "Cervecería" en nav |
| `components/home/` (nuevo) | `HistorySection.tsx` — sección editorial con blueprints |
| `components/home/` (nuevo) | `NeighborhoodSection.tsx` — "Tu barrio", fondo oscuro |
| `components/home/` (nuevo) | `FinalCTA.tsx` — split CTA Hostal / Cervecería |
| `app/page.tsx` | Añadir nuevas secciones al orden de renders |

---

## 7. Fuera de Alcance (este spec)

- Página `/nosotros` completa (tiene su propio momento)
- Página `/cerveceria` (pendiente confirmar si es mismo dominio o dominio separado)
- Planos blueprint como SVG animado (fase 2)
- Galería de fotos completa con lightbox
- Video de la historia del edificio

---

## 8. Fuentes y Créditos

- **Guía de Arquitectura de Santiago**, pág. 105 — fuente citable en sitio
- **Junta de Bibliotecas Nacionales (JBN):** artículo sobre Dr. Jiménez Almonte
- **Planos originales 1948:** Pablo N. Pérez Rancier, arquitecto — conservados por la familia
- **Fotos del edificio:** Airbnb / Hostelworld listings de Hostal Nómada
- **Reseñas:** Airbnb (Landon, Ólfir, Harold, Leny)
