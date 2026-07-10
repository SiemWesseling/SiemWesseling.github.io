import * as THREE from 'three';

export class Raycaster
{
    constructor(camera, mouse)
    {
        this.camera = camera;
        this.mouse = mouse;
        this.instance = new THREE.Raycaster();
    }

    getIntersections(objects)
    {
        this.instance.setFromCamera(this.mouse.position, this.camera);
        return this.instance.intersectObjects(objects);
    }
}