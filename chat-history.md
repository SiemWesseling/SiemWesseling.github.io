# Portfolio Website — Copilot Learning Session

## Context & Goals

- **Developer background:** Intermediate/advanced Unity developer (C#/C++), first time building a website from scratch
- **Project:** Personal portfolio website hosted on GitHub Pages (SiemWesseling.github.io)
- **Long-term vision:** A gamified, immersive 3D environment using Three.js and Cannon.js where users navigate a 3D world to explore portfolio content
- **Learning style:** Step-by-step walkthroughs with explanations of syntax, design patterns, and thought processes. Analogies to Unity/C# are helpful.

---

## Preferred Teaching Approach

- Explain code **line by line** when introducing new concepts
- Draw analogies to Unity/C# equivalents wherever possible
- Flag bugs and explain **why** something is wrong, not just what to fix
- Explain **design decisions** — why code is structured a certain way
- Introduce refactoring after concepts are understood, not before
- Build toward the portfolio vision incrementally — don't over-engineer early

---

## Project Architecture

### Tech Stack
- **Vite** — build tool and dev server (equivalent to a compiler + hot reload)
- **Three.js** — 3D rendering library
- **Cannon.js** — physics engine (planned for future)
- **Vanilla JS (ES Modules)** — no framework
- **GitHub Pages** — static hosting

### Folder Structure
```
/
├── index.html                  ← single HTML file, one <canvas>
├── package.json
├── vite.config.js
├── public/
│   ├── images/
│   ├── models/                 ← .glb 3D models (future)
│   └── fonts/
└── src/
    ├── main.js                 ← entry point: init renderer, scene, input
    ├── three/
    │   ├── Renderer.js         ← WebGLRenderer setup
    │   ├── Camera.js           ← camera + resize logic
    │   ├── Raycaster.js        ← mouse → 3D intersection detection
    │   ├── SceneManager.js     ← switches between zones (future)
    │   └── scenes/
    │       └── HeroScene.js    ← assembles the hero scene
    ├── shaders/                ← GLSL files (future)
    │   ├── background.vert
    │   └── background.frag
    ├── ui/                     ← HTML overlays above the canvas (future)
    ├── data/
    │   └── projects.js         ← project content data
    ├── styles/
    │   ├── main.css
    │   ├── hud.css
    │   └── panels.css
    └── utils/
        ├── Mouse.js            ← tracks normalised mouse position
        └── AssetLoader.js      ← preloads textures/models (future)
```

### Key Architecture Decisions
- **Single page, one canvas** — no separate HTML files per section. The Three.js canvas fills the viewport; HTML `<div>` overlays slide in/out on top for content panels.
- **Scene zones** — the 3D world is divided into zones (Hero, Projects, About, Contact). Camera transitions between them rather than navigating to new pages.
- **`userData`** — Three.js meshes have a `userData` object for storing custom data (e.g. `mesh.userData.projectId`). Used to identify which object was clicked.

---

## Vite — Key Concepts

### What Vite does
- **Dev server:** `npm run dev` → starts local server at `http://localhost:5173` with hot module replacement
- **Bundler:** `npm run build` → outputs optimised static files to `/dist` for deployment
- **ES Modules:** enables `import` syntax in JS files

### Why Vite for Three.js
Without a build tool, Three.js must be loaded via CDN (entire library). With Vite:
```js
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
```
Only what you import gets bundled. Add-ons are importable from `three/examples/jsm/`.

### Daily workflow
```bash
npm run dev      # start dev server
npm run build    # build for production → /dist
```

### Important config
```js
// vite.config.js
export default {
  base: './',        // required for GitHub Pages — makes asset paths relative
  build: {
    outDir: 'dist'
  }
}
```

```json
// package.json — must have this for ES Modules to work
"type": "module"
```

---

## HTML & CSS Foundations

### index.html structure
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Siem Wesseling | Portfolio</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <!-- Three.js injects <canvas> here via document.body.appendChild -->
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```
- `type="module"` on the script tag enables ES Module imports in JS
- Script tag goes **inside** `<body>`, just before `</body>` — not between `</head>` and `<body>`
- Leading `/` on `/src/main.js` ensures path resolves from project root (important for subpages later)

### CSS reset (main.css)
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;  /* padding included in width, not added to it */
}

body {
  background: #e4cbae;     /* warm beige — matches Three.js clear color */
  overflow: hidden;        /* prevents scrollbars on fullscreen canvas */
}

canvas {
  display: block;          /* removes invisible gap below inline canvas element */
}
```

### Responsive design (mobile-first)
```css
/* Mobile: default styles (no query needed) */
.container { padding: 1rem; }

/* Tablet and up */
@media (min-width: 768px) {
  .container { padding: 4rem; }
}

/* Desktop */
@media (min-width: 1024px) { }

/* Wide */
@media (min-width: 1440px) { }
```
- Write mobile styles first, add complexity for larger screens with `min-width` queries
- `rem` units scale with user font size preferences (1rem = 16px by default)
- Test mobile: open `http://[Network IP]:5173` on phone (same WiFi), or use Chrome DevTools device emulator (F12 → phone icon)

---

## Three.js — The Holy Trinity

Every Three.js scene requires three things:

| Three.js | Unity equivalent | Purpose |
|---|---|---|
| `THREE.Scene` | Game level/world | Container for all 3D objects |
| `THREE.PerspectiveCamera` | Camera component | The viewpoint — FOV, aspect, clip planes |
| `THREE.WebGLRenderer` | Render pipeline | Draws the scene to a `<canvas>` |

---

## Three.js — File by File

### Renderer.js
```js
import * as THREE from 'three'

export class Renderer {
    constructor() {
        this.instance = new THREE.WebGLRenderer({ antialias: true })
        this.instance.setSize(window.innerWidth, window.innerHeight)
        this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // cap at 2 for performance
        this.instance.setClearColor(0xe4cbae) // background color behind 3D objects
        document.body.appendChild(this.instance.domElement) // inject <canvas> into page

        window.addEventListener('resize', () => {
            this.instance.setSize(window.innerWidth, window.innerHeight)
            this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })
    }
}
```
- `domElement` — the `<canvas>` HTML element Three.js creates internally
- `setClearColor` — takes hex as a number (`0xe4cbae`), not a string (`#e4cbae`)
- Three.js methods are **camelCase, lowercase first letter** — common source of typos

### Camera.js
```js
import * as THREE from 'three'

export class Camera {
    constructor() {
        this.instance = new THREE.PerspectiveCamera(
            75,                                    // FOV in degrees
            window.innerWidth / window.innerHeight, // aspect ratio
            0.1,                                   // near clip plane
            100                                    // far clip plane
        )
        this.instance.position.z = 3

        window.addEventListener('resize', () => {
            this.instance.aspect = window.innerWidth / window.innerHeight
            this.instance.updateProjectionMatrix() // must call after changing camera properties
        })
    }
}
```

### utils/Mouse.js
```js
import * as THREE from 'three'

export class Mouse {
    constructor() {
        this.position = new THREE.Vector2()

        window.addEventListener('mousemove', (event) => {
            // Convert pixel coords to Normalised Device Coordinates (-1 to +1)
            this.position.x = (event.clientX / window.innerWidth) * 2 - 1
            this.position.y = -(event.clientY / window.innerHeight) * 2 + 1
        })
    }
}
```
- NDC: (-1,-1) = bottom-left, (1,1) = top-right — required by Three.js raycasting

### Raycaster.js
```js
import * as THREE from 'three'

export class Raycaster {
    constructor(camera, mouse) {
        // Dependencies injected — not created here (same principle as passing refs in Unity)
        this.camera = camera
        this.mouse = mouse
        this.instance = new THREE.Raycaster()
    }

    // Returns intersects array — caller decides what to do with results
    getIntersects(objects) {
        this.instance.setFromCamera(this.mouse.position, this.camera)
        return this.instance.intersectObjects(objects)
    }
}
```
- **Dependency injection** — camera and mouse are passed in, not created inside. Makes the class reusable.
- `intersectObjects` returns an array sorted by distance (closest first)
- Each element contains: `.object` (the mesh), `.point` (Vector3 hit position), `.distance`, `.face`

### HeroScene.js (post-refactor)
```js
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { Camera } from '../Camera.js'
import { Raycaster } from '../Raycaster.js'
import { Mouse } from '../../utils/Mouse.js'

export class HeroScene {
    constructor() {
        this.scene = new THREE.Scene()

        // Systems — assembled here, logic lives in their own files
        this.mouse = new Mouse()
        this.camera = new Camera()
        this.raycaster = new Raycaster(this.camera.instance, this.mouse)

        // OrbitControls — orbit/zoom/pan with mouse
        this.controls = new OrbitControls(this.camera.instance, document.querySelector('canvas'))
        this.controls.enableDamping = true   // inertia on mouse release
        this.controls.dampingFactor = 0.05

        // Cube
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshStandardMaterial({
            color: 0x8b6f47,    // warm brown
            roughness: 0.4,     // 0 = mirror, 1 = fully matte
            metalness: 0.1      // 0 = plastic/wood, 1 = metal
        })
        this.cube = new THREE.Mesh(geometry, material) // geometry + material = renderable object
        this.scene.add(this.cube)

        // Lights
        const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.8)  // equal illumination all directions
        this.scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5) // parallel rays, like sun
        directionalLight.position.set(2, 3, 4) // direction = position relative to origin
        this.scene.add(directionalLight)

        // Click detection
        window.addEventListener('click', () => {
            const intersects = this.raycaster.getIntersects([this.cube])
            if (intersects.length > 0) {
                console.log('Cube clicked!', intersects[0])
                // Future: intersects[0].object.userData.projectId → open project panel
            }
        })
    }

    update(elapsedTime) {
        this.cube.rotation.x = elapsedTime * 0.5  // radians, not degrees
        this.cube.rotation.y = elapsedTime * 0.5
        this.controls.update() // required every frame for damping to work

        // Hover detection
        const intersects = this.raycaster.getIntersects([this.cube])
        if (intersects.length > 0) {
            this.cube.material.color.set(0xc17f3a) // highlight
        } else {
            this.cube.material.color.set(0x8b6f47) // original
        }
    }
}
```

### main.js
```js
import './styles/main.css'
import './styles/hud.css'
import { Renderer } from './three/Renderer.js'
import { HeroScene } from './three/scenes/HeroScene.js'
import * as THREE from 'three'

const renderer = new Renderer()
const heroScene = new HeroScene()
const clock = new THREE.Clock() // like Time in Unity

const tick = () => {
    const elapsedTime = clock.getElapsedTime() // total seconds since start
    heroScene.update(elapsedTime)
    renderer.instance.render(heroScene.scene, heroScene.camera.instance)
    requestAnimationFrame(tick) // browser calls tick again before next frame
}

tick() // start the loop
```
- `requestAnimationFrame` syncs to monitor refresh rate and pauses when tab is hidden
- The loop: `tick()` → `requestAnimationFrame(tick)` → browser calls `tick()` → repeat

---

## JS Syntax — Key Concepts for Unity Developers

### ES Modules
```js
import * as THREE from 'three'              // import everything, namespace as THREE
import { OrbitControls } from 'three/...'  // import one named export
import { Camera } from './Camera.js'       // import from your own file

export class Camera { }                    // make class available to other files
```
Equivalent to `using` / `#include` + `public` in C#/C++.

### Arrow functions
```js
// Regular function
function tick() { }

// Arrow function — shorthand, same thing
const tick = () => { }

// Arrow function as callback (anonymous, inline)
window.addEventListener('resize', () => {
    // runs when resize fires
})
```
Equivalent to delegates/lambdas in C#.

### `this` in classes
```js
export class HeroScene {
    constructor() {
        this.cube = new THREE.Mesh(...)  // store on instance, like a field in C#
    }
    update() {
        this.cube.rotation.x += 0.01    // access via this
    }
}
```

### Object literals (config objects)
```js
new THREE.WebGLRenderer({ antialias: true })
// { key: value } passed as argument — equivalent to passing a settings struct
```

---

## Design Patterns Introduced

### Separation of concerns
Each class owns one responsibility:
- `Mouse` — tracks mouse position
- `Raycaster` — casts rays, returns intersects
- `Camera` — camera setup and resize
- `Renderer` — WebGL renderer setup
- `HeroScene` — assembles everything, owns scene-specific logic

`HeroScene` should read like a wiring diagram, not contain implementation details.

### Dependency injection
```js
// Bad — Raycaster creates its own camera (tightly coupled)
constructor() { this.camera = new THREE.PerspectiveCamera(...) }

// Good — camera passed in (loosely coupled, reusable)
constructor(camera, mouse) { this.camera = camera }
```
Same principle as passing component references in Unity rather than `FindObjectOfType`.

### When to extract to a new file
> Extract when you find yourself needing something in more than one place, or when the file it's in becomes hard to read.

---

## What's Next (Planned)

1. **WASD player movement** — ground plane, `PlayerController.js`, camera follow
2. **Background shader** — fullscreen shader quad, GLSL fragment shader (watercolor-inspired)
3. **UI panels** — HTML overlays for project details, about, contact
4. **`src/data/projects.js`** — project content data
5. **Cannon.js physics** — drop into `src/three/physics/World.js`
6. **GitHub Actions** — auto-deploy to GitHub Pages on push

---

## Notes for Future Sessions

- Always remove stray autocomplete imports (e.g. `import { int } from 'three/tsl'`)
- Three.js methods are always camelCase lowercase-first — typos like `SetPixelRation` will silently fail
- `updateProjectionMatrix()` must be called after changing any camera property
- `controls.update()` must be called every frame for `enableDamping` to work
- Rotation values in Three.js are **radians** (`Math.PI` = 180°)
- `console.log()` = `Debug.Log()` — use browser DevTools (F12 → Console)
