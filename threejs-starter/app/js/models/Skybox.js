import {CubeGeometry, MeshFaceMaterial, MeshBasicMaterial, Mesh, Group, DoubleSide, TextureLoader} from 'three';
//import Water from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/Images/tex_Water.jpg";

export default class Skybox {
    constructor () {
        let skyGroup = new Group();
        const front = new TextureLoader().load("Images/sea_ft.JPG");
        const back = new TextureLoader().load("Images/sea_bk.JPG");
        const up = new TextureLoader().load("Images/sea_up.JPG");
        const down = new TextureLoader().load("Images/sea_dn.JPG");
        const right = new TextureLoader().load("Images/sea_lf.JPG");
        const left = new TextureLoader().load("Images/sea_rt.JPG");



        let geometry = new CubeGeometry( 900, 900, 900);
        let material =
            [
                new MeshBasicMaterial({map: front, side: DoubleSide}),
                new MeshBasicMaterial({map: back, side: DoubleSide}),
                new MeshBasicMaterial({map: up, side: DoubleSide}),
                new MeshBasicMaterial({map: down, side: DoubleSide}),
                new MeshBasicMaterial({map: left, side: DoubleSide}),
                new MeshBasicMaterial({map: right, side: DoubleSide}),

            ];

        let box = new Mesh( geometry, material );
        skyGroup.add(box);


        return skyGroup;
    }
}