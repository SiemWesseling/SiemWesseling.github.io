import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Camera} from '../Camera.js';
import { Raycaster } from '../Raycaster.js';
import { Mouse } from '../../utils/Mouse.js';

export class HeroScene 
{
    constructor()
    {
        this.scene = new THREE.Scene();

        // Systems
        this.mouse = new Mouse();
        this.camera = new Camera();
        this.raycaster = new Raycaster(this.camera.instance, this.mouse);

        // OrbitControls — lets the user orbit/zoom/pan with the mouse
        this.controls = new OrbitControls(this.camera.instance, document.querySelector('canvas'))
        this.controls.enableDamping = true; // smooths the controls
        this.controls.dampingFactor = 0.05; // how much damping (0.05 is a good default)

        // Scene content
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({
            color: 0x8b6f47,
            roughness: 0.4,
            metalness: 0.1
        })
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        // Ambient light — base illumination, like skylight
        const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.8);
        this.scene.add(ambientLight);

        // Directional light — like sunlight, parallel rays from one direction
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(2, 3, 4);
        this.scene.add(directionalLight);

        window.addEventListener('click', () =>
        {
            const intersects = this.raycaster.getIntersections([this.cube]);
            if (intersects.length > 0)
            {
                console.log('Cube clicked!', intersects[0]);
            }
        });
    }

    update(elapsedTime)
    {
        this.cube.rotation.x = elapsedTime * 0.5;
        this.cube.rotation.y = elapsedTime * 0.5;
        this.controls.update(); // update the controls (for damping)

        //Check which objects the ray intersects
        const intersects = this.raycaster.getIntersections([this.cube]);
        
        if (intersects.length > 0) 
        {
            // Mouse is hovering over the cube
            this.cube.material.color.set(0xc17f3a) // highlight color
        }
        else
        {
            // Mouse is not hovering over the cube
            this.cube.material.color.set(0x8b6f47) // original color
        }
    }
}