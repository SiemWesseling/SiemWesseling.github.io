import * as THREE from 'three';
import { Camera} from '../Camera.js';
import { Player } from '../objects/Player.js';
import { Keyboard } from '../../utils/Keyboard.js';

export class HeroScene 
{
    constructor()
    {
        this.scene = new THREE.Scene();

        // Systems
        this.keyboard = new Keyboard();
        this.camera = new Camera();

        // World
        this.player = new Player();
        this.scene.add(this.player.mesh);

        // Ground plane
        const groundGeometry = new THREE.PlaneGeometry(50, 50);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0xcbb094,  
            roughness: 0.9,
            metalness: 0.0
        });
        this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
        this.ground.rotation.x = -Math.PI / 2; // Lay it flat on the XZ plane
        this.scene.add(this.ground);

        // Ambient light — base illumination, like skylight
        const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.8);
        this.scene.add(ambientLight);

        // Directional light — like sunlight, parallel rays from one direction
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(2, 3, 4);
        this.scene.add(directionalLight);
    }

    update(deltaTime)
    {
        this.player.update(deltaTime, this.keyboard);   // move the player
        this.camera.update(this.player.mesh);           // follow it with the camera
    }
}