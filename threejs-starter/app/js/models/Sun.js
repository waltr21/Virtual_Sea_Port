import {SphereGeometry, MeshBasicMaterial, Mesh, Group, SpotLight} from 'three';
//import Water from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/Images/tex_Water.jpg";

export default class Sun {
    constructor () {
        let g = new Group();

        var geometry = new SphereGeometry( 5, 32, 32 );
        var material = new MeshBasicMaterial( {color: 0xffffff} );
        var sphere = new Mesh( geometry, material );
        g.add( sphere );

        var spotLight = new SpotLight(0xffffff, 1.0);
        //spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 2000;
        spotLight.shadow.mapSize.height = 2000;
        spotLight.shadow.camera.near = 500;
        spotLight.shadow.camera.far = 4000;
        spotLight.shadow.camera.fov = 30;

        g.add(spotLight);

        return g;   // the constructor must return the entire group
    }
}