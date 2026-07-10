import './styles/main.css'
import './styles/hud.css'
import { Renderer } from './three/Renderer.js';
import { HeroScene } from './three/scenes/HeroScene.js';
import * as THREE from 'three';

const renderer = new Renderer();
const heroScene = new HeroScene();
const clock = new THREE.Clock();

const tick = () =>
{
    const deltaTime = clock.getDelta();                                     // Seconds since last frame
    heroScene.update(deltaTime);
    renderer.instance.render(heroScene.scene, heroScene.camera.instance);
    requestAnimationFrame(tick);
}

tick();