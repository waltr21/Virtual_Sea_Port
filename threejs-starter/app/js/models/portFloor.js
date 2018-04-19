import * as THREE from 'three';
import grass from "/home/sam/Documents/school/cis367/Virtual_Sea_Port/threejs-starter/images/grass.jpg";


export default class portFloor {
    constructor () { // number of spokes on the wheel

        //Creates a group for all port scenery
        let floorGroup =  THREE.Group();

        var geometry = new THREE.PlaneGeometry(100, 100);
        var material = new THREE.MeshPhongMaterial({color: 0x25772a, side: THREE.DoubleSide});
        var grass = new THREE.Mesh(geometry, material);
        floorGroup.add(grass);


        return floorGroup;   // the constructor must return the entire group
    }
}