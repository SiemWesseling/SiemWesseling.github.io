import * as THREE from 'three';

export class Mouse
{
    constructor()
    {
        this.position = new THREE.Vector2();

        window.addEventListener('mousemove', (event) =>
        {
            this.position.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.position.y = - (event.clientY / window.innerHeight) * 2 + 1;
        });
    }
}