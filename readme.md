# 3D Scenarios

Plataforma interactiva desarrollada con Three.js que incluye múltiples escenarios 3D con diferentes tipos de controles, físicas y navegación inmersiva.

---

# Vista General

Este proyecto implementa:

- Escenarios 3D interactivos
- Navegación first-person
- Orbit controls
- Map controls
- Transform controls
- Física básica
- Generación procedural
- Diseño moderno tipo glassmorphism
- Arquitectura modular reutilizable

---

# Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript ESModules
- Three.js
- WebGL

---

# Estructura del Proyecto

```plaintext
3d-escenarios/
│
├── assets/
│   │
│   ├── css/
│   │   └── styles.css
│   │
│   ├── img/
│   │   └── favicon.png
│   │
│   └── js/
│       │
│       ├── core/
│       │   │
│       │   ├── baseScene.js
│       │   └── layout.js
│       │
│       └── scenarios/
│           │
│           ├── map.js
│           ├── minecraft.js
│           ├── orbit.js
│           ├── pointerlock.js
│           └── transform.js
│
├── scenarios/
│   │
│   ├── map.html
│   ├── minecraft.html
│   ├── orbit.html
│   ├── pointerlock.html
│   └── transform.html
│
└── index.html
```

---

# Descripción de Carpetas

## assets/css/

Contiene los estilos globales del proyecto.

### styles.css
Archivo principal de estilos:
- diseño moderno
- glassmorphism
- cards
- navbar
- footer
- responsive design
- efectos glow
- gradientes

---

## assets/img/

Contiene recursos gráficos.

### favicon.png
Ícono principal del proyecto.

---

## assets/js/core/

Contiene módulos reutilizables.

### baseScene.js
Inicializa:
- Scene
- Camera
- Renderer
- Resize responsive

### layout.js
Inyecta dinámicamente:
- Navbar
- Footer
- UI overlays
- Botón ocultar interfaz

---

## assets/js/scenarios/

Contiene la lógica de cada escenario.

### map.js
Escenario con:
- MapControls
- navegación aérea
- zoom dinámico
- damping

### minecraft.js
Mundo procedural voxel tipo Minecraft:
- Perlin Noise
- FirstPersonControls
- gravedad
- físicas
- colisiones

### orbit.js
Escenario con:
- OrbitControls
- cámara orbital
- navegación libre

### pointerlock.js
FPS interactivo:
- PointerLockControls
- movimiento WASD
- salto
- gravedad
- colisiones

### transform.js
Editor interactivo 3D:
- mover objetos
- rotar
- escalar
- snapping
- cambio de cámaras

---

## scenarios/

Contiene las páginas HTML de cada escenario.

Cada archivo:
- importa Three.js
- carga el layout
- ejecuta el escenario correspondiente

---

# Escenarios Disponibles

| Escenario | Descripción |
|---|---|
| Minecraft | Mundo procedural voxel |
| Map Controls | Navegación aérea tipo mapa |
| Orbit Controls | Cámara orbital interactiva |
| Pointer Lock FPS | Movimiento first-person |
| Transform Controls | Editor de transformaciones |

---

# Características Técnicas

## Arquitectura Modular

El proyecto separa:
- lógica visual
- layout
- renderizado
- controles
- escenarios

Esto facilita:
- mantenimiento
- escalabilidad
- reutilización

---

# Funcionalidades

- Renderizado 3D en tiempo real
- Controles avanzados de cámara
- Física básica
- Colisiones
- Escenarios interactivos
- UI moderna
- Responsive design

---

# Instalación

## Clonar repositorio

```bash
git clone https://github.com/TUUSUARIO/3d-escenarios.git
```

---

# Ejecutar Proyecto

Abrir:

```plaintext
index.html
```

o usar Live Server en Visual Studio Code.

---

# Requisitos

Navegador moderno compatible con:
- WebGL
- ESModules
- JavaScript moderno

Recomendado:
- Google Chrome
- Microsoft Edge

---

# Autor

Sebastian Martinez Alvarez

---

# Licencia

Proyecto educativo y experimental.