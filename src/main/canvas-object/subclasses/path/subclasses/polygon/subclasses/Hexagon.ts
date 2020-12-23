import Polygon from "../Polygon";
import PolygonInterface from "../PolygonInterface";

export default class Hexagon extends Polygon implements PolygonInterface {

    constructor() {
        super();
        this.sides(6);
    }

}
    
