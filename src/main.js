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
    const elapsedTime = clock.getElapsedTime();
    heroScene.update(elapsedTime);
    renderer.instance.render(heroScene.scene, heroScene.camera);
    requestAnimationFrame(tick);
}

tick();