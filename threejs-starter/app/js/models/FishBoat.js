import * as THREE from 'three';
import boatModel from "/home/sam/Documents/school/cis367/Virtual_Sea_Port/threejs-starter/app/js/models/boat-threejs/boat.json";


export default class FishBoat {
    constructor () {
        let boatGroup = new THREE.Group();

        this.loader = new THREE.ObjectLoader();


        this.loader.load(boatModel,
            (obj) => {
                obj.scale.set(0.1, 0.1, 0.1);
                boatGroup.add(obj)
            });


        return boatGroup;
    }
}