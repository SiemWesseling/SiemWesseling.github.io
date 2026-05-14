import * as THREE from 'three';

export class Renderer 
{
    constructor() 
    {
        this.instance = new THREE.WebGLRenderer({ antialias: true });
        this.instance.setSize(window.innerWidth, window.innerHeight);
        this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        document.body.appendChild(this.instance.domElement);

        window.addEventListener('resize', () =>
        {
            this.instance.setSize(window.innerWidth, window.innerHeight);
            this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
        })
    }
}