import {
    TextureLoader, PlaneGeometry, DoubleSide, MeshPhongMaterial, Mesh, Group, RepeatWrapping,
    MeshBasicMaterial
} from 'three';
import * as THREE from "three";
//import * as THREE from 'three';
import grassImage from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/Images/grass.jpg";
import metalImage from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/Images/metal.jpg";
import roadImage from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/Images/road.jpg";
import turnImage from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/Images/turn.jpg";
import asphaltImage from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/Images/asphalt.jpg";
import runwayImage from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/Images/runway.jpg";
import roadVImage from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/Images/roadv.jpg";
import intersection3Image from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/Images/intersection3.jpg";
import intersection4Image from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/Images/intersection4.jpg";
import treeModel from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/app/js/models/json-objects/tree.json";
import truckModel from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/app/js/models/truck/delivery-truck.json";
import cargoModel from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/app/js/models/json-objects/cargo.json";
import cargo1Model from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/app/js/models/json-objects/cargo1.json";




export default class PortFloor {
    constructor () {

        //Creates a group for all port scenery
        this.floorGroup =  new Group();

        //grass
        const grassTex = new TextureLoader().load(grassImage);
        grassTex.wrapS = RepeatWrapping;
        grassTex.wrapT = RepeatWrapping;
        grassTex.repeat.x = 50;
        grassTex.repeat.y = 100;
        let geometry = new PlaneGeometry(500, 1000);
        let material = new MeshPhongMaterial({map: grassTex, side: DoubleSide, shininess: 0});
        let grass = new Mesh(geometry, material);
        grass.rotateX(THREE.Math.degToRad(90));
        grass.translateX(100);
        //grass.receiveShadow = true;
        this.floorGroup.add(grass);

        //testObject **************************************************************************
        // var geo = new THREE.BoxGeometry( 20, 20, 20 );
        // var mat = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
        // var cube = new THREE.Mesh( geo, mat);
        // cube.castShadow = true;
        // this.floorGroup.add( cube );
        //*************************************************************************************

        //wall
        const metalTex = new TextureLoader().load(metalImage);
        metalTex.wrapS = RepeatWrapping;
        metalTex.wrapT = RepeatWrapping;
        metalTex.repeat.x = 100;
        metalTex.repeat.y = 1;
        let geometry1 = new PlaneGeometry(1000, 10);
        let material1 = new MeshPhongMaterial({map: metalTex, side: DoubleSide});
        let wall = new Mesh(geometry1, material1);
        wall.translateX(-150);
        wall.translateY(-5);
        wall.rotateY(THREE.Math.degToRad(90));
        wall.rotateX(THREE.Math.degToRad(180));
        //wall.receiveShadow = true;
        this.floorGroup.add(wall);

        //road horizontal
        const leftRightRoad = new TextureLoader().load(roadImage);
        leftRightRoad.wrapS = RepeatWrapping;
        leftRightRoad.wrapT = RepeatWrapping;
        leftRightRoad.repeat.x = 11;
        leftRightRoad.repeat.y = 1;
        let geometry2 = new PlaneGeometry(220, 20);
        let material2 = new MeshPhongMaterial({map: leftRightRoad, side: DoubleSide, shininess: 0});
        let road = new Mesh(geometry2, material2);
        road.translateY(.01);
        road.translateX(140);
        road.rotateX(THREE.Math.degToRad(90));
        //road.receiveShadow = true;
        this.floorGroup.add(road);

        //road horizontal1
        const leftRightRoad1 = new TextureLoader().load(roadImage);
        leftRightRoad1.wrapS = RepeatWrapping;
        leftRightRoad1.wrapT = RepeatWrapping;
        leftRightRoad1.repeat.x = 11;
        leftRightRoad1.repeat.y = 1;
        let geometry10 = new PlaneGeometry(220, 20);
        let material10 = new MeshPhongMaterial({map: leftRightRoad1, side: DoubleSide, shininess: 0});
        let roadh1 = new Mesh(geometry10, material10);
        roadh1.translateY(.01);
        roadh1.translateZ(160);
        roadh1.translateX(140);
        roadh1.rotateX(THREE.Math.degToRad(90));
        //roadh1.receiveShadow = true;
        this.floorGroup.add(roadh1);

        //road vertical
        const upDownRoad = new TextureLoader().load(roadVImage);
        upDownRoad.wrapS = RepeatWrapping;
        upDownRoad.wrapT = RepeatWrapping;
        upDownRoad.repeat.x = 1;
        upDownRoad.repeat.y = 7;
        let geometry9 = new PlaneGeometry(20, 140);
        let material9 = new MeshPhongMaterial({map: upDownRoad, side: DoubleSide, shininess: 0});
        let road1 = new Mesh(geometry9, material9);
        road1.translateY(.01);
        road1.translateZ(80);
        road1.translateX(20);
        road1.rotateX(THREE.Math.degToRad(90));
        //road1.receiveShadow = true
        this.floorGroup.add(road1);

        //road vertical1
        const upDownRoad1 = new TextureLoader().load(roadVImage);
        upDownRoad1.wrapS = RepeatWrapping;
        upDownRoad1.wrapT = RepeatWrapping;
        upDownRoad1.repeat.x = 1;
        upDownRoad1.repeat.y = 20;
        let geometry3 = new PlaneGeometry(20, 440);
        let material3 = new MeshPhongMaterial({map: upDownRoad1, side: DoubleSide, shininess: 0});
        let road2 = new Mesh(geometry3, material3);
        road2.translateY(.01);
        road2.translateZ(-230);
        road2.translateX(20);
        road2.rotateX(THREE.Math.degToRad(90));
        //road2.receiveShadow = true;
        this.floorGroup.add(road2);

        //road intersection
        const roadB = new TextureLoader().load(intersection3Image);
        let geometry4 = new PlaneGeometry(20, 20);
        let material4 = new MeshPhongMaterial({map: roadB, side: DoubleSide, shininess: 0});
        let roadBlank = new Mesh(geometry4, material4);
        roadBlank.translateY(.01);
        roadBlank.translateZ(0);
        roadBlank.translateX(20);
        roadBlank.rotateX(THREE.Math.degToRad(90));
        roadBlank.rotateZ(THREE.Math.degToRad(90));
        //roadBlank.receiveShadow = true;
        this.floorGroup.add(roadBlank);

        //road turn
        const roadT = new TextureLoader().load(turnImage);
        let geometry8 = new PlaneGeometry(20, 20);
        let material8 = new MeshPhongMaterial({map: roadT, side: DoubleSide, shininess: 0});
        let roadTurn = new Mesh(geometry8, material8);
        roadTurn.translateY(.01);
        roadTurn.translateZ(160);
        roadTurn.translateX(20);
        roadTurn.rotateY(THREE.Math.degToRad(90));
        roadTurn.rotateX(THREE.Math.degToRad(90));
        roadTurn.rotateZ(THREE.Math.degToRad(90));
        //roadTurn.receiveShadow = true;
        this.floorGroup.add(roadTurn);

        //asphalt port yard
        const asphalt = new TextureLoader().load(asphaltImage);
        asphalt.wrapS = RepeatWrapping;
        asphalt.wrapT = RepeatWrapping;
        asphalt.repeat.x = 150;
        asphalt.repeat.y = 200;
        let geometry5 = new PlaneGeometry(150, 200);
        let material5 = new MeshPhongMaterial({map: asphalt, side: DoubleSide, shininess: 0});
        let yard = new Mesh(geometry5, material5);
        yard.translateY(.01);
        yard.translateX(-75);
        yard.rotateX(THREE.Math.degToRad(90));
        //yard.receiveShadow = true;
        this.floorGroup.add(yard);

        //portyard drive
        const asphalt1 = new TextureLoader().load(asphaltImage);
        asphalt1.wrapS = RepeatWrapping;
        asphalt1.wrapT = RepeatWrapping;
        asphalt1.repeat.x = 10;
        asphalt1.repeat.y = 20;
        let geometry6 = new PlaneGeometry(10, 20);
        let material6 = new MeshPhongMaterial({map: asphalt1, side: DoubleSide, shininess: 0});
        let yardDrive = new Mesh(geometry6, material6);
        yardDrive.translateY(.01);
        yardDrive.translateX(5);
        yardDrive.rotateX(THREE.Math.degToRad(90));
        //yardDrive.receiveShadow = true;
        this.floorGroup.add(yardDrive);

        //Runway
        const runwayTex = new TextureLoader().load(runwayImage);
        runwayTex.wrapS = RepeatWrapping;
        runwayTex.wrapT = RepeatWrapping;
        runwayTex.repeat.x = 1;
        runwayTex.repeat.y = 16;
        let geometry11 = new PlaneGeometry(30, 400);
        let material11 = new MeshPhongMaterial({map: runwayTex, side: DoubleSide, shininess: 0});
        let runway = new Mesh(geometry11, material11);
        runway.translateY(.01);
        runway.translateZ(350);
        runway.translateX(30);
        runway.rotateX(THREE.Math.degToRad(90));
        runway.rotateZ(THREE.Math.degToRad(-55));
        //runway.receiveShadow = true;
        this.floorGroup.add(runway);

        //wood decking
        // const wood = new TextureLoader().load("Images/wood.jpg");
        // wood.wrapS = RepeatWrapping;
        // wood.wrapT = RepeatWrapping;
        // wood.repeat.x = 2;
        // wood.repeat.y = 20;
        // let geometry7 = new PlaneGeometry(2, 75);
        // let material7 = new MeshPhongMaterial({map: wood, side: DoubleSide});
        // let deck = new Mesh(geometry7, material7);
        // deck.translateY(.02);
        // deck.translateX(-49);
        // deck.rotateX(Math.degToRad(90));
        // floorGroup.add(deck);

        this.loader = new THREE.ObjectLoader();


        //trees
        this.loader.load(treeModel, (obj) => {
            for (var i = 0; i < 50; i++) {
                var size = getRandomArbitrary(.3, .6);
                var temp = obj.clone();
                temp.scale.set(size, size, size);
                var x = getRandomInt(45, 220);
                var z = getRandomInt(-425, 425);
                var degs = getRandomInt(0, 180);
                obj.rotateY(THREE.Math.degToRad(degs));

                //ignore tree if it obstructs road
                if((z > 20 || z < -25) && (z > 180 || z < 140) && z < 300) {
                    temp.position.set(x, 0, z);
                    //temp.castShadow = true;
                    this.floorGroup.add(temp);
                }
            }
        });


        //trucks
        this.loader.load(truckModel, (obj) => {
            var x = -13;
            var y = 0;
            var z = 0;
            obj.scale.set(.03, .03, .03);

            obj.rotateY(THREE.Math.degToRad(-90));
            for (var i = 0; i < 4; i++) {
                var temp = obj.clone();
                z = -100 + ((i + 1) * 10);
                temp.position.set(x, y, z);
                this.floorGroup.add(temp);
            }

        });

        this.placeContainers();
        this.placeWarehouse();


        return this.floorGroup;   // the constructor must return the entire group
    }

    placeWarehouse(){
        const siding = new TextureLoader().load("Images/blankSide.jpg");
        siding.wrapS = RepeatWrapping;
        siding.wrapT = RepeatWrapping;
        siding.repeat.x = 4;
        siding.repeat.y = 1;
        const loadingBay = new TextureLoader().load("Images/loadingBay.jpg");
        loadingBay.wrapS = RepeatWrapping;
        loadingBay.wrapT = RepeatWrapping;
        loadingBay.repeat.x = 4;
        loadingBay.repeat.y = 1;
        const roof = new TextureLoader().load("Images/gravelRoof.jpg");
        roof.wrapS = RepeatWrapping;
        roof.wrapT = RepeatWrapping;
        roof.repeat.x = 30;
        roof.repeat.y = 30;
        var geometry = new THREE.BoxGeometry( 75, 20, 50 );
        var material =  [
            new MeshPhongMaterial({map: siding, side: DoubleSide}),
            new MeshPhongMaterial({map: siding, side: DoubleSide}),
            new MeshPhongMaterial({map: roof, side: DoubleSide, shininess: 0}),
            new MeshPhongMaterial({color: 0x111111, side: DoubleSide}),
            new MeshPhongMaterial({map: siding, side: DoubleSide}),
            new MeshPhongMaterial({map: loadingBay, side: DoubleSide}),
        ];
        var warehouse = new THREE.Mesh( geometry, material );
        warehouse.translateY(10);
        warehouse.translateX(-50);
        warehouse.translateZ(65);
        this.floorGroup.add( warehouse );
    }



    placeContainers(){

        //cargo containers1
        this.loader.load(cargoModel,
            (obj) => {
                var x = -80;
                var y = 0;
                var z = -80;
                obj.scale.set(.85, .77, .77);

                for (var i = 0; i < 3; i++) {
                    var temp = obj.clone();
                    y = i * 8;
                    if(i % 3 === 0) {
                        temp.position.set(x, y, z);
                        this.floorGroup.add(temp);
                    } else {
                        temp.position.set(x + 20, y, z);
                        this.floorGroup.add(temp);
                    }
                }
            });

        //cargo containers2
        this.loader.load(cargo1Model,
            (obj) => {
                var x = -80;
                var y = 0;
                var z = -80;
                obj.scale.set(.85, .77, .77);

                for (var i = 0; i < 3; i++) {
                    var temp = obj.clone();
                    y = i * 8;
                    if(i % 3 !== 0) {
                        temp.position.set(x, y, z);
                        this.floorGroup.add(temp);
                    }else {
                        temp.position.set(x + 20, y, z);
                        this.floorGroup.add(temp);
                    }
                }
            });
        //cargo containers3
        this.loader.load(cargoModel,
            (obj) => {
                var x = -120;
                var y = 0;
                var z = -80;
                obj.scale.set(.85, .77, .77);

                for (var i = 0; i < 3; i++) {
                    var temp = obj.clone();
                    y = i * 8;
                    if(i % 4 === 0) {
                        temp.position.set(x, y, z);
                        this.floorGroup.add(temp);
                    } else {
                        temp.position.set(x + 20, y, z);
                        this.floorGroup.add(temp);
                    }
                }
            });

        //cargo containers4
        this.loader.load(cargo1Model,
            (obj) => {
                var x = -120;
                var y = 0;
                var z = -80;
                obj.scale.set(.85, .77, .77);

                for (var i = 0; i < 3; i++) {
                    var temp = obj.clone();
                    y = i * 8;
                    if(i % 4 !== 0) {
                        temp.position.set(x, y, z);
                        this.floorGroup.add(temp);
                    }else {
                        temp.position.set(x + 20, y, z);
                        this.floorGroup.add(temp);
                    }
                }
            });
        //cargo containers5
        this.loader.load(cargoModel,
            (obj) => {
                var x = -80;
                var y = 0;
                var z = -72;
                obj.scale.set(.85, .77, .77);

                for (var i = 0; i < 3; i++) {
                    var temp = obj.clone();
                    y = i * 8;
                    if(i % 2 === 0) {
                        temp.position.set(x, y, z);
                        this.floorGroup.add(temp);
                    } else {
                        temp.position.set(x + 20, y, z);
                        this.floorGroup.add(temp);
                    }
                }
            });

        //cargo containers6
        this.loader.load(cargo1Model,
            (obj) => {
                var x = -80;
                var y = 0;
                var z = -72;
                obj.scale.set(.85, .77, .77);

                for (var i = 0; i < 3; i++) {
                    var temp = obj.clone();
                    y = i * 8;
                    if(i % 2 !== 0) {
                        // temp.position.set(x, y, z);
                        // this.floorGroup.add(temp);
                    }else {
                        temp.position.set(x + 20, y, z);
                        this.floorGroup.add(temp);
                    }
                }
            });
        //cargo containers7
        this.loader.load(cargoModel,
            (obj) => {
                var x = -120;
                var y = 0;
                var z = -72;
                obj.scale.set(.85, .77, .77);

                for (var i = 0; i < 3; i++) {
                    var temp = obj.clone();
                    y = i * 8;
                    if(i % 1 === 0) {
                        temp.position.set(x, y, z);
                        this.floorGroup.add(temp);
                    } else {
                        //commented to lighten cpu load
                        // temp.position.set(x + 20, y, z);
                        // this.floorGroup.add(temp);
                    }
                }
            });

        //cargo containers8
        this.loader.load(cargo1Model,
            (obj) => {
                var x = -120;
                var y = 0;
                var z = -72;
                obj.scale.set(.85, .77, .77);

                for (var i = 0; i < 3; i++) {
                    var temp = obj.clone();
                    y = i * 8;
                    if(i % 1 !== 0) {
                       // temp.position.set(x, y, z);
                        //this.floorGroup.add(temp);
                    }else {
                        temp.position.set(x + 20, y, z);
                        this.floorGroup.add(temp);
                    }
                }
            });
        //cargo containers9
        this.loader.load(cargoModel,
            (obj) => {
                var x = -80;
                var y = 0;
                var z = -64;
                obj.scale.set(.85, .77, .77);

                for (var i = 0; i < 3; i++) {
                    var temp = obj.clone();
                    y = i * 8;
                    if(i % 3 === 0) {
                        // temp.position.set(x, y, z);
                        // this.floorGroup.add(temp);
                    } else {
                        temp.position.set(x + 20, y, z);
                        this.floorGroup.add(temp);
                    }
                }
            });

        //cargo containers10
        this.loader.load(cargo1Model,
            (obj) => {
                var x = -80;
                var y = 0;
                var z = -64;
                obj.scale.set(.85, .77, .77);

                for (var i = 0; i < 3; i++) {
                    var temp = obj.clone();
                    y = i * 8;
                    if(i % 3 !== 0) {
                        temp.position.set(x, y, z);
                        this.floorGroup.add(temp);
                    }else {
                        temp.position.set(x + 20, y, z);
                        this.floorGroup.add(temp);
                    }
                }
            });
        //cargo containers11
        this.loader.load(cargoModel,
            (obj) => {
                var x = -120;
                var y = 0;
                var z = -64;
                obj.scale.set(.85, .77, .77);

                for (var i = 0; i < 3; i++) {
                    var temp = obj.clone();
                    y = i * 8;
                    if(i % 2 === 0) {
                        temp.position.set(x, y, z);
                        this.floorGroup.add(temp);
                    } else {
                        //temp.position.set(x + 20, y, z);
                        //this.floorGroup.add(temp);
                    }
                }
            });

        //cargo containers12
        this.loader.load(cargo1Model,
            (obj) => {
                var x = -120;
                var y = 0;
                var z = -64;
                obj.scale.set(.85, .77, .77);

                for (var i = 0; i < 3; i++) {
                    var temp = obj.clone();
                    y = i * 8;
                    if(i % 2 !== 0) {
                        temp.position.set(x, y, z);
                        this.floorGroup.add(temp);
                    }else {
                        temp.position.set(x + 20, y, z);
                        this.floorGroup.add(temp);
                    }
                }
            });
        //cargo containers13
        this.loader.load(cargoModel,
            (obj) => {
                var x = -80;
                var y = 0;
                var z = -56;
                obj.scale.set(.85, .77, .77);

                for (var i = 0; i < 3; i++) {
                    var temp = obj.clone();
                    y = i * 8;
                    if(i % 4 === 0) {
                        // temp.position.set(x, y, z);
                        // this.floorGroup.add(temp);
                    } else {
                        temp.position.set(x + 20, y, z);
                        this.floorGroup.add(temp);
                    }
                }
            });

        //cargo containers14
        this.loader.load(cargo1Model,
            (obj) => {
                var x = -80;
                var y = 0;
                var z = -56;
                obj.scale.set(.85, .77, .77);

                for (var i = 0; i < 3; i++) {
                    var temp = obj.clone();
                    y = i * 8;
                    if(i % 4 !== 0) {
                        temp.position.set(x, y, z);
                        this.floorGroup.add(temp);
                    }else {
                        temp.position.set(x + 20, y, z);
                        this.floorGroup.add(temp);
                    }
                }
            });
        //cargo containers15
        this.loader.load(cargoModel,
            (obj) => {
                var x = -120;
                var y = 0;
                var z = -56;
                obj.scale.set(.85, .77, .77);

                for (var i = 0; i < 3; i++) {
                    var temp = obj.clone();
                    y = i * 8;
                    if(i % 3 === 0) {
                        temp.position.set(x, y, z);
                        this.floorGroup.add(temp);
                    } else {
                        temp.position.set(x + 20, y, z);
                        this.floorGroup.add(temp);
                    }
                }
            });

        //cargo containers16
        this.loader.load(cargo1Model,
            (obj) => {
                var x = -120;
                var y = 0;
                var z = -56;
                obj.scale.set(.85, .77, .77);

                for (var i = 0; i < 3; i++) {
                    var temp = obj.clone();
                    y = i * 8;
                    if(i % 3 !== 0) {
                        temp.position.set(x, y, z);
                        this.floorGroup.add(temp);
                    }else {
                        temp.position.set(x + 20, y, z);
                        this.floorGroup.add(temp);
                    }
                }
            });
        //cargo containers17
        this.loader.load(cargoModel,
            (obj) => {
                var x = -80;
                var y = 0;
                var z = -48;
                obj.scale.set(.85, .77, .77);

                for (var i = 0; i < 3; i++) {
                    var temp = obj.clone();
                    y = i * 8;
                    if(i % 2 === 0) {
                        temp.position.set(x, y, z);
                        this.floorGroup.add(temp);
                    } else {
                        temp.position.set(x + 20, y, z);
                        this.floorGroup.add(temp);
                    }
                }
            });

        //cargo containers18
        this.loader.load(cargo1Model,
            (obj) => {
                var x = -80;
                var y = 0;
                var z = -48;
                obj.scale.set(.85, .77, .77);

                for (var i = 0; i < 3; i++) {
                    var temp = obj.clone();
                    y = i * 8;
                    if(i % 2 !== 0) {
                        temp.position.set(x, y, z);
                        this.floorGroup.add(temp);
                    }else {
                        temp.position.set(x + 20, y, z);
                        this.floorGroup.add(temp);
                    }
                }
            });
        //cargo containers19
        this.loader.load(cargoModel,
            (obj) => {
                var x = -120;
                var y = 0;
                var z = -48;
                obj.scale.set(.85, .77, .77);

                for (var i = 0; i < 3; i++) {
                    var temp = obj.clone();
                    y = i * 8;
                    if(i % 4 === 0) {
                        temp.position.set(x, y, z);
                        this.floorGroup.add(temp);
                    } else {
                        temp.position.set(x + 20, y, z);
                        this.floorGroup.add(temp);
                    }
                }
            });

        //cargo containers20
        this.loader.load(cargo1Model,
            (obj) => {
                var x = -120;
                var y = 0;
                var z = -48;
                obj.scale.set(.85, .77, .77);

                for (var i = 0; i < 3; i++) {
                    var temp = obj.clone();
                    y = i * 8;
                    if(i % 4 !== 0) {
                        temp.position.set(x, y, z);
                        this.floorGroup.add(temp);
                    }else {
                        temp.position.set(x + 20, y, z);
                        this.floorGroup.add(temp);
                    }
                }
            });
    }
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}