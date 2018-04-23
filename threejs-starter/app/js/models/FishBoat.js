import * as THREE from 'three';

export default class FishBoat {
    constructor () {
        let boatGroup = new THREE.Group();

        this.loader = new THREE.ObjectLoader();


        this.loader.load("/app/js/models/boat-threejs/boat.json",
            (obj) => {
                obj.scale.set(0.1, 0.1, 0.1);
                boatGroup.add(obj)
            });


        return boatGroup;
    }
}