import * as THREE from 'three';

export class Keyboard
{
    constructor()
    {
        this.keys = new Set();

        window.addEventListener('keydown', (event) =>
        {
            this.keys.add(event.code);
        });

        window.addEventListener('keyup', (event) =>
        {
            this.keys.delete(event.code);
        });
    }

    isPressed(keyCode)
    {
        return this.keys.has(keyCode);
    }
}