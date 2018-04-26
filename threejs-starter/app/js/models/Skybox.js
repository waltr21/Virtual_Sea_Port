import {CubeGeometry, MeshFaceMaterial, MeshPhongMaterial, Mesh, Group, DoubleSide, TextureLoader} from 'three';
import imgFront from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/Images/sea_ft.jpg";
import imgBack from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/Images/sea_bk.jpg";
import imgUp from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/Images/sea_up.jpg";
import imgDown from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/Images/sea_dn.jpg";
import imgLeft from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/Images/sea_lf.jpg";
import imgRight from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/Images/sea_rt.jpg";



export default class Skybox {
    constructor () {
        let skyGroup = new Group();

        // const front = new TextureLoader().load("Images/sea_ft.JPG");
        // const back = new TextureLoader().load("Images/sea_bk.JPG");
        // const up = new TextureLoader().load("Images/sea_up.JPG");
        // const down = new TextureLoader().load("Images/sea_dn.JPG");
        // const right = new TextureLoader().load("Images/sea_rt.jpg");
        // const left = new TextureLoader().load("Images/sea_lf.JPG");

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