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
        
        // Location of the camera relative to the player
        // High Y = looks down; positive Z = sits behind. Tweak to taste.
        this.offset = new THREE.Vector3(0, 8, 7);

        // How snappily the camera catches up (0 = never moves, 1 = instant/rigid).
        this.smoothing = 0.1;

        window.addEventListener('resize', () =>
        {
            this.instance.aspect = window.innerWidth / window.innerHeight;
            this.instance.updateProjectionMatrix();
        });
    }

    update(target)
    {
        // The target's position + our offset
        const desiredPosition = target.position.clone().add(this.offset);

        // Ease towards the desired position
        this.instance.position.lerp(desiredPosition, this.smoothing);
    
        // Always look at the player
        this.instance.lookAt(target.position);
    }

}