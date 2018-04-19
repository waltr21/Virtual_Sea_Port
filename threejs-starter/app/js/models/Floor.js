import {PlaneGeometry, MeshPhongMaterial, Mesh, Group, DoubleSide, TextureLoader} from 'three';
import Water from "/Users/ryanwalt/Downloads/CODE/WebstormProjects/Virtual_Sea_Port/threejs-starter/Images/tex_Water.jpg";

export default class Floor {
  constructor () {
    let floor = new Group();
    const texture = new TextureLoader().load(Water);

    let geometry = new PlaneGeometry( 100, 100);
    let material = new MeshPhongMaterial( {map : texture, side : DoubleSide} );
    let plane = new Mesh( geometry, material );
    plane.rotateX(3.1415/2);
    floor.add( plane );


    return floor;   // the constructor must return the entire group
  }
}
