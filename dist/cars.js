"use strict";
class Car {
    brand;
    engineType;
    vinCode;
    constructor(brand, engineType, vinCode) {
        this.brand = brand;
        this.engineType = engineType;
        this.vinCode = vinCode;
    }
    getVin() {
        return this.vinCode;
    }
}
class BMW extends Car {
    model;
    isMSeries;
    constructor(model, vinCode, isMSeries) {
        super("BMW", "Бензиновий/Гібрид", vinCode);
        this.model = model;
        this.isMSeries = isMSeries;
    }
    displayInfo() {
        console.log(`Марка: ${this.brand}, Модель: ${this.model}, Тип двигуна: ${this.engineType}, M-пакет: ${this.isMSeries}, VIN: ${this.getVin()}`);
    }
}
class Tesla extends Car {
    model;
    autopilotVersion;
    constructor(model, vinCode, autopilotVersion) {
        super("Tesla", "Електричний", vinCode);
        this.model = model;
        this.autopilotVersion = autopilotVersion;
    }
    displayInfo() {
        console.log(`Марка: ${this.brand}, Модель: ${this.model}, Двигун: ${this.engineType}, Автопілот v${this.autopilotVersion}, VIN: ${this.getVin()}`);
    }
}
class Audi extends Car {
    model;
    hasQuattro;
    constructor(model, vinCode, hasQuattro) {
        super("Audi", "Дизельний/TFSI", vinCode);
        this.model = model;
        this.hasQuattro = hasQuattro;
    }
    displayInfo() {
        console.log(`Марка: ${this.brand}, Модель: ${this.model}, Двигун: ${this.engineType}, Повний привід Quattro: ${this.hasQuattro}, VIN: ${this.getVin()}`);
    }
}
const cars = [
    new BMW("M3", "WBA12345678BMW01", true),
    new BMW("X5", "WBA98765432BMW02", false),
    new Tesla("Model 3", "5YJ12345678TSLA01", 3),
    new Tesla("Model S Plaid", "5YJ98765432TSLA02", 4),
    new Audi("A6", "WAU12345678AUDI01", true),
    new Audi("Q7", "WAU98765432AUDI02", true)
];
cars.forEach(car => car.displayInfo());
