import * as THREE from 'three';

export class HeroScene 
{
    constructor()
    {
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75, window.innerWidth / window.innerHeight, 0.1, 100);
        this.camera.position.z = 3;

        window.addEventListener('resize', () =>
        {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        });

        // Cube
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
    }

    update(elapsedTime)
    {
        this.cube.rotation.x = elapsedTime * 0.5;
        this.cube.rotation.y = elapsedTime * 0.5;
    }
}