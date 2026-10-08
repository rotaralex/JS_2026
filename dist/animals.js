"use strict";
class Cat {
    name;
    age;
    color;
    constructor(name, age, color) {
        this.name = name;
        this.age = age;
        this.color = color;
    }
    move() {
        console.log(`${this.name} бігає та стрибає по кімнаті.`);
    }
    makeSound() {
        console.log(`${this.name} каже: Мяу!`);
    }
}
class Bird {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    move() {
        console.log(`${this.name} летить у небі.`);
    }
}
class Fish {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    move() {
        console.log(`${this.name} пливе під водою.`);
    }
}
const animals = [
    new Cat("Барсик", 3, "рудий"),
    new Bird("Кеша", 1),
    new Fish("Немо", 2)
];
animals.forEach(animal => animal.move());
