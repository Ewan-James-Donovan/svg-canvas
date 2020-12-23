import Attribute from "../../../../../dom/Attribute";
import Tag from "../../../../../dom/Tag";
import Path from "../../Path";
import PolygonSuperInterface from "./subclasses/PolygonSuperInterface";

export default class Polygon extends Path<PolygonSuperInterface> implements PolygonSuperInterface {

    private numberOfSides: number;
    private radiusValue: number;
    private xValue: number;
    private yValue: number;
    private nestedPointArray: Array<Array<number>>;
    private radiansToRotate: number;

    // @Override
    public prepareForBuild(): void {
        this.calculatePoints();
        let pathString: string;
        if (this.nestedPointArray.length) {
            pathString = "M ";
            let firstElement: boolean = true;
            for (const pointArray of this.nestedPointArray) {
                if (firstElement) {
                    pathString += + pointArray[0].toString() + " " + pointArray[1].toString();
                    firstElement = false;
                }
                pathString += " L " + pointArray[0].toString() + " " + pointArray[1].toString();
            }
        }
        this.addTag(
            new Tag("path")
                .addAttribute(new Attribute("d", pathString))
                .addAttribute(new Attribute("stroke", this.strokeColor))
                .addAttribute(new Attribute("stroke-width", this.strokeWidthValue))
                .addAttribute(new Attribute("stroke-linecap", this.lineCapType))
                .addAttribute(new Attribute("stroke-dasharray", this.dashArray))
                .addAttribute(new Attribute("stroke-opacity", this.strokeOpacityValue))
                .addAttribute(new Attribute("fill", this.fillValue))
                .addAttribute(new Attribute("fill-opacity", this.fillOpacityValue))
        );
    }

    private calculatePoints(): void {
        this.nestedPointArray = new Array<Array<number>>();
        for (let i: number = 0; i <= this.numberOfSides; i++) {
            this.nestedPointArray.push([
                this.radiusValue * Math.cos((i * 2 * Math.PI) / this.numberOfSides + this.radiansToRotate) + this.xValue,
                this.radiusValue * Math.sin((i * 2 * Math.PI) / this.numberOfSides + this.radiansToRotate) + this.yValue
            ]);
        }
    }

    // @Override
    public rotate(radiansToRotate: number): PolygonSuperInterface {
        this.radiansToRotate = radiansToRotate;
        return this;
    }

    // @Override
    public sides(numberOfSides: number): PolygonSuperInterface {
        this.numberOfSides = Math.round(numberOfSides);
        return this;
    }

    // @Override
    public radius(radiusValue: number): PolygonSuperInterface {
        this.radiusValue = radiusValue;
        return this;
    }

    // @Override
    public x(x: number): PolygonSuperInterface {
        this.xValue = x;
        return this;
    }

    // @Override
    public y(y: number): PolygonSuperInterface {
        this.yValue = y;
        return this;
    }

    // @Override
    public position(x: number, y: number): PolygonSuperInterface {
        this.x(x);
        this.y(y);
        return this;
    }

}

