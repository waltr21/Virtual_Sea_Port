import { TextureLoader, PlaneGeometry, BoxGeometry, CylinderGeometry, DoubleSide, MeshPhongMaterial, MeshBasicMaterial, Mesh, Group, Math, RepeatWrapping} from 'three';
import * as THREE from "three";

export default class Crane extends Group {
    constructor () { 
        super();
        this.craneGroup =  new Group();
        this.moveableCraneGroup = new Group();
        this.containerGroup = new Group();

        const red_metalTex = new TextureLoader().load("Images/red_metal2.jpg");
        const windowsTex = new TextureLoader().load("Images/windows2.png");

        let baseGeo = new CylinderGeometry(4, 4, 30, 4);
        let legGeo = new CylinderGeometry(3, 3, 20, 4);
        let crossGeo = new CylinderGeometry(7, 7, 25, 4);
        let shaftGeo = new CylinderGeometry(4, 4, 20, 20);
        let shaftCupplerGeo = new CylinderGeometry(4, 5, 2, 20);
        let boxGeo = new BoxGeometry(30, 10, 20);
        let viewBoxGeo = new BoxGeometry(10, 7, 15);
        let neckGeo = new CylinderGeometry(2, 5, 50, 4);
        let supportGeo = new CylinderGeometry(2, 2, 20, 4);
        let supportGeo2 = new CylinderGeometry(1.9, 1.9, 20, 4);
        let supportGeo3 = new CylinderGeometry(1, 1, 10, 20);
        let rope1Geo = new CylinderGeometry(.2, .2, 52, 20);
        let rope2Geo = new CylinderGeometry(.2, .2, 50, 20);



        let mat = new MeshPhongMaterial({color: 0x5e5e5e});
        let red_mat = new MeshPhongMaterial({map: red_metalTex});
        let win_mat = new MeshPhongMaterial({map: windowsTex});

        let base1 = new Mesh(baseGeo, red_mat);
        let base2 = new Mesh(baseGeo, red_mat);
        let leg1 = new Mesh(legGeo, red_mat);
        let leg2 = new Mesh(legGeo, red_mat);
        let cross = new Mesh(crossGeo, red_mat);
        let shaft = new Mesh(shaftGeo, red_mat);
        let shaftCuppler = new Mesh(shaftCupplerGeo, red_mat);
        let box = new Mesh(boxGeo, red_mat);
        let viewBox = new Mesh(viewBoxGeo, [red_mat, win_mat, red_mat, red_mat, red_mat, red_mat]);
        let neck = new Mesh(neckGeo, red_mat);
        let support1 = new Mesh(supportGeo, red_mat);
        let support2 = new Mesh(supportGeo, red_mat);
        let support3 = new Mesh(supportGeo2, red_mat);
        let support4 = new Mesh(supportGeo2, red_mat);
        let support5 = new Mesh(supportGeo3, red_mat);
        let rope1 = new Mesh(rope1Geo, mat);
        this.rope2 = new Mesh(rope2Geo, mat);




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

        shaft.translateY(35);

        shaftCuppler.translateY(26);

        box.translateY(50);
        box.translateX(10);

        viewBox.translateY(49);
        viewBox.translateX(-5);

        neck.translateY(70);
        neck.translateX(-18);
        neck.rotateZ(Math.degToRad(45));
        neck.rotateY(Math.degToRad(45));

        support1.translateY(65);
        support1.translateX(15);
        support1.translateZ(5);
        support1.rotateY(Math.degToRad(45));

        support2.translateY(65);
        support2.translateX(15);
        support2.translateZ(-5);
        support2.rotateY(Math.degToRad(45));

        support3.translateY(63);
        support3.translateX(19.5);
        support3.translateZ(5);
        support3.rotateZ(Math.degToRad(25));
        support3.rotateY(Math.degToRad(45));

        support4.translateY(63);
        support4.translateX(19.5);
        support4.translateZ(-5);
        support4.rotateZ(Math.degToRad(25));
        support4.rotateY(Math.degToRad(45));

        support5.translateY(73);
        support5.translateX(15);
        support5.rotateX(Math.degToRad(90));

        rope1.translateY(80.7);
        rope1.translateX(-10);
        rope1.rotateZ(Math.degToRad(73));

        this.rope2.translateY(60);
        this.rope2.translateX(-35);


        this.loader = new THREE.ObjectLoader();

       
        this.loader.load("/app/js/models/json-objects/cargo.json",
            (obj) => {
                obj.scale.set(.85, .77, .77);
                obj.translateY(28);
                obj.translateX(-35);
                obj.translateZ(12.5);
                this.containerGroup.add(obj);
            });



        this.moveableCraneGroup.add(shaft, shaftCuppler, box, viewBox, neck, support1, support2, support3, support4, support5, rope1, this.rope2, this.containerGroup)
        this.add(base1, base2, leg1, leg2, cross, this.moveableCraneGroup);
    }

    moveContainer(direction){
        if(direction == "up"){
            this.rope2.scale.y = this.rope2.scale.y - .015625;
            this.rope2.translateY(.3905);
            this.containerGroup.translateY(.78375);
        }
        else if(direction == "down"){
            this.rope2.scale.y = this.rope2.scale.y + .015625;
            this.rope2.translateY(-.3905);
            this.containerGroup.translateY(-.78375);
        }
    }
}