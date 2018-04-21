import { TextureLoader, PlaneGeometry, CylinderGeometry, DoubleSide, MeshPhongMaterial, MeshBasicMaterial, Mesh, Group, Math, RepeatWrapping} from 'three';
import * as THREE from "three";

export default class Crane {
    constructor () { 

        let craneGroup =  new Group();

        let baseGeo = new CylinderGeometry(4, 4, 15, 4);
        let legGeo = new CylinderGeometry(3, 3, 20, 4);
        let crossGeo = new CylinderGeometry(5, 5, 25, 4);

        let mat = new MeshPhongMaterial({color: 0x5e5e5e});
        let base1 = new Mesh(baseGeo, mat);
        let base2 = new Mesh(baseGeo, mat);
        let leg1 = new Mesh(legGeo, mat);
        let leg2 = new Mesh(legGeo, mat);
        let cross = new Mesh(crossGeo, mat);

        base1.translateZ(-10);
        base1.rotateZ(Math.degToRad(90));
        base1.rotateY(Math.degToRad(45));
        
        base2.translateZ(10);
        base2.rotateZ(Math.degToRad(90));
        base2.rotateY(Math.degToRad(45));

        leg1.translateZ(-10);
        leg1.rotateY(Math.degToRad(45));
        leg1.translateY(10);
        
        leg2.translateZ(10);      
        leg2.rotateY(Math.degToRad(45));
        leg2.translateY(10);

        cross.translateY(20);
        cross.rotateX(Math.degToRad(90));
        cross.rotateY(Math.degToRad(45));




        craneGroup.add(base1, base2, leg1, leg2, cross);

        return craneGroup;
    }
}