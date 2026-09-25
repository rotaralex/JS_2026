interface Payable {
  pay(): void;
}

abstract class Employee implements Payable {
  constructor(
    public name: string,
    public age: number,
    public salary: number
  ) {}

  abstract getAnnualBonus(): number;

  pay(): void {
    console.log(`Виплачено заробітну плату працівнику ${this.name}: ${this.salary} грн.`);
  }
}

class Developer extends Employee {
  constructor(name: string, age: number, salary: number) {
    super(name, age, salary);
  }

  // Бонус 10%
  getAnnualBonus(): number {
    return this.salary * 0.1;
  }
}

class Manager extends Employee {
  constructor(name: string, age: number, salary: number) {
    super(name, age, salary);
  }

  // Бонус 20%
  getAnnualBonus(): number {
    return this.salary * 0.2;
  }
}

const staff: Employee[] = [
  new Developer("Іван", 25, 60000),
  new Developer("Анастасія", 28, 75000),
  new Manager("Сергій", 35, 90000),
  new Manager("Олена", 40, 110000)
];

let totalBonuses = 0;

staff.forEach(emp => {
  emp.pay();
  const bonus = emp.getAnnualBonus();
  totalBonuses += bonus;
  console.log(`Річний бонус ${emp.name}: ${bonus} грн.`);
});

console.log(`\nЗагальна сума річних бонусів: ${totalBonuses} грн.`);