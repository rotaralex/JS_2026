interface Animal {
  name: string;
  age: number;
  color?: string; // Опціональна властивість
  move(): void;
  makeSound?(): void; // Опціональний метод
}

class Cat implements Animal {
  name: string;
  age: number;
  color?: string;

  constructor(name: string, age: number, color?: string) {
    this.name = name;
    this.age = age;
    this.color = color;
  }

  move(): void {
    console.log(`${this.name} бігає та стрибає по кімнаті.`);
  }

  makeSound(): void {
    console.log(`${this.name} каже: Мяу!`);
  }
}

class Bird implements Animal {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  move(): void {
    console.log(`${this.name} летить у небі.`);
  }
}

class Fish implements Animal {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  move(): void {
    console.log(`${this.name} пливе під водою.`);
  }
}

const animals: Animal[] = [
  new Cat("Барсик", 3, "рудий"),
  new Bird("Кеша", 1),
  new Fish("Немо", 2)
];

animals.forEach(animal => animal.move());