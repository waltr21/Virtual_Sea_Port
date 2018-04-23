import * as THREE from 'three';

export default class Plane {
    constructor () {
        let g = new THREE.Group();

        this.loader = new THREE.ObjectLoader();


        this.loader.load("/app/js/models/AirPlane/AirPlane.json",
            (obj) => {
                obj.scale.set(2, 2, 2);
                obj.castShadow = true;
                g.add(obj)
            });


        return g;
    }
}