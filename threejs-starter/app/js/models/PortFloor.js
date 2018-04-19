import { TextureLoader, PlaneGeometry, DoubleSide, MeshPhongMaterial, Mesh, Group, Math, RepeatWrapping} from 'three';
//import * as THREE from 'three';
//import grass from "/home/sam/Documents/school/cis367/Virtual_Sea_Port/threejs-starter/images/grass.jpg";


export default class PortFloor {
    constructor () { // number of spokes on the wheel

        //Creates a group for all port scenery
        let floorGroup =  new Group();

        const grassTex = new TextureLoader().load("Images/grass.jpg");
        grassTex.wrapS = RepeatWrapping;
        grassTex.wrapT = RepeatWrapping;
        grassTex.repeat.x = 20;
        grassTex.repeat.y = 20;
        let geometry = new PlaneGeometry(100, 100);
        let material = new MeshPhongMaterial({map: grassTex, side: DoubleSide});
        let grass = new Mesh(geometry, material);
        grass.rotateX(Math.degToRad(90));
        floorGroup.add(grass);


        return floorGroup;   // the constructor must return the entire group
    }
}