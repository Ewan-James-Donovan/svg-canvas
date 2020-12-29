(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var SVGBuilder_1 = require("./dom/SVGBuilder");
var Circle_1 = require("./canvas-object/subclasses/Circle");
var Rectangle_1 = require("./canvas-object/subclasses/Rectangle");
var Line_1 = require("./canvas-object/subclasses/Line");
var Path_1 = require("./canvas-object/subclasses/path/Path");
var Polygon_1 = require("./canvas-object/subclasses/path/subclasses/polygon/Polygon");
var Triangle_1 = require("./canvas-object/subclasses/path/subclasses/polygon/subclasses/Triangle");
var Square_1 = require("./canvas-object/subclasses/path/subclasses/polygon/subclasses/Square");
var Pentagon_1 = require("./canvas-object/subclasses/path/subclasses/polygon/subclasses/Pentagon");
var Hexagon_1 = require("./canvas-object/subclasses/path/subclasses/polygon/subclasses/Hexagon");
var Octagon_1 = require("./canvas-object/subclasses/path/subclasses/polygon/subclasses/Octagon");
var Arc_1 = require("./canvas-object/subclasses/path/subclasses/arc/Arc");
var Text_1 = require("./canvas-object/subclasses/Text");
var SVGCanvas = /** @class */ (function () {
    function SVGCanvas(containerElementId) {
        this.registry = new Array();
        this.lastRendered = Date.now();
        this.frameRate = 0;
        this.currentFrame = 0;
        this.containerElementId = containerElementId;
    }
    SVGCanvas.prototype.register = function (canvasObject) {
        this.registry.push(canvasObject);
        return canvasObject;
    };
    SVGCanvas.prototype.render = function (testMode) {
        if (testMode === void 0) { testMode = false; }
        var html = SVGBuilder_1["default"].buildFromRegistry(this.registry, this.backgroundColor ? this.backgroundColor : "rgba(0,0,0,0)");
        if (!testMode) {
            try {
                document.getElementById(this.containerElementId).innerHTML = html;
            }
            catch (_a) {
                console.warn("Element not found.");
            }
        }
        this.registry = new Array();
        return html;
    };
    SVGCanvas.prototype.timeElapsed = function () {
        return new Number(this.timeElapsedValue).valueOf();
    };
    SVGCanvas.prototype.timeElapsedIsBetween = function (startMs, endMs) {
        if (this.timeElapsedValue >= startMs && this.timeElapsedValue < endMs) {
            return true;
        }
        return false;
    };
    SVGCanvas.prototype.animate = function (state, func, desiredFrameRate, staticThrottling, firstCalled) {
        var _this = this;
        if (desiredFrameRate === void 0) { desiredFrameRate = Infinity; }
        if (staticThrottling === void 0) { staticThrottling = false; }
        if (firstCalled === void 0) { firstCalled = true; }
        this.currentFrame++;
        func(state);
        this.render();
        if (firstCalled) {
            this.desiredFrameRate = desiredFrameRate;
            this.startTime = Date.now();
        }
        if (staticThrottling || desiredFrameRate === Infinity) {
            setTimeout(function () { return _this.animate(state, func, desiredFrameRate, staticThrottling, false); }, 1000 / desiredFrameRate);
        }
        else {
            if (this.frameRate < this.desiredFrameRate) {
                setTimeout(function () { return _this.animate(state, func, desiredFrameRate + 1, staticThrottling, false); }, 1000 / (desiredFrameRate + this.desiredFrameRate / Math.pow(this.desiredFrameRate, 2)));
            }
            else if (this.frameRate > this.desiredFrameRate) {
                setTimeout(function () { return _this.animate(state, func, desiredFrameRate - 1, staticThrottling, false); }, 1000 / (desiredFrameRate - this.desiredFrameRate / Math.pow(this.desiredFrameRate, 2)));
            }
            else {
                setTimeout(function () { return _this.animate(state, func, desiredFrameRate, staticThrottling, false); }, 1000 / desiredFrameRate);
            }
        }
        var delta = (Date.now() - this.lastRendered) / 1000;
        this.lastRendered = Date.now();
        this.timeElapsedValue = this.lastRendered - this.startTime;
        this.frameRate = 1 / delta;
    };
    SVGCanvas.prototype.background = function (backgroundColor) {
        this.backgroundColor = backgroundColor;
        return this;
    };
    // @Override
    SVGCanvas.prototype.circle = function () {
        return this.register(new Circle_1["default"]());
    };
    // @Override
    SVGCanvas.prototype.rectangle = function () {
        return this.register(new Rectangle_1["default"]());
    };
    // @Override
    SVGCanvas.prototype.line = function () {
        return this.register(new Line_1["default"]());
    };
    // @Override
    SVGCanvas.prototype.path = function () {
        return this.register(new Path_1["default"]());
    };
    // @Override
    SVGCanvas.prototype.polygon = function () {
        return this.register(new Polygon_1["default"]());
    };
    // @Override
    SVGCanvas.prototype.triangle = function () {
        return this.register(new Triangle_1["default"]());
    };
    // @Override
    SVGCanvas.prototype.square = function () {
        return this.register(new Square_1["default"]());
    };
    // @Override
    SVGCanvas.prototype.pentagon = function () {
        return this.register(new Pentagon_1["default"]());
    };
    // @Override
    SVGCanvas.prototype.hexagon = function () {
        return this.register(new Hexagon_1["default"]());
    };
    // @Override
    SVGCanvas.prototype.octagon = function () {
        return this.register(new Octagon_1["default"]());
    };
    // @Override
    SVGCanvas.prototype.arc = function () {
        return this.register(new Arc_1["default"]());
    };
    // @Override
    SVGCanvas.prototype.text = function () {
        return this.register(new Text_1["default"]());
    };
    return SVGCanvas;
}());
exports["default"] = SVGCanvas;

},{"./canvas-object/subclasses/Circle":3,"./canvas-object/subclasses/Line":4,"./canvas-object/subclasses/Rectangle":5,"./canvas-object/subclasses/Text":6,"./canvas-object/subclasses/path/Path":7,"./canvas-object/subclasses/path/subclasses/arc/Arc":8,"./canvas-object/subclasses/path/subclasses/polygon/Polygon":9,"./canvas-object/subclasses/path/subclasses/polygon/subclasses/Hexagon":10,"./canvas-object/subclasses/path/subclasses/polygon/subclasses/Octagon":11,"./canvas-object/subclasses/path/subclasses/polygon/subclasses/Pentagon":12,"./canvas-object/subclasses/path/subclasses/polygon/subclasses/Square":13,"./canvas-object/subclasses/path/subclasses/polygon/subclasses/Triangle":14,"./dom/SVGBuilder":16}],2:[function(require,module,exports){
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var CanvasObject = /** @class */ (function () {
    function CanvasObject() {
        this.tags = new Array();
    }
    CanvasObject.prototype.addTag = function (tag) {
        this.tags.push(tag);
    };
    CanvasObject.prototype.getTags = function () {
        return __spreadArrays(this.tags);
    };
    return CanvasObject;
}());
exports["default"] = CanvasObject;

},{}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Tag_1 = require("../../dom/Tag");
var Attribute_1 = require("../../dom/Attribute");
var CanvasObject_1 = require("../CanvasObject");
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // @Override
    Circle.prototype.prepareForBuild = function () {
        this.addTag(new Tag_1["default"]("circle")
            .addAttribute(new Attribute_1["default"]("r", this.radiusValue))
            .addAttribute(new Attribute_1["default"]("cx", this.xValue))
            .addAttribute(new Attribute_1["default"]("cy", this.yValue))
            .addAttribute(new Attribute_1["default"]("fill", this.fillValue))
            .addAttribute(new Attribute_1["default"]("fill-opacity", this.fillOpacityValue))
            .addAttribute(new Attribute_1["default"]("stroke", this.strokeColor))
            .addAttribute(new Attribute_1["default"]("stroke-width", this.strokeWidthValue))
            .addAttribute(new Attribute_1["default"]("stroke-linecap", this.lineCapType))
            .addAttribute(new Attribute_1["default"]("stroke-dasharray", this.dashArray))
            .addAttribute(new Attribute_1["default"]("stroke-opacity", this.strokeOpacityValue)));
    };
    // @Override
    Circle.prototype.radius = function (radiusValue) {
        this.radiusValue = "" + radiusValue;
        return this;
    };
    // @Override
    Circle.prototype.x = function (x) {
        this.xValue = "" + x;
        return this;
    };
    // @Override
    Circle.prototype.y = function (y) {
        this.yValue = "" + y;
        return this;
    };
    // @Override
    Circle.prototype.position = function (x, y) {
        this.x(x);
        this.y(y);
        return this;
    };
    // @Override
    Circle.prototype.fill = function (fillValue) {
        this.fillValue = fillValue;
        return this;
    };
    // @Override
    Circle.prototype.fillOpacity = function (fillOpacityValue) {
        this.fillOpacityValue = fillOpacityValue;
        return this;
    };
    ;
    // @Override
    Circle.prototype.stroke = function (strokeColor) {
        this.strokeColor = strokeColor;
        return this;
    };
    // @Override
    Circle.prototype.strokeWidth = function (strokeWidthValue) {
        this.strokeWidthValue = "" + strokeWidthValue;
        return this;
    };
    ;
    // @Override
    Circle.prototype.lineCap = function (lineCapType) {
        this.lineCapType = lineCapType;
        return this;
    };
    ;
    // @Override
    Circle.prototype.dash = function (dashArray) {
        this.dashArray = dashArray;
        return this;
    };
    ;
    // @Override
    Circle.prototype.strokeOpacity = function (strokeOpacityValue) {
        this.strokeOpacityValue = strokeOpacityValue;
        return this;
    };
    ;
    return Circle;
}(CanvasObject_1["default"]));
exports["default"] = Circle;

},{"../../dom/Attribute":15,"../../dom/Tag":17,"../CanvasObject":2}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Tag_1 = require("../../dom/Tag");
var Attribute_1 = require("../../dom/Attribute");
var CanvasObject_1 = require("../CanvasObject");
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // @Override
    Line.prototype.prepareForBuild = function () {
        this.addTag(new Tag_1["default"]("line")
            .addAttribute(new Attribute_1["default"]("x1", this.x1Value))
            .addAttribute(new Attribute_1["default"]("x2", this.x2Value))
            .addAttribute(new Attribute_1["default"]("y1", this.y1Value))
            .addAttribute(new Attribute_1["default"]("y2", this.y2Value))
            .addAttribute(new Attribute_1["default"]("stroke", this.strokeColor))
            .addAttribute(new Attribute_1["default"]("stroke-width", this.strokeWidthValue))
            .addAttribute(new Attribute_1["default"]("stroke-linecap", this.lineCapType))
            .addAttribute(new Attribute_1["default"]("stroke-dasharray", this.dashArray))
            .addAttribute(new Attribute_1["default"]("stroke-opacity", this.strokeOpacityValue)));
    };
    Line.prototype.x1 = function (x1Value) {
        this.x1Value = "" + x1Value;
        return this;
    };
    Line.prototype.x2 = function (x2Value) {
        this.x2Value = "" + x2Value;
        return this;
    };
    Line.prototype.y1 = function (y1Value) {
        this.y1Value = "" + y1Value;
        return this;
    };
    Line.prototype.y2 = function (y2Value) {
        this.y2Value = "" + y2Value;
        return this;
    };
    Line.prototype.point1 = function (x1Value, y1Value) {
        this.x1(x1Value);
        this.y1(y1Value);
        return this;
    };
    Line.prototype.point2 = function (x2Value, y2Value) {
        this.x2(x2Value);
        this.y2(y2Value);
        return this;
    };
    Line.prototype.points = function (x1Value, y1Value, x2Value, y2Value) {
        this.point1(x1Value, y1Value);
        this.point2(x2Value, y2Value);
        return this;
    };
    // @Override
    Line.prototype.stroke = function (strokeColor) {
        this.strokeColor = strokeColor;
        return this;
    };
    // @Override
    Line.prototype.strokeWidth = function (strokeWidthValue) {
        this.strokeWidthValue = "" + strokeWidthValue;
        return this;
    };
    ;
    // @Override
    Line.prototype.lineCap = function (lineCapType) {
        this.lineCapType = lineCapType;
        return this;
    };
    ;
    // @Override
    Line.prototype.dash = function (dashArray) {
        this.dashArray = dashArray;
        return this;
    };
    ;
    // @Override
    Line.prototype.strokeOpacity = function (strokeOpacityValue) {
        this.strokeOpacityValue = strokeOpacityValue;
        return this;
    };
    ;
    return Line;
}(CanvasObject_1["default"]));
exports["default"] = Line;

},{"../../dom/Attribute":15,"../../dom/Tag":17,"../CanvasObject":2}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Tag_1 = require("../../dom/Tag");
var Attribute_1 = require("../../dom/Attribute");
var CanvasObject_1 = require("../CanvasObject");
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // @Override
    Rectangle.prototype.prepareForBuild = function () {
        this.addTag(new Tag_1["default"]("rect")
            .addAttribute(new Attribute_1["default"]("width", this.widthValue))
            .addAttribute(new Attribute_1["default"]("height", this.heightValue))
            .addAttribute(new Attribute_1["default"]("x", this.xValue))
            .addAttribute(new Attribute_1["default"]("y", this.yValue))
            .addAttribute(new Attribute_1["default"]("fill", this.fillValue))
            .addAttribute(new Attribute_1["default"]("fill-opacity", this.fillOpacityValue))
            .addAttribute(new Attribute_1["default"]("stroke", this.strokeColor))
            .addAttribute(new Attribute_1["default"]("stroke-width", this.strokeWidthValue))
            .addAttribute(new Attribute_1["default"]("stroke-linecap", this.lineCapType))
            .addAttribute(new Attribute_1["default"]("stroke-dasharray", this.dashArray))
            .addAttribute(new Attribute_1["default"]("stroke-opacity", this.strokeOpacityValue))
            .addAttribute(new Attribute_1["default"]("rx", this.cornerRadius))
            .addAttribute(new Attribute_1["default"]("ry", this.cornerRadius)));
    };
    Rectangle.prototype.roundCorners = function (cornerRadius) {
        this.cornerRadius = "" + cornerRadius;
        return this;
    };
    Rectangle.prototype.width = function (widthValue) {
        this.widthValue = "" + widthValue;
        return this;
    };
    ;
    Rectangle.prototype.height = function (heightValue) {
        this.heightValue = "" + heightValue;
        return this;
    };
    ;
    Rectangle.prototype.dimensions = function (widthValue, heightValue) {
        this.width(widthValue);
        this.height(heightValue);
        return this;
    };
    ;
    // @Override
    Rectangle.prototype.x = function (x) {
        this.xValue = "" + x;
        return this;
    };
    // @Override
    Rectangle.prototype.y = function (y) {
        this.yValue = "" + y;
        return this;
    };
    // @Override
    Rectangle.prototype.position = function (x, y) {
        this.x(x);
        this.y(y);
        return this;
    };
    // @Override
    Rectangle.prototype.fill = function (fillValue) {
        this.fillValue = fillValue;
        return this;
    };
    // @Override
    Rectangle.prototype.fillOpacity = function (fillOpacityValue) {
        this.fillOpacityValue = fillOpacityValue;
        return this;
    };
    ;
    // @Override
    Rectangle.prototype.stroke = function (strokeColor) {
        this.strokeColor = strokeColor;
        return this;
    };
    // @Override
    Rectangle.prototype.strokeWidth = function (strokeWidthValue) {
        this.strokeWidthValue = "" + strokeWidthValue;
        return this;
    };
    ;
    // @Override
    Rectangle.prototype.lineCap = function (lineCapType) {
        this.lineCapType = lineCapType;
        return this;
    };
    ;
    // @Override
    Rectangle.prototype.dash = function (dashArray) {
        this.dashArray = dashArray;
        return this;
    };
    ;
    // @Override
    Rectangle.prototype.strokeOpacity = function (strokeOpacityValue) {
        this.strokeOpacityValue = strokeOpacityValue;
        return this;
    };
    ;
    return Rectangle;
}(CanvasObject_1["default"]));
exports["default"] = Rectangle;

},{"../../dom/Attribute":15,"../../dom/Tag":17,"../CanvasObject":2}],6:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Tag_1 = require("../../dom/Tag");
var Attribute_1 = require("../../dom/Attribute");
var CanvasObject_1 = require("../CanvasObject");
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Text.prototype.string = function (textValue) {
        this.textValue = textValue;
        return this;
    };
    Text.prototype.font = function (fontFamily) {
        this.fontFamily = fontFamily;
        return this;
    };
    Text.prototype.size = function (sizeValue) {
        this.sizeValue = sizeValue;
        return this;
    };
    // @Override
    Text.prototype.prepareForBuild = function () {
        this.addTag(new Tag_1["default"]("text")
            .addAttribute(new Attribute_1["default"]("x", this.xValue))
            .addAttribute(new Attribute_1["default"]("y", this.yValue))
            .addAttribute(new Attribute_1["default"]("fill", this.fillValue))
            .addAttribute(new Attribute_1["default"]("fill-opacity", this.fillOpacityValue))
            .addAttribute(new Attribute_1["default"]("stroke", this.strokeColor))
            .addAttribute(new Attribute_1["default"]("stroke-width", this.strokeWidthValue))
            .addAttribute(new Attribute_1["default"]("stroke-linecap", this.lineCapType))
            .addAttribute(new Attribute_1["default"]("stroke-dasharray", this.dashArray))
            .addAttribute(new Attribute_1["default"]("stroke-opacity", this.strokeOpacityValue))
            .addAttribute(new Attribute_1["default"]("font-family", this.fontFamily))
            .addAttribute(new Attribute_1["default"]("font-size", this.sizeValue))
            .setContent(this.textValue));
    };
    // @Override
    Text.prototype.x = function (x) {
        this.xValue = "" + x;
        return this;
    };
    // @Override
    Text.prototype.y = function (y) {
        this.yValue = "" + y;
        return this;
    };
    // @Override
    Text.prototype.position = function (x, y) {
        this.x(x);
        this.y(y);
        return this;
    };
    // @Override
    Text.prototype.fill = function (fillValue) {
        this.fillValue = fillValue;
        return this;
    };
    // @Override
    Text.prototype.fillOpacity = function (fillOpacityValue) {
        this.fillOpacityValue = fillOpacityValue;
        return this;
    };
    ;
    // @Override
    Text.prototype.stroke = function (strokeColor) {
        this.strokeColor = strokeColor;
        return this;
    };
    // @Override
    Text.prototype.strokeWidth = function (strokeWidthValue) {
        this.strokeWidthValue = "" + strokeWidthValue;
        return this;
    };
    ;
    // @Override
    Text.prototype.lineCap = function (lineCapType) {
        this.lineCapType = lineCapType;
        return this;
    };
    ;
    // @Override
    Text.prototype.dash = function (dashArray) {
        this.dashArray = dashArray;
        return this;
    };
    ;
    // @Override
    Text.prototype.strokeOpacity = function (strokeOpacityValue) {
        this.strokeOpacityValue = strokeOpacityValue;
        return this;
    };
    ;
    return Text;
}(CanvasObject_1["default"]));
exports["default"] = Text;

},{"../../dom/Attribute":15,"../../dom/Tag":17,"../CanvasObject":2}],7:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Tag_1 = require("../../../dom/Tag");
var Attribute_1 = require("../../../dom/Attribute");
var CanvasObject_1 = require("../../CanvasObject");
// Accessed publicly via the PathInterface
var Path = /** @class */ (function (_super) {
    __extends(Path, _super);
    function Path() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // @Override
    Path.prototype.prepareForBuild = function () {
        this.addTag(new Tag_1["default"]("path")
            .addAttribute(new Attribute_1["default"]("d", this.pathString === "M " ? null : this.pathString))
            .addAttribute(new Attribute_1["default"]("stroke", this.strokeColor))
            .addAttribute(new Attribute_1["default"]("stroke-width", this.strokeWidthValue))
            .addAttribute(new Attribute_1["default"]("stroke-linecap", this.lineCapType))
            .addAttribute(new Attribute_1["default"]("stroke-dasharray", this.dashArray))
            .addAttribute(new Attribute_1["default"]("stroke-opacity", this.strokeOpacityValue))
            .addAttribute(new Attribute_1["default"]("fill", this.fillValue))
            .addAttribute(new Attribute_1["default"]("fill-opacity", this.fillOpacityValue)));
    };
    Path.prototype.points = function (nestedPointArray) {
        this.pathString = "M ";
        var firstElement = true;
        for (var _i = 0, nestedPointArray_1 = nestedPointArray; _i < nestedPointArray_1.length; _i++) {
            var pointArray = nestedPointArray_1[_i];
            if (firstElement) {
                this.pathString += +pointArray[0].toString() + " " + pointArray[1].toString();
                firstElement = false;
            }
            this.pathString += " L " + pointArray[0].toString() + " " + pointArray[1].toString();
        }
        return this;
    };
    // @Override
    Path.prototype.fill = function (fillValue) {
        this.fillValue = fillValue;
        return this;
    };
    // @Override
    Path.prototype.fillOpacity = function (fillOpacityValue) {
        this.fillOpacityValue = fillOpacityValue;
        return this;
    };
    ;
    // @Override
    Path.prototype.stroke = function (strokeColor) {
        this.strokeColor = strokeColor;
        return this;
    };
    // @Override
    Path.prototype.strokeWidth = function (strokeWidthValue) {
        this.strokeWidthValue = "" + strokeWidthValue;
        return this;
    };
    ;
    // @Override
    Path.prototype.lineCap = function (lineCapType) {
        this.lineCapType = lineCapType;
        return this;
    };
    ;
    // @Override
    Path.prototype.dash = function (dashArray) {
        this.dashArray = dashArray;
        return this;
    };
    ;
    // @Override
    Path.prototype.strokeOpacity = function (strokeOpacityValue) {
        this.strokeOpacityValue = strokeOpacityValue;
        return this;
    };
    ;
    return Path;
}(CanvasObject_1["default"]));
exports["default"] = Path;

},{"../../../dom/Attribute":15,"../../../dom/Tag":17,"../../CanvasObject":2}],8:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Attribute_1 = require("../../../../../dom/Attribute");
var Tag_1 = require("../../../../../dom/Tag");
var Path_1 = require("../../Path");
var Arc = /** @class */ (function (_super) {
    __extends(Arc, _super);
    function Arc() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sampleCountValue = 50;
        return _this;
    }
    // @Override
    Arc.prototype.prepareForBuild = function () {
        this.calculatePoints();
        var pathString;
        if (this.nestedPointArray[0][0]) {
            pathString = "M ";
            var firstElement = true;
            for (var _i = 0, _a = this.nestedPointArray; _i < _a.length; _i++) {
                var pointArray = _a[_i];
                if (firstElement) {
                    pathString += +pointArray[0].toString() + " " + pointArray[1].toString();
                    firstElement = false;
                }
                pathString += " L " + pointArray[0].toString() + " " + pointArray[1].toString();
            }
        }
        this.addTag(new Tag_1["default"]("path")
            .addAttribute(new Attribute_1["default"]("d", pathString === "M " ? null : pathString))
            .addAttribute(new Attribute_1["default"]("stroke", this.strokeColor))
            .addAttribute(new Attribute_1["default"]("stroke-width", this.strokeWidthValue))
            .addAttribute(new Attribute_1["default"]("stroke-linecap", this.lineCapType))
            .addAttribute(new Attribute_1["default"]("stroke-dasharray", this.dashArray))
            .addAttribute(new Attribute_1["default"]("stroke-opacity", this.strokeOpacityValue))
            .addAttribute(new Attribute_1["default"]("fill", this.fillValue))
            .addAttribute(new Attribute_1["default"]("fill-opacity", this.fillOpacityValue)));
    };
    Arc.prototype.calculatePoints = function () {
        this.nestedPointArray = new Array();
        for (var i = 0; i <= this.sampleCountValue; i++) {
            this.nestedPointArray.push([
                this.radiusValue * Math.cos((i * (this.toAngle - this.fromAngle)) / this.sampleCountValue + this.fromAngle) + this.xValue,
                this.radiusValue * Math.sin((i * (this.toAngle - this.fromAngle)) / this.sampleCountValue + this.fromAngle) + this.yValue
            ]);
        }
    };
    Arc.prototype.samples = function (samples) {
        this.sampleCountValue = Math.round(samples);
        return this;
    };
    Arc.prototype.from = function (angle) {
        this.fromAngle = angle;
        return this;
    };
    Arc.prototype.to = function (angle) {
        this.toAngle = angle;
        return this;
    };
    // @Override
    Arc.prototype.radius = function (radiusValue) {
        this.radiusValue = radiusValue;
        return this;
    };
    // @Override
    Arc.prototype.x = function (x) {
        this.xValue = x;
        return this;
    };
    // @Override
    Arc.prototype.y = function (y) {
        this.yValue = y;
        return this;
    };
    // @Override
    Arc.prototype.position = function (x, y) {
        this.x(x);
        this.y(y);
        return this;
    };
    return Arc;
}(Path_1["default"]));
exports["default"] = Arc;

},{"../../../../../dom/Attribute":15,"../../../../../dom/Tag":17,"../../Path":7}],9:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Attribute_1 = require("../../../../../dom/Attribute");
var Tag_1 = require("../../../../../dom/Tag");
var Path_1 = require("../../Path");
var Polygon = /** @class */ (function (_super) {
    __extends(Polygon, _super);
    function Polygon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // @Override
    Polygon.prototype.prepareForBuild = function () {
        this.calculatePoints();
        var pathString;
        if (this.nestedPointArray.length) {
            pathString = "M ";
            var firstElement = true;
            for (var _i = 0, _a = this.nestedPointArray; _i < _a.length; _i++) {
                var pointArray = _a[_i];
                if (firstElement) {
                    pathString += +pointArray[0].toString() + " " + pointArray[1].toString();
                    firstElement = false;
                }
                pathString += " L " + pointArray[0].toString() + " " + pointArray[1].toString();
            }
        }
        this.addTag(new Tag_1["default"]("path")
            .addAttribute(new Attribute_1["default"]("d", pathString))
            .addAttribute(new Attribute_1["default"]("stroke", this.strokeColor))
            .addAttribute(new Attribute_1["default"]("stroke-width", this.strokeWidthValue))
            .addAttribute(new Attribute_1["default"]("stroke-linecap", this.lineCapType))
            .addAttribute(new Attribute_1["default"]("stroke-dasharray", this.dashArray))
            .addAttribute(new Attribute_1["default"]("stroke-opacity", this.strokeOpacityValue))
            .addAttribute(new Attribute_1["default"]("fill", this.fillValue))
            .addAttribute(new Attribute_1["default"]("fill-opacity", this.fillOpacityValue)));
    };
    Polygon.prototype.calculatePoints = function () {
        this.nestedPointArray = new Array();
        for (var i = 0; i <= this.numberOfSides; i++) {
            this.nestedPointArray.push([
                this.radiusValue * Math.cos((i * 2 * Math.PI) / this.numberOfSides + this.radiansToRotate) + this.xValue,
                this.radiusValue * Math.sin((i * 2 * Math.PI) / this.numberOfSides + this.radiansToRotate) + this.yValue
            ]);
        }
    };
    // @Override
    Polygon.prototype.rotate = function (radiansToRotate) {
        this.radiansToRotate = radiansToRotate;
        return this;
    };
    // @Override
    Polygon.prototype.sides = function (numberOfSides) {
        this.numberOfSides = Math.round(numberOfSides);
        return this;
    };
    // @Override
    Polygon.prototype.radius = function (radiusValue) {
        this.radiusValue = radiusValue;
        return this;
    };
    // @Override
    Polygon.prototype.x = function (x) {
        this.xValue = x;
        return this;
    };
    // @Override
    Polygon.prototype.y = function (y) {
        this.yValue = y;
        return this;
    };
    // @Override
    Polygon.prototype.position = function (x, y) {
        this.x(x);
        this.y(y);
        return this;
    };
    return Polygon;
}(Path_1["default"]));
exports["default"] = Polygon;

},{"../../../../../dom/Attribute":15,"../../../../../dom/Tag":17,"../../Path":7}],10:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Polygon_1 = require("../Polygon");
var Hexagon = /** @class */ (function (_super) {
    __extends(Hexagon, _super);
    function Hexagon() {
        var _this = _super.call(this) || this;
        _this.sides(6);
        return _this;
    }
    return Hexagon;
}(Polygon_1["default"]));
exports["default"] = Hexagon;

},{"../Polygon":9}],11:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Polygon_1 = require("../Polygon");
var Octagon = /** @class */ (function (_super) {
    __extends(Octagon, _super);
    function Octagon() {
        var _this = _super.call(this) || this;
        _this.sides(8);
        return _this;
    }
    return Octagon;
}(Polygon_1["default"]));
exports["default"] = Octagon;

},{"../Polygon":9}],12:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Polygon_1 = require("../Polygon");
var Pentagon = /** @class */ (function (_super) {
    __extends(Pentagon, _super);
    function Pentagon() {
        var _this = _super.call(this) || this;
        _this.sides(5);
        return _this;
    }
    return Pentagon;
}(Polygon_1["default"]));
exports["default"] = Pentagon;

},{"../Polygon":9}],13:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Polygon_1 = require("../Polygon");
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square() {
        var _this = _super.call(this) || this;
        _this.sides(4);
        return _this;
    }
    return Square;
}(Polygon_1["default"]));
exports["default"] = Square;

},{"../Polygon":9}],14:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Polygon_1 = require("../Polygon");
var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    function Triangle() {
        var _this = _super.call(this) || this;
        _this.sides(3);
        return _this;
    }
    return Triangle;
}(Polygon_1["default"]));
exports["default"] = Triangle;

},{"../Polygon":9}],15:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Attribute = /** @class */ (function () {
    function Attribute(key, value) {
        this.key = key;
        this.value = value;
    }
    Attribute.prototype.getKey = function () {
        return "" + this.key;
    };
    Attribute.prototype.getValue = function () {
        return "" + this.value;
    };
    return Attribute;
}());
exports["default"] = Attribute;

},{}],16:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var SVGBuilder = /** @class */ (function () {
    function SVGBuilder() {
    }
    SVGBuilder.buildFromRegistry = function (registry, backgroundColor) {
        var html = "<svg style=\"width: 100%; height: 100%; background-color: " + backgroundColor + ";\">";
        registry.forEach(function (canvasObject) {
            canvasObject.prepareForBuild();
            var canvasObjectString = "";
            canvasObject.getTags().forEach(function (tag) {
                if (tag.isVisible()) {
                    canvasObjectString += "<" + tag.getTagName();
                    tag.getAttributes().forEach(function (attribute) {
                        canvasObjectString += " " + attribute.getKey() + "=\"" + attribute.getValue() + "\"";
                    });
                    canvasObjectString += ">" + tag.getContent() + "</" + tag.getTagName() + ">";
                }
            });
            html += canvasObjectString;
        });
        return html + "</svg>";
    };
    return SVGBuilder;
}());
exports["default"] = SVGBuilder;

},{}],17:[function(require,module,exports){
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var Tag = /** @class */ (function () {
    function Tag(tagName) {
        this.attributes = new Array();
        this.tagName = tagName;
    }
    Tag.prototype.setContent = function (content) {
        this.content = content;
        return this;
    };
    Tag.prototype.getContent = function () {
        return "" + (this.content ? this.content : "");
    };
    Tag.prototype.addAttribute = function (attribute) {
        if (attribute.getValue() != "undefined") {
            this.attributes.push(attribute);
        }
        return this;
    };
    Tag.prototype.isVisible = function () {
        return this.attributes.length != 0;
    };
    Tag.prototype.getAttributes = function () {
        return __spreadArrays(this.attributes);
    };
    Tag.prototype.getTagName = function () {
        return "" + this.tagName;
    };
    return Tag;
}());
exports["default"] = Tag;

},{}],18:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var SVGCanvas_1 = require("../../main/SVGCanvas");
// Multiple canvases have been made, but this could all be drawn on one.
var sc1 = new SVGCanvas_1["default"]("1");
sc1.circle()
    .fill("red")
    .position(25, 25)
    .radius(12.5);
sc1.render();
var sc2 = new SVGCanvas_1["default"]("2");
sc2.rectangle()
    .fill("orange")
    .position(7, 12.5)
    .dimensions(35, 25);
sc2.render();
var sc3 = new SVGCanvas_1["default"]("3");
sc3.line()
    .points(10, 10, 40, 40)
    .stroke("yellow")
    .strokeWidth(3);
sc3.render();
var sc4 = new SVGCanvas_1["default"]("4");
sc4.path()
    .points([
    [10, 10],
    [15, 25],
    [35, 25],
    [40, 40]
])
    .stroke("lime")
    .strokeWidth(3)
    .fillOpacity("0");
sc4.render();
var sc5 = new SVGCanvas_1["default"]("5");
sc5.text()
    .string("hello")
    .position(5, 30)
    .fill("cyan")
    .font("consolas")
    .size("10pt");
sc5.render();
var sc6 = new SVGCanvas_1["default"]("6");
sc6.polygon()
    .sides(9)
    .position(25, 25)
    .radius(12.5)
    .rotate((2 * Math.PI) / 20)
    .fill("blue");
sc6.render();
var sc7 = new SVGCanvas_1["default"]("7");
sc7.triangle()
    .position(25, 25)
    .radius(12.5)
    .rotate((2 * Math.PI) / 20)
    .fill("purple");
sc7.render();
var sc8 = new SVGCanvas_1["default"]("8");
sc8.square()
    .position(25, 25)
    .radius(12.5)
    .rotate((2 * Math.PI) / 20)
    .fill("hotpink");
sc8.render();
var sc9 = new SVGCanvas_1["default"]("9");
sc9.pentagon()
    .position(25, 25)
    .radius(12.5)
    .rotate((2 * Math.PI) / 20)
    .fill("red");
sc9.render();
var sc10 = new SVGCanvas_1["default"]("10");
sc10.hexagon()
    .position(25, 25)
    .radius(12.5)
    .rotate((2 * Math.PI) / 20)
    .fill("orange");
sc10.render();
var sc11 = new SVGCanvas_1["default"]("11");
sc11.octagon()
    .position(25, 25)
    .radius(12.5)
    .rotate((2 * Math.PI) / 20)
    .fill("yellow");
sc11.render();
var sc12 = new SVGCanvas_1["default"]("12");
sc12.animate({ r: 0, t: 0 }, function (state) {
    sc12.circle()
        .radius(Math.sin(state.r) * 10 + 10)
        .position(25, 25)
        .fill("lime");
    state.r += 0.01;
});

},{"../../main/SVGCanvas":1}]},{},[18]);
