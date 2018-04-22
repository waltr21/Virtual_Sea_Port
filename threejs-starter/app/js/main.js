import * as THREE from 'three';
// import orbit from 'three-orbit-controls';
// const OrbitControls = orbit(THREE);
import TrackballControls from 'three-trackballcontrols';
import Floor from './models/Floor.js';
import PortFloor from './models/PortFloor';
import Skybox from "./models/Skybox";


export default class App {
    constructor() {
        const c = document.getElementById('mycanvas');
        // Enable antialias for smoother lines
        this.renderer = new THREE.WebGLRenderer({canvas: c, antialias: true});
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 4/3, 0.5, 1000);
        this.camera.position.z = 100;

        // const orbiter = new OrbitControls(this.camera);
        // orbiter.enableZoom = false;
        // orbiter.update();

        this.tracker = new TrackballControls(this.camera, c);
        this.tracker.rotateSpeed = 2.0;
        this.tracker.noZoom = false;
        this.tracker.noPan = false;

        const lightOne = new THREE.AmbientLight (0xFFFFFF, 1.0);
        //lightOne.position.set (-50, 40, 100);
        this.scene.add (lightOne);

        this.water = new Floor();
        this.scene.add(this.water);

        this.port = new PortFloor();
        this.port.translateX(200);
        this.port.translateY(10);
        this.scene.add(this.port);

        this.sky = new Skybox();
        this.scene.add(this.sky);



        // var loader = new THREE.ObjectLoader();
        // loader.load("/app/js/models/fishing-boat-threejs/fishing-boat.json", (obj) => {this.scene.add(obj)});



        this.thingy = new THREE.Object3D;
        this.loader = new THREE.ObjectLoader();

        // Cooler container that has images all messed up.
        //this.loader.load("/app/js/models/supply-container-threejs/supply-container.json", (obj) => {this.scene.add(obj)});


        // Simple container
        this.loader.load("/app/js/models/containervan-threejs/containervan.json", 
            (obj) => {
                obj.scale.set(5, 5, 5);
                this.scene.add(obj)
            });

        window.addEventListener('resize', () => this.resizeHandler());
        this.resizeHandler();
        requestAnimationFrame(() => this.render());
    }

    // objectLoad(obj){
    //     this.scene.add(obj);
    // }

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
