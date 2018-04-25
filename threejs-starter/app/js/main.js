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

var display, camControl, dolly;
var isWalking = false;
var inVR;


export default class App {
    constructor() {

        // Counter for moving crane
        this.counter = 0;
        //Counter for moving ship
        this.counterShip = 0;
        //Counter for walking
        this.counterWalk = 0;

        const c = document.getElementById('mycanvas');
        // Enable antialias for smoother lines
        this.renderer = new THREE.WebGLRenderer({canvas: c, antialias: true});
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 4/3, 0.5, 1000);

        //Position for non VR
        //height of average human 5.6ft standing atop the platform 10ft above water level
        this.camera.position.set(60, 15.6, 0);

        //this allows the camera to be set to an initial spot
        // this.dolly.position.set( 240, 15.6, 10 );
        dolly = new THREE.Group();
        dolly.add( this.camera);
        dolly.matrixAutoUpdate = false;
        this.scene.add( dolly );


        // const orbiter = new OrbitControls(this.camera);
        // orbiter.enableZoom = false;
        // orbiter.update();

        window.addEventListener('deviceorientation', event => {
            //TODO: Use event.alpha, event.beta, event.gamma to update camera matrix
        });

        //VR controls
        const polyfill = new WebVRPolyfill();
        navigator.getVRDisplays().then(displays => {
            if (displays.length > 0) {
                // WebVR is supported
                display = displays[0];
                camControl = new VRControls(this.camera);

                var trans = new THREE.Matrix4().makeTranslation(240, 15.6, 10);
                dolly.matrix.multiply(trans);

            } else {
                // WebVR is NOT supported, fallback to trackball control
                display = window;
                this.tracker = new TrackballControls(this.camera, c);
                this.tracker.rotateSpeed = 2.0;
                this.tracker.noZoom = false;
                this.tracker.noPan = false;
                camControl = this.tracker;
            }
            //display.requestAnimationFrame(this.render);
        });


        // this.tracker = new TrackballControls(this.camera, c);
        // this.tracker.rotateSpeed = 2.0;
        // this.tracker.noZoom = false;
        // this.tracker.noPan = false;

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

        //Use Mumble library for voice commands
        var Mumble = require('mumble-js');

        var mumble = new Mumble({
            language: 'en-US',
            debug: false, // set to true to get some detailed information about what's going on

            // define some commands using regex or a simple string for exact matching
            commands: [{
                name: 'walk forward',
                command: "walk",

                action: function() {
                    isWalking = true;
                }
            }, {
                name: 'stop walking',
                command: "stop",

                action: function() {
                    isWalking = false;
                }
            }, {
                name: 'turn left',
                command: "turn left",
                action: function () {
                    turnBodyLeft();
                }
            }, {
                name: 'turn right',
                command: "turn right",

                action: function() {
                    turnBodyRight();
                }
            }],

            // define global callbacks (see docs for all)
            callbacks: {
                start: function(event) {
                    //console.log('Starting..');
                }
            }
        });


        // start listening
        mumble.start();



    }


    // objectLoad(obj){
    //     this.scene.add(obj);
    // }


    render() {
        this.renderer.render(this.scene, this.camera);
        camControl.update();


        let trans = new THREE.Matrix4().makeTranslation(-0.1,0,0);
        let rotY = new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(0.1));
        this.fBoat.matrix.multiply(trans);
        this.fBoat.matrix.multiply(rotY);

        if(isWalking){
            this.counterWalk++;

            var transBody = new THREE.Matrix4().makeTranslation(0, 0, -.1);
            dolly.matrix.multiply(transBody);
            console.log("moving forward");

            //head bob
            if(this.counterWalk < 25 && this.counterWalk % 2 === 0){
                var transUp = new THREE.Matrix4().makeTranslation(0, .02, 0);
                dolly.matrix.multiply(transUp);
            }else if (this.counterWalk > 25 && this.counterWalk < 50 && this.counterWalk % 2 === 0){
                var transDown = new THREE.Matrix4().makeTranslation(0, -.02, 0);
                dolly.matrix.multiply(transDown);
            }
            if(this.counterWalk === 51){
                this.counterWalk = 0;
            }
        }else{
            this.counterWalk = 0;
        }



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


function turnBodyLeft(){
    var rotY = new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(90));
    dolly.matrix.multiply(rotY);

    console.log("turning left");
}

function turnBodyRight(){
    var rotY = new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(-90));
    dolly.matrix.multiply(rotY);

    console.log("turning right");
}