"use strict";
class Circle {
    radius;
    constructor(radius) {
        this.radius = radius;
    }
    getArea() {
        return Math.PI * this.radius * this.radius;
    }
    getPerimeter() {
        return 2 * Math.PI * this.radius;
    }
    scale(factor) {
        this.radius *= factor;
    }
}
class Rectangle {
    width;
    height;
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
    getPerimeter() {
        return 2 * (this.width + this.height);
    }
    scale(factor) {
        this.width *= factor;
        this.height *= factor;
    }
}
class Triangle {
    a;
    b;
    c;
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    getPerimeter() {
        return this.a + this.b + this.c;
    }
    getArea() {
        const s = this.getPerimeter() / 2;
        // Формула Герона
        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
    }
    scale(factor) {
        this.a *= factor;
        this.b *= factor;
        this.c *= factor;
    }
}
const shapes = [
    new Circle(5),
    new Rectangle(4, 6),
    new Triangle(3, 4, 5)
];
const totalArea = shapes.reduce((sum, shape) => sum + shape.getArea(), 0);
const totalPerimeter = shapes.reduce((sum, shape) => sum + shape.getPerimeter(), 0);
console.log(`Загальна площа: ${totalArea.toFixed(2)}`);
console.log(`Загальний периметр: ${totalPerimeter.toFixed(2)}`);
