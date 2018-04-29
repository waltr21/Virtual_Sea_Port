import * as THREE from 'three';
import {DoubleSide} from "three";
import {RepeatWrapping} from "three";
import {TextureLoader} from "three";
import {MeshBasicMaterial} from "three";
import hullTexImage from "/home/sam/Documents/school/cis367/Virtual_Sea_Port/threejs-starter/Images/hullMetal.jpg";
import metalTexImage from "/home/sam/Documents/school/cis367/Virtual_Sea_Port/threejs-starter/Images/rustyMetal.jpg";
import windowImage from "/home/sam/Documents/school/cis367/Virtual_Sea_Port/threejs-starter/Images/windows.png";
import cargoModel from "/home/sam/Documents/school/cis367/Virtual_Sea_Port/threejs-starter/app/js/models/json-objects/cargo.json";
import cargo1Model from "/home/sam/Documents/school/cis367/Virtual_Sea_Port/threejs-starter/app/js/models/json-objects/cargo1.json";


export default class CargoShip {
    constructor () {

        this.shipGroup = new THREE.Group();

        //Boat hull
        const hullTex = new TextureLoader().load(hullTexImage);
        hullTex.wrapS = RepeatWrapping;
        hullTex.wrapT = RepeatWrapping;
        hullTex.repeat.x = 2;
        hullTex.repeat.y = 10;
        var geometry = new THREE.CylinderGeometry(20, 20, 150, 30, 1, false, 0, Math.PI);
        var material = new THREE.MeshPhongMaterial({map: hullTex});
        var hull = new THREE.Mesh(geometry, material);
        hull.translateY(10);
        hull.rotateX(THREE.Math.degToRad(90));
        hull.rotateY(THREE.Math.degToRad(-90));
        this.shipGroup.add(hull);

        //ship floor
        const metalTex = new TextureLoader().load(metalTexImage);
        metalTex.wrapS = RepeatWrapping;
        metalTex.wrapT = RepeatWrapping;
        metalTex.repeat.x = 10;
        metalTex.repeat.y = 50;
        var geometry1 = new THREE.PlaneGeometry(40, 150);
        var material1 = new THREE.MeshPhongMaterial({map: metalTex, side: DoubleSide});
        var floor = new THREE.Mesh(geometry1, material1);
        floor.translateY(10);
        floor.rotateX(THREE.Math.degToRad(90));
        this.shipGroup.add(floor);

        //bow
        const hullTex1 = new TextureLoader().load(hullTexImage);
        hullTex1.wrapS = RepeatWrapping;
        hullTex1.wrapT = RepeatWrapping;
        hullTex1.repeat.x = 2;
        hullTex1.repeat.y = 2;
        var geometry2 = new THREE.SphereGeometry(20, 30, 30, 0, Math.PI, 0, Math.PI / 2);
        var material2 = new THREE.MeshPhongMaterial({map: hullTex1});
        var bow = new THREE.Mesh(geometry2, material2);
        bow.translateY(10);
        bow.translateZ(75);
        bow.rotateX(THREE.Math.degToRad(90));
        this.shipGroup.add(bow);

        //bow floor
        const metalTex1 = new TextureLoader().load(metalTexImage);
        metalTex1.wrapS = RepeatWrapping;
        metalTex1.wrapT = RepeatWrapping;
        metalTex1.repeat.x = 10;
        metalTex1.repeat.y = 10;
        var geometry3 = new THREE.CircleGeometry(20, 60, 0, Math.PI);
        var material3 = new THREE.MeshPhongMaterial({map: metalTex1, side: DoubleSide});
        var bowFloor = new THREE.Mesh(geometry3, material3);
        bowFloor.translateY(10);
        bowFloor.translateZ(75);
        bowFloor.rotateX(THREE.Math.degToRad(90));
        this.shipGroup.add(bowFloor);

        //command tower
        // const metalTex2 = new TextureLoader().load("Images/whiteMetal.jpg");
        // metalTex2.wrapS = RepeatWrapping;
        // metalTex2.wrapT = RepeatWrapping;
        // metalTex2.repeat.x = 1;
        // metalTex2.repeat.y = 2;
        var geometry4 = new THREE.BoxGeometry( 10, 20, 5 );
        var material4 = new THREE.MeshPhongMaterial( {color: 0x898989} );
        var tower = new THREE.Mesh( geometry4, material4);
        tower.translateY(20);
        tower.translateZ(-60);
        this.shipGroup.add(tower);

        //command tower1
        const windowsTex = new TextureLoader().load(windowImage);
        windowsTex.wrapS = RepeatWrapping;
        windowsTex.wrapT = RepeatWrapping;
        windowsTex.repeat.x = 1;
        windowsTex.repeat.y = 1;
        var geometry5 = new THREE.BoxGeometry( 30, 5, 10);
        var material5 = [
            new THREE.MeshPhongMaterial({color: 0x898989, side: DoubleSide}),
            new THREE.MeshPhongMaterial({color: 0x898989, side: DoubleSide}),
            new THREE.MeshPhongMaterial({color: 0x898989, side: DoubleSide}),
            new THREE.MeshPhongMaterial({color: 0x898989, side: DoubleSide}),
            new THREE.MeshPhongMaterial({map: windowsTex, side: DoubleSide}),
            new THREE.MeshPhongMaterial({color: 0x898989, side: DoubleSide}),
        ];
        var tower1 = new THREE.Mesh( geometry5, material5);
        tower1.translateY(25);
        tower1.translateZ(-60);
        this.shipGroup.add(tower1);

        this.loader = new THREE.ObjectLoader();
        this.placeContainers();



        return this.shipGroup;   // the constructor must return the entire group
    }

    placeContainers(){
        //cargo containers1
        this.loader.load(cargoModel,
            (obj) => {
                var x = 0;
                var y = 10;
                var z = 0;
                obj.scale.set(.85, .77, .77);
                obj.rotateY(THREE.Math.degToRad(90));

                for (var i = 0; i < 2; i++) {
                    var temp = obj.clone();
                    y = y + (i * 8);
                    if(i % 3 === 0) {
                        temp.position.set(x, y, z);
                        this.shipGroup.add(temp);
                    } else {
                        temp.position.set(x + 8, y, z);
                        this.shipGroup.add(temp);
                    }
                }
            });

        //cargo containers2
        this.loader.load(cargo1Model,
            (obj) => {
                var x = 0;
                var y = 10;
                var z = 0;
                obj.scale.set(.85, .77, .77);
                obj.rotateY(THREE.Math.degToRad(90));


                for (var i = 0; i < 2; i++) {
                    var temp = obj.clone();
                    y = y + (i * 8);
                    if(i % 3 !== 0) {
                        temp.position.set(x, y, z);
                        this.shipGroup.add(temp);
                    }else {
                        temp.position.set(x + 8, y, z);
                        this.shipGroup.add(temp);
                    }
                }
            });
        //cargo containers3
        this.loader.load(cargoModel,
            (obj) => {
                var x = 0;
                var y = 10;
                var z = 20;
                obj.scale.set(.85, .77, .77);
                obj.rotateY(THREE.Math.degToRad(90));

                for (var i = 0; i < 2; i++) {
                    var temp = obj.clone();
                    y = y + (i * 8);
                    if(i % 1 === 0) {
                        temp.position.set(x, y, z);
                        this.shipGroup.add(temp);
                    } else {
                        temp.position.set(x + 8, y, z);
                        this.shipGroup.add(temp);
                    }
                }
            });

        //cargo containers4
        this.loader.load(cargo1Model,
            (obj) => {
                var x = 0;
                var y = 10;
                var z = 20;
                obj.scale.set(.85, .77, .77);
                obj.rotateY(THREE.Math.degToRad(90));

                for (var i = 0; i < 2; i++) {
                    var temp = obj.clone();
                    y = y + (i * 8);
                    if(i % 1 !== 0) {
                        temp.position.set(x, y, z);
                        this.shipGroup.add(temp);
                    }else {
                        temp.position.set(x + 8, y, z);
                        this.shipGroup.add(temp);
                    }
                }
            });
    }
}