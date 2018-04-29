import {CubeGeometry, MeshFaceMaterial, MeshPhongMaterial, Mesh, Group, DoubleSide, TextureLoader} from 'three';

import imgFront from "/home/sam/Documents/school/cis367/Virtual_Sea_Port/threejs-starter/Images/sea_ft.jpg";
import imgBack from "/home/sam/Documents/school/cis367/Virtual_Sea_Port/threejs-starter/Images/sea_bk.jpg";
import imgUp from "/home/sam/Documents/school/cis367/Virtual_Sea_Port/threejs-starter/Images/sea_up.jpg";
import imgDown from "/home/sam/Documents/school/cis367/Virtual_Sea_Port/threejs-starter/Images/sea_dn.jpg";
import imgLeft from "/home/sam/Documents/school/cis367/Virtual_Sea_Port/threejs-starter/Images/sea_lf.jpg";
import imgRight from "/home/sam/Documents/school/cis367/Virtual_Sea_Port/threejs-starter/Images/sea_rt.jpg";



export default class Skybox {
    constructor () {
        let skyGroup = new Group();

        // const front = new TextureLoader().load("Images/sea_ft.jpg");
        // const back = new TextureLoader().load("Images/sea_bk.jpg");
        // const up = new TextureLoader().load("Images/sea_up.jpg");
        // const down = new TextureLoader().load("Images/sea_dn.jpg");
        // const right = new TextureLoader().load("Images/sea_rt.jpg");
        // const left = new TextureLoader().load("Images/sea_lf.jpg");

        const front = new TextureLoader().load(imgFront);
        const back = new TextureLoader().load(imgBack);
        const up = new TextureLoader().load(imgUp);
        const down = new TextureLoader().load(imgDown);
        const left = new TextureLoader().load(imgLeft);
        const right = new TextureLoader().load(imgRight);



        let geometry = new CubeGeometry( 900, 900, 900);
        let material =
            [
                new MeshPhongMaterial({map: front, side: DoubleSide}),
                new MeshPhongMaterial({map: back, side: DoubleSide}),
                new MeshPhongMaterial({map: up, side: DoubleSide}),
                new MeshPhongMaterial({map: down, side: DoubleSide}),
                new MeshPhongMaterial({map: right, side: DoubleSide}),
                new MeshPhongMaterial({map: left, side: DoubleSide}),
            ];

        let box = new Mesh( geometry, material );
        skyGroup.add(box);

        return skyGroup;
    }
}