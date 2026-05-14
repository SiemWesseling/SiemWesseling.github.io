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
        const material = new THREE.MeshNormalMaterial();    // rainbow-ish colors based on normals, no lights needed
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);
    }

    update(elapsedTime)
    {
        this.cube.rotation.x = elapsedTime * 0.5;
        this.cube.rotation.y = elapsedTime * 0.5;
    }
}