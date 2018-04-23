import * as THREE from 'three';
// import orbit from 'three-orbit-controls';
// const OrbitControls = orbit(THREE);
import TrackballControls from 'three-trackballcontrols';
import Floor from './models/Floor.js';
import PortFloor from './models/PortFloor';
import Crane from './models/Crane';
import Skybox from "./models/Skybox";
import FishBoat from "./models/FishBoat";
import Plane from "./models/Plane";
import Sun from "./models/Sun";



export default class App {
    constructor() {
        // Counter for moving crane
        this.counter = 0;

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

        const lightOne = new THREE.AmbientLight (0xFFFFFF, 0.5);
        lightOne.position.set (-50, 40, 100);
        this.scene.add (lightOne);

        this.water = new Floor();
        this.scene.add(this.water);

        this.port = new PortFloor();
        this.port.translateX(200);
        this.port.translateY(10);
        this.scene.add(this.port);

        this.sky = new Skybox();
        this.scene.add(this.sky);

        this.sun = new Sun();
        this.sun.matrixAutoUpdate = false;
        let trans = new THREE.Matrix4().makeTranslation(0, 150, 550);
        this.sun.matrix.multiply(trans);
        this.scene.add(this.sun);




        // var loader = new THREE.ObjectLoader();
        // loader.load("/app/js/models/fishing-boat-threejs/fishing-boat.json", (obj) => {this.scene.add(obj)});



        this.thingy = new THREE.Object3D;
        this.loader = new THREE.ObjectLoader();

        //this.fishBoat = null;

        // Cooler container that has images all messed up.
        //this.loader.load("/app/js/models/boat-threejs/boat.json", (obj) => {this.scene.add(obj)});



        this.fBoat = new FishBoat();
        this.scene.add(this.fBoat);
        this.fBoat.matrixAutoUpdate = false;
        trans = new THREE.Matrix4().makeTranslation(-300,0,-200);
        this.fBoat.matrix.multiply(trans);

        this.plane = new Plane();
        this.scene.add(this.plane);
        this.plane.matrixAutoUpdate = false;
        trans = new THREE.Matrix4().makeTranslation(100,14,60);
        this.plane.matrix.multiply(trans);

        this.crane = new Crane();
        this.crane.translateY(10);
        this.scene.add(this.crane);
        for(let i = 0; i < 30; i++){
            this.crane.moveContainer("up");
        }



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

        let trans = new THREE.Matrix4().makeTranslation(-0.1,0,0);
        let rotY = new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(0.1));
        this.fBoat.matrix.multiply(trans);
        this.fBoat.matrix.multiply(rotY);



        requestAnimationFrame(() => this.render());

        // Move crane box up and down
        this.counter++;

        if(this.counter < 50 && this.counter % 2 == 0){
            this.crane.moveContainer("down");
        }
        else if(this.counter > 50 && this.counter < 100 && this.counter % 2 == 0){
            this.crane.moveContainer("up");
        }
        if(this.counter == 101){
            this.counter = 0;
        }

        // Rotate Crane
        //this.crane.moveableCraneGroup.rotateY(THREE.Math.degToRad(1));

       
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
