import * as THREE from 'three';

export class Camera
{
    constructor()
    {
        this.instance = new THREE.PerspectiveCamera(
            75,                                         // FOV (degrees)
            window.innerWidth / window.innerHeight,     // Aspect ratio
            0.1,                                        // Near clipping plane
            100                                         // Far clipping plane 
        );
        this.instance.position.z = 3;

        window.addEventListener('resize', () =>
        {
            this.instance.aspect = window.innerWidth / window.innerHeight;
            this.instance.updateProjectionMatrix();
        });
    }
}