import * as THREE from 'three';
// import orbit from 'three-orbit-controls';
// const OrbitControls = orbit(THREE);
import TrackballControls from 'three-trackballcontrols';
import Wheel from './models/Wheel';
import Spinner from './models/Spinner';



export default class App {
    constructor() {
        const c = document.getElementById('mycanvas');
        // Enable antialias for smoother lines
        this.renderer = new THREE.WebGLRenderer({canvas: c, antialias: true});
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 4/3, 0.5, 500);
        this.camera.position.z = 100;

        // const orbiter = new OrbitControls(this.camera);
        // orbiter.enableZoom = false;
        // orbiter.update();
        this.tracker = new TrackballControls(this.camera);
        this.tracker.rotateSpeed = 2.0;
        this.tracker.noZoom = false;
        this.tracker.noPan = false;

        const lightOne = new THREE.DirectionalLight (0xFFFFFF, 1.0);
        lightOne.position.set (10, 40, 100);
        this.scene.add (lightOne);

        this.temp = new Spinner();
        for (var k = 0; k < this.temp.length; k++){
            this.scene.add(this.temp[k]);
        }


        window.addEventListener('resize', () => this.resizeHandler());
        this.resizeHandler();
        requestAnimationFrame(() => this.render());
    }

    render() {
        this.renderer.render(this.scene, this.camera);
        this.tracker.update();
        requestAnimationFrame(() => this.render());
    }

    resizeHandler() {
        const canvas = document.getElementById("mycanvas");
        let w = window.innerWidth - 16;
        let h = 0.75 * w;  /* maintain 4:3 ratio */
        if (canvas.offsetTop + h > window.innerHeight) {
            h = window.innerHeight - canvas.offsetTop - 16;
            w = 4/3 * h;
        }
        canvas.width = w;
        canvas.height = h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
        this.tracker.handleResize();
    }
}