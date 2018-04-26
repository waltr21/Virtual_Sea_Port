import * as THREE from 'three';
// import orbit from 'three-orbit-controls';
// const OrbitControls = orbit(THREE);
import VRControls from 'three-vrcontrols-module';
import WebVRPolyfill from 'webvr-polyfill';
import TrackballControls from 'three-trackballcontrols';
import Floor from './models/Floor.js';
import PortFloor from './models/PortFloor';
import Crane from './models/Crane';
import Skybox from "./models/Skybox";
import FishBoat from "./models/FishBoat";
import Plane from "./models/Plane";
import Sun from "./models/Sun";
import CargoShip from "./models/CargoShip";

var display, camControl;


export default class App {
    constructor() {

        // Counter for moving crane
        this.counter = 0;
        //Counter for moving ship
        this.counterShip = 0;



        this.sunAdjust = -0.04;
        this.lightIntensity = 1.0;

        const c = document.getElementById('mycanvas');
        // Enable antialias for smoother lines
        this.renderer = new THREE.WebGLRenderer({canvas: c, antialias: true});
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 4/3, 0.5, 1000);
        this.camera.position.z = 100;

        //Position for non VR
        //height of average human 5.6ft standing atop the platform 10ft above water level
        //this.camera.position.set(0, 0, 0);


        // const orbiter = new OrbitControls(this.camera);
        // orbiter.enableZoom = false;
        // orbiter.update();

        this.tracker = new TrackballControls(this.camera, c);
        this.tracker.rotateSpeed = 2.0;
        this.tracker.noZoom = false;
        this.tracker.noPan = false;

        window.addEventListener('deviceorientation', event => {
           //TODO: Use event.alpha, event.beta, event.gamma to update camera matrix
        });

        // //VR controls
        // const polyfill = new WebVRPolyfill();
        // navigator.getVRDisplays().then(displays => {
        //     if (displays.length > 0) {
        //         // WebVR is supported
        //         display = displays[0];
        //         camControl = new VRControls(this.camera);
        //
        //         //this allows the camera to be set to an initial spot
        //         this.dolly = new THREE.Group();
        //         this.dolly.position.set( 0, 15.6, 10 );
        //         this.scene.add( this.dolly );
        //         this.dolly.add( this.camera);
        //
        //     } else {
        //         // WebVR is NOT supported, fallback to trackball control
        //         display = window;
        //         this.tracker = new TrackballControls(this.camera, c);
        //         this.tracker.rotateSpeed = 2.0;
        //         this.tracker.noZoom = false;
        //         this.tracker.noPan = false;
        //         camControl = this.tracker;
        //     }
        //     //display.requestAnimationFrame(this.render);
        // });




        this.lightOne = new THREE.AmbientLight (0xFFFFFF, this.lightIntensity);
        //this.lightOne.position.set (-50, 40, 100);
        this.scene.add (this.lightOne);

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
        this.scene.add(this.sun);
        let trans = new THREE.Matrix4().makeTranslation(0, 150, 400);
        this.sun.matrix.multiply(trans);


        this.loader = new THREE.ObjectLoader();

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
        this.crane.translateY(12.5);
        this.crane.translateX(70);
        this.crane.translateZ(-20);
        this.scene.add(this.crane);
        for(let i = 0; i < 30; i++){
            this.crane.moveContainer("up");
        }

        this.cargoShip = new CargoShip();
        this.cargoShip.matrixAutoUpdate = false;
        var transShip = new THREE.Matrix4().makeTranslation(25, 5, 0);
        var rotZ = new THREE.Matrix4().makeRotationZ(-.1);
        this.cargoShip.matrix.multiply(rotZ);
        this.cargoShip.matrix.multiply(transShip);
        this.scene.add(this.cargoShip);

        window.addEventListener('resize', () => this.resizeHandler());
        this.resizeHandler();
        requestAnimationFrame(() => this.render());

    }

    render() {
        this.renderer.render(this.scene, this.camera);
        //camControl.update();
        this.tracker.update();
        //display.requestAnimationFrame(this.render);

        let trans = new THREE.Matrix4().makeTranslation(-0.1,0,0);
        let rotY = new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(0.1));
        this.fBoat.matrix.multiply(trans);
        this.fBoat.matrix.multiply(rotY);

        let rotX = new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(this.sunAdjust));
        this.sun.matrix.premultiply(rotX);

        let position = new THREE.Vector3();
        position.setFromMatrixPosition( this.sun.matrixWorld );

        if (position.y < 200 && position.y > 0) {
            this.sun.editColor(position.y);
            let intensitySub =  ((200 - position.y) / 200) * 0.7;
            this.lightIntensity = 1 - intensitySub;
            this.lightOne.intensity = this.lightIntensity;
        }

        if (position.y < -50){
            this.sunAdjust = -0.5;
            this.sun.dimLight(0);
        }
        else{
            this.sunAdjust = -0.04;
            this.sun.dimLight(1.0 - this.lightIntensity);
        }

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
        this.crane.moveableCraneGroup.rotateY(THREE.Math.degToRad(1));

        //Rock Cargo Ship
        this.counterShip++;

        if(this.counterShip < 200 && this.counterShip % 2 === 0){
            let rotZ = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(0.1));
            this.cargoShip.matrix.multiply(rotZ);
        }
        else if(this.counterShip > 200 && this.counterShip < 400 && this.counterShip % 2 === 0){
            let rotZ1 = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(-0.1));
            this.cargoShip.matrix.multiply(rotZ1);
        }
        if(this.counterShip === 401){
            this.counterShip = 0;
        }

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
        //this.tracker.handleResize();
    }
    
}
