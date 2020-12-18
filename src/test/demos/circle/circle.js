(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Circle_1 = require("./canvas-objects/simple/Circle");
var SVGBuilder_1 = require("./dom/SVGBuilder");
var SVGCanvas = /** @class */ (function () {
    function SVGCanvas(containerElementId) {
        this.registry = new Array();
        this.containerElementId = containerElementId;
    }
    SVGCanvas.prototype.register = function (canvasObject) {
        this.registry.push(canvasObject);
        return canvasObject;
    };
    SVGCanvas.prototype.render = function (testMode) {
        if (testMode === void 0) { testMode = false; }
        var html = SVGBuilder_1["default"].buildFromRegistry(this.registry);
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
    SVGCanvas.prototype.circle = function () {
        return this.register(new Circle_1["default"]());
    };
    return SVGCanvas;
}());
exports["default"] = SVGCanvas;

},{"./canvas-objects/simple/Circle":3,"./dom/SVGBuilder":5}],2:[function(require,module,exports){
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
    Circle.prototype.radius = function (radiusValue) {
        this.radiusValue = radiusValue;
        return this;
    };
    // @Override
    Circle.prototype.x = function (x) {
        this.xValue = x;
        return this;
    };
    // @Override
    Circle.prototype.y = function (y) {
        this.yValue = y;
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
    Circle.prototype.prepareForBuild = function () {
        this.addTag(new Tag_1["default"]("circle")
            .addAttribute(new Attribute_1["default"]("r", this.radiusValue || "0px"))
            .addAttribute(new Attribute_1["default"]("cx", this.xValue || "0px"))
            .addAttribute(new Attribute_1["default"]("cy", this.yValue || "0px"))
            .addAttribute(new Attribute_1["default"]("fill", this.fillValue)));
    };
    return Circle;
}(CanvasObject_1["default"]));
exports["default"] = Circle;

},{"../../dom/Attribute":4,"../../dom/Tag":6,"../CanvasObject":2}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var SVGBuilder = /** @class */ (function () {
    function SVGBuilder() {
    }
    SVGBuilder.buildFromRegistry = function (registry) {
        var html = "<svg>";
        registry.forEach(function (canvasObject) {
            canvasObject.prepareForBuild();
            var canvasObjectString = "";
            canvasObject.getTags().forEach(function (tag) {
                canvasObjectString += "<" + tag.getTagName();
                tag.getAttributes().forEach(function (attribute) {
                    canvasObjectString += " " + attribute.getKey() + "=\"" + attribute.getValue() + "\"";
                });
                canvasObjectString += "></" + tag.getTagName() + ">";
            });
            html += canvasObjectString;
        });
        return html + "</svg>";
    };
    return SVGBuilder;
}());
exports["default"] = SVGBuilder;

},{}],6:[function(require,module,exports){
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
    Tag.prototype.addAttribute = function (attribute) {
        if (attribute.getValue() != "undefined") {
            this.attributes.push(attribute);
        }
        return this;
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

},{}],7:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var SVGCanvas_1 = require("../../../main/SVGCanvas");
var canvas = new SVGCanvas_1["default"]("test");
canvas.circle()
    .radius("10px")
    .x("50px")
    .y("50px")
    .fill("red");
canvas.render();

},{"../../../main/SVGCanvas":1}]},{},[7]);
