import {SphereGeometry, MeshBasicMaterial, Mesh, Group, SpotLight, Color} from 'three';
//import Water from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/Images/tex_Water.jpg";

export default class Sun extends Group{
    constructor () {
        super();

        this.lightColor = "rgb(255,255,255)"

        var geometry = new SphereGeometry( 25, 32, 32 );
        var material = new MeshBasicMaterial( {color: this.lightColor} );
        this.sphere = new Mesh( geometry, material );
        this.add( this.sphere );

        this.spotLight = new SpotLight(this.lightColor, 1.0);
        //spotLight.castShadow = true;
        this.spotLight.shadow.mapSize.width = 2000;
        this.spotLight.shadow.mapSize.height = 2000;
        this.spotLight.shadow.camera.near = 500;
        this.spotLight.shadow.camera.far = 4000;
        this.spotLight.shadow.camera.fov = 30;
        this.add(this.spotLight);
    }

    editColor(yVal){

        //let newSub = 200 - ((yVal/200) * 200);
        let percent = (200 - yVal)/200;
        let newG = 255 - (percent * 128);
        let newB = 255 - (percent * 255);

        newG = Math.round(newG);
        newB = Math.round(newB);

        this.lightColor = "rgb(255," + newG + "," + newB + ")";
        this.sphere.material.color = new Color(this.lightColor);
        this.spotLight.color = new Color(this.lightColor);
    }

    dimLight(val){
        this.spotLight.intensity = val;
    }
}