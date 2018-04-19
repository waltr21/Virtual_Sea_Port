import { TextureLoader, PlaneGeometry, DoubleSide, MeshPhongMaterial, Mesh, Group, Math, RepeatWrapping} from 'three';
//import * as THREE from 'three';
//import grass from "/home/sam/Documents/school/cis367/Virtual_Sea_Port/threejs-starter/images/grass.jpg";


export default class PortFloor {
    constructor () { // number of spokes on the wheel

        //Creates a group for all port scenery
        let floorGroup =  new Group();

        //grass
        const grassTex = new TextureLoader().load("Images/grass.jpg");
        grassTex.wrapS = RepeatWrapping;
        grassTex.wrapT = RepeatWrapping;
        grassTex.repeat.x = 10;
        grassTex.repeat.y = 10;
        let geometry = new PlaneGeometry(100, 100);
        let material = new MeshPhongMaterial({map: grassTex, side: DoubleSide});
        let grass = new Mesh(geometry, material);
        grass.rotateX(Math.degToRad(90));
        floorGroup.add(grass);

        //wall
        const metalTex = new TextureLoader().load("Images/metal.jpg");
        metalTex.wrapS = RepeatWrapping;
        metalTex.wrapT = RepeatWrapping;
        metalTex.repeat.x = 10;
        metalTex.repeat.y = 1;
        let geometry1 = new PlaneGeometry(100, 10);
        let material1 = new MeshPhongMaterial({map: metalTex, side: DoubleSide});
        let wall = new Mesh(geometry1, material1);
        wall.translateX(-50);
        wall.translateY(-5);
        wall.rotateY(Math.degToRad(90));
        wall.rotateX(Math.degToRad(180));
        floorGroup.add(wall);

        //road horizontal
        const leftRightRoad = new TextureLoader().load("Images/road.jpg");
        leftRightRoad.wrapS = RepeatWrapping;
        leftRightRoad.wrapT = RepeatWrapping;
        leftRightRoad.repeat.x = 3;
        leftRightRoad.repeat.y = 1;
        let geometry2 = new PlaneGeometry(30, 10);
        let material2 = new MeshPhongMaterial({map: leftRightRoad, side: DoubleSide});
        let road = new Mesh(geometry2, material2);
        road.translateY(.01);
        road.translateX(35);
        road.rotateX(Math.degToRad(90));
        floorGroup.add(road);

        //road vertical
        const upDownRoad = new TextureLoader().load("Images/roadv.jpg");
        upDownRoad.wrapS = RepeatWrapping;
        upDownRoad.wrapT = RepeatWrapping;
        upDownRoad.repeat.x = 1;
        upDownRoad.repeat.y = 3;
        let geometry3 = new PlaneGeometry(10, 45);
        let material3 = new MeshPhongMaterial({map: upDownRoad, side: DoubleSide});
        let road1 = new Mesh(geometry3, material3);
        road1.translateY(.01);
        road1.translateZ(27.5);
        road1.translateX(15);
        road1.rotateX(Math.degToRad(90));
        floorGroup.add(road1);

        //road vertical1
        let road2 = new Mesh(geometry3, material3);
        road2.translateY(.01);
        road2.translateZ(-27.5);
        road2.translateX(15);
        road2.rotateX(Math.degToRad(90));
        floorGroup.add(road2);

        //road intersection
        const roadB = new TextureLoader().load("Images/intersection3.jpg");
        let geometry4 = new PlaneGeometry(10, 10);
        let material4 = new MeshPhongMaterial({map: roadB, side: DoubleSide});
        let roadBlank = new Mesh(geometry4, material4);
        roadBlank.translateY(.01);
        roadBlank.translateZ(0);
        roadBlank.translateX(15);
        roadBlank.rotateX(Math.degToRad(90));
        roadBlank.rotateZ(Math.degToRad(90));
        floorGroup.add(roadBlank);

        //asphalt port yard
        const asphalt = new TextureLoader().load("Images/asphalt.jpg");
        asphalt.wrapS = RepeatWrapping;
        asphalt.wrapT = RepeatWrapping;
        asphalt.repeat.x = 55;
        asphalt.repeat.y = 75;
        let geometry5 = new PlaneGeometry(55, 75);
        let material5 = new MeshPhongMaterial({map: asphalt, side: DoubleSide});
        let yard = new Mesh(geometry5, material5);
        yard.translateY(.01);
        yard.translateX(-22.5);
        yard.rotateX(Math.degToRad(90));
        floorGroup.add(yard);

        //portyard drive
        const asphalt1 = new TextureLoader().load("Images/asphalt.jpg");
        asphalt1.wrapS = RepeatWrapping;
        asphalt1.wrapT = RepeatWrapping;
        asphalt1.repeat.x = 5;
        asphalt1.repeat.y = 10;
        let geometry6 = new PlaneGeometry(5, 10);
        let material6 = new MeshPhongMaterial({map: asphalt1, side: DoubleSide});
        let yardDrive = new Mesh(geometry6, material6);
        yardDrive.translateY(.01);
        yardDrive.translateX(7.5);
        yardDrive.rotateX(Math.degToRad(90));
        floorGroup.add(yardDrive);

        //wood decking
        const wood = new TextureLoader().load("Images/wood.jpg");
        wood.wrapS = RepeatWrapping;
        wood.wrapT = RepeatWrapping;
        wood.repeat.x = 2;
        wood.repeat.y = 20;
        let geometry7 = new PlaneGeometry(2, 75);
        let material7 = new MeshPhongMaterial({map: wood, side: DoubleSide});
        let deck = new Mesh(geometry7, material7);
        deck.translateY(.02);
        deck.translateX(-49);
        deck.rotateX(Math.degToRad(90));
        floorGroup.add(deck);


        return floorGroup;   // the constructor must return the entire group
    }
}