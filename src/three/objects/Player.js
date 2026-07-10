import * as THREE from 'three';

export class Player
{
    constructor()
    {
        // The visible player body
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({
            color: 0x8b6f47,
            roughness: 0.4,
            metalness: 0.1
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.y = 0.5; // Lift so the box sits ON the ground, not half-buried

        // Player nose - forward
        const noseGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.5);
        const noseMaterial = new THREE.MeshStandardMaterial({ color: 0xc17f3a });
        const nose = new THREE.Mesh(noseGeometry, noseMaterial);
        nose.position.z = 0.6;  // Stick it out in front of the player
        this.mesh.add(nose);    // Parent it to the player mesh so it turns with it


        // Player movement parameters
        this.speed = 5; // World units per second
        this.turnSpeed = 2; // Radians per second
    }

    update(deltaTime, keyboard)
    {
        // Calculate movement direction based on keyboard input
        const direction = new THREE.Vector3();

        if (keyboard.isPressed('KeyW')) direction.z -= 1; // Forward    = -Z
        if (keyboard.isPressed('KeyS')) direction.z += 1; // Backward   = +Z
        if (keyboard.isPressed('KeyA')) direction.x -= 1; // Left       = -X
        if (keyboard.isPressed('KeyD')) direction.x += 1; // Right      = +X

        // Normalize direction to prevent faster diagonal movement
        if (direction.length() > 0)
        {
            direction.normalize();
            this.mesh.position.addScaledVector(direction, this.speed * deltaTime);

            // Face the direction we're moving in (only on the Y axis)
            const targetAngle = Math.atan2(direction.x, direction.z);

            const targetQuaternion = new THREE.Quaternion(); 
            targetQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), targetAngle); 

            this.mesh.quaternion.rotateTowards(targetQuaternion, this.turnSpeed * deltaTime); // Rotate towards target
        }
    }
}