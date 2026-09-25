abstract class Car {
  public brand: string;
  protected engineType: string;
  private vinCode: string;

  constructor(brand: string, engineType: string, vinCode: string) {
    this.brand = brand;
    this.engineType = engineType;
    this.vinCode = vinCode;
  }

  public abstract displayInfo(): void;

  protected getVin(): string {
    return this.vinCode;
  }
}

class BMW extends Car {
  public model: string;
  private isMSeries: boolean;

  constructor(model: string, vinCode: string, isMSeries: boolean) {
    super("BMW", "Бензиновий/Гібрид", vinCode);
    this.model = model;
    this.isMSeries = isMSeries;
  }

  public displayInfo(): void {
    console.log(
      `Марка: ${this.brand}, Модель: ${this.model}, Тип двигуна: ${this.engineType}, M-пакет: ${this.isMSeries}, VIN: ${this.getVin()}`
    );
  }
}

class Tesla extends Car {
  public model: string;
  private autopilotVersion: number;

  constructor(model: string, vinCode: string, autopilotVersion: number) {
    super("Tesla", "Електричний", vinCode);
    this.model = model;
    this.autopilotVersion = autopilotVersion;
  }

  public displayInfo(): void {
    console.log(
      `Марка: ${this.brand}, Модель: ${this.model}, Двигун: ${this.engineType}, Автопілот v${this.autopilotVersion}, VIN: ${this.getVin()}`
    );
  }
}

class Audi extends Car {
  public model: string;
  public hasQuattro: boolean;

  constructor(model: string, vinCode: string, hasQuattro: boolean) {
    super("Audi", "Дизельний/TFSI", vinCode);
    this.model = model;
    this.hasQuattro = hasQuattro;
  }

  public displayInfo(): void {
    console.log(
      `Марка: ${this.brand}, Модель: ${this.model}, Двигун: ${this.engineType}, Повний привід Quattro: ${this.hasQuattro}, VIN: ${this.getVin()}`
    );
  }
}

const cars: Car[] = [
  new BMW("M3", "WBA12345678BMW01", true),
  new BMW("X5", "WBA98765432BMW02", false),
  new Tesla("Model 3", "5YJ12345678TSLA01", 3),
  new Tesla("Model S Plaid", "5YJ98765432TSLA02", 4),
  new Audi("A6", "WAU12345678AUDI01", true),
  new Audi("Q7", "WAU98765432AUDI02", true)
];

cars.forEach(car => car.displayInfo());