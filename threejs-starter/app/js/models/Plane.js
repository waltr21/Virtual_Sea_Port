import * as THREE from 'three';
import planeModel from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/app/js/models/AirPlane/AirPlane.json";


export default class Plane {
    constructor () {
        let g = new THREE.Group();

        this.loader = new THREE.ObjectLoader();


        this.loader.load(planeModel,
            (obj) => {
                obj.scale.set(2, 2, 2);
                //obj.castShadow = true;
                obj.translateZ(200);
                obj.rotateY(THREE.Math.degToRad(55));
                g.add(obj)
            });


        return g;
    }
}