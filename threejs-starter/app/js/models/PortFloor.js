import {TextureLoader, PlaneGeometry, DoubleSide, MeshPhongMaterial, Mesh, Group, RepeatWrapping} from 'three';
import * as THREE from "three";
//import * as THREE from 'three';
//import grass from "/home/sam/Documents/school/cis367/Virtual_Sea_Port/threejs-starter/images/grass.jpg";


export default class PortFloor {
    constructor () { // number of spokes on the wheel

        //Creates a group for all port scenery
        this.floorGroup =  new Group();

        //grass
        const grassTex = new TextureLoader().load("Images/grass.jpg");
        grassTex.wrapS = RepeatWrapping;
        grassTex.wrapT = RepeatWrapping;
        grassTex.repeat.x = 30;
        grassTex.repeat.y = 30;
        let geometry = new PlaneGeometry(300, 300);
        let material = new MeshPhongMaterial({map: grassTex, side: DoubleSide});
        let grass = new Mesh(geometry, material);
        grass.rotateX(THREE.Math.degToRad(90));
        this.floorGroup.add(grass);

        //wall
        const metalTex = new TextureLoader().load("Images/metal.jpg");
        metalTex.wrapS = RepeatWrapping;
        metalTex.wrapT = RepeatWrapping;
        metalTex.repeat.x = 30;
        metalTex.repeat.y = 1;
        let geometry1 = new PlaneGeometry(300, 10);
        let material1 = new MeshPhongMaterial({map: metalTex, side: DoubleSide});
        let wall = new Mesh(geometry1, material1);
        wall.translateX(-150);
        wall.translateY(-5);
        wall.rotateY(THREE.Math.degToRad(90));
        wall.rotateX(THREE.Math.degToRad(180));
        this.floorGroup.add(wall);

        //road horizontal
        const leftRightRoad = new TextureLoader().load("Images/road.jpg");
        leftRightRoad.wrapS = RepeatWrapping;
        leftRightRoad.wrapT = RepeatWrapping;
        leftRightRoad.repeat.x = 6;
        leftRightRoad.repeat.y = 1;
        let geometry2 = new PlaneGeometry(120, 20);
        let material2 = new MeshPhongMaterial({map: leftRightRoad, side: DoubleSide});
        let road = new Mesh(geometry2, material2);
        road.translateY(.01);
        road.translateX(90);
        road.rotateX(THREE.Math.degToRad(90));
        this.floorGroup.add(road);

        //road vertical
        const upDownRoad = new TextureLoader().load("Images/roadv.jpg");
        upDownRoad.wrapS = RepeatWrapping;
        upDownRoad.wrapT = RepeatWrapping;
        upDownRoad.repeat.x = 1;
        upDownRoad.repeat.y = 7;
        let geometry3 = new PlaneGeometry(20, 140);
        let material3 = new MeshPhongMaterial({map: upDownRoad, side: DoubleSide});
        let road1 = new Mesh(geometry3, material3);
        road1.translateY(.01);
        road1.translateZ(80);
        road1.translateX(20);
        road1.rotateX(THREE.Math.degToRad(90));
        this.floorGroup.add(road1);

        //road vertical1
        let road2 = new Mesh(geometry3, material3);
        road2.translateY(.01);
        road2.translateZ(-80);
        road2.translateX(20);
        road2.rotateX(THREE.Math.degToRad(90));
        this.floorGroup.add(road2);

        //road intersection
        const roadB = new TextureLoader().load("Images/intersection3.jpg");
        let geometry4 = new PlaneGeometry(20, 20);
        let material4 = new MeshPhongMaterial({map: roadB, side: DoubleSide});
        let roadBlank = new Mesh(geometry4, material4);
        roadBlank.translateY(.01);
        roadBlank.translateZ(0);
        roadBlank.translateX(20);
        roadBlank.rotateX(THREE.Math.degToRad(90));
        roadBlank.rotateZ(THREE.Math.degToRad(90));
        this.floorGroup.add(roadBlank);

        //asphalt port yard
        const asphalt = new TextureLoader().load("Images/asphalt.jpg");
        asphalt.wrapS = RepeatWrapping;
        asphalt.wrapT = RepeatWrapping;
        asphalt.repeat.x = 150;
        asphalt.repeat.y = 200;
        let geometry5 = new PlaneGeometry(150, 200);
        let material5 = new MeshPhongMaterial({map: asphalt, side: DoubleSide});
        let yard = new Mesh(geometry5, material5);
        yard.translateY(.01);
        yard.translateX(-75);
        yard.rotateX(THREE.Math.degToRad(90));
        this.floorGroup.add(yard);

        //portyard drive
        const asphalt1 = new TextureLoader().load("Images/asphalt.jpg");
        asphalt1.wrapS = RepeatWrapping;
        asphalt1.wrapT = RepeatWrapping;
        asphalt1.repeat.x = 10;
        asphalt1.repeat.y = 20;
        let geometry6 = new PlaneGeometry(10, 20);
        let material6 = new MeshPhongMaterial({map: asphalt1, side: DoubleSide});
        let yardDrive = new Mesh(geometry6, material6);
        yardDrive.translateY(.01);
        yardDrive.translateX(5);
        yardDrive.rotateX(THREE.Math.degToRad(90));
        this.floorGroup.add(yardDrive);

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
        this.loader.load("/app/js/models/json-objects/tree-1-fixed-3.json", (obj) => {
            for (var i = 0; i < 60; i++) {
                var size = getRandomArbitrary(.3, .6);
                var temp = obj.clone();
                temp.scale.set(size, size, size);
                var x = getRandomInt(40, 150);
                var z = getRandomInt(-125, 125);
                var degs = getRandomInt(0, 180);
                obj.rotateY(THREE.Math.degToRad(degs));

                //ignore tree if it obstructs road
                if(z > 20 || z < -25) {
                    temp.position.set(x, 0, z);
                    this.floorGroup.add(temp);
                }
            }
        });


        //trucks
        this.loader.load("/app/js/models/truck/delivery-truck.json", (obj) => {
            var x = -13;
            var y = 0;
            var z = 0;
            obj.scale.set(.03, .03, .03);

            obj.rotateY(THREE.Math.degToRad(-90));
            for (var i = 0; i < 8; i++) {
                var temp = obj.clone();
                z = 15 + ((i + 1) * 10);
                temp.position.set(x, y, z);
                this.floorGroup.add(temp);
            }

        });

        this.placeContainers();


        return this.floorGroup;   // the constructor must return the entire group
    }



    placeContainers(){

        //cargo containers1
        this.loader.load("/app/js/models/json-objects/cargo.json",
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
        this.loader.load("/app/js/models/json-objects/cargo1.json",
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
        this.loader.load("/app/js/models/json-objects/cargo.json",
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
        this.loader.load("/app/js/models/json-objects/cargo1.json",
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
        this.loader.load("/app/js/models/json-objects/cargo.json",
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
        this.loader.load("/app/js/models/json-objects/cargo1.json",
            (obj) => {
                var x = -80;
                var y = 0;
                var z = -72;
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
        //cargo containers7
        this.loader.load("/app/js/models/json-objects/cargo.json",
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
                        temp.position.set(x + 20, y, z);
                        this.floorGroup.add(temp);
                    }
                }
            });

        //cargo containers8
        this.loader.load("/app/js/models/json-objects/cargo1.json",
            (obj) => {
                var x = -120;
                var y = 0;
                var z = -72;
                obj.scale.set(.85, .77, .77);

                for (var i = 0; i < 3; i++) {
                    var temp = obj.clone();
                    y = i * 8;
                    if(i % 1 !== 0) {
                        temp.position.set(x, y, z);
                        this.floorGroup.add(temp);
                    }else {
                        temp.position.set(x + 20, y, z);
                        this.floorGroup.add(temp);
                    }
                }
            });
        //cargo containers9
        this.loader.load("/app/js/models/json-objects/cargo.json",
            (obj) => {
                var x = -80;
                var y = 0;
                var z = -64;
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

        //cargo containers10
        this.loader.load("/app/js/models/json-objects/cargo1.json",
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
        this.loader.load("/app/js/models/json-objects/cargo.json",
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
                        temp.position.set(x + 20, y, z);
                        this.floorGroup.add(temp);
                    }
                }
            });

        //cargo containers12
        this.loader.load("/app/js/models/json-objects/cargo1.json",
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
        this.loader.load("/app/js/models/json-objects/cargo.json",
            (obj) => {
                var x = -80;
                var y = 0;
                var z = -56;
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

        //cargo containers14
        this.loader.load("/app/js/models/json-objects/cargo1.json",
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
        this.loader.load("/app/js/models/json-objects/cargo.json",
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
        this.loader.load("/app/js/models/json-objects/cargo1.json",
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
        this.loader.load("/app/js/models/json-objects/cargo.json",
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
        this.loader.load("/app/js/models/json-objects/cargo1.json",
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
        this.loader.load("/app/js/models/json-objects/cargo.json",
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
        this.loader.load("/app/js/models/json-objects/cargo1.json",
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