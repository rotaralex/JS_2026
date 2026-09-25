// 1. Оголошення базових типів
const greeting: string = "Привіт, TypeScript!";
const age: number = 20;
const isStudent: boolean = true;
let dynamicData: any = "Початковий текст";
dynamicData = 100;

console.log("Рядок:", greeting);
console.log("Число:", age);
console.log("Булеве значення:", isStudent);
console.log("Any:", dynamicData);

// 2. Масиви рядків та чисел
const skills: string[] = ["JavaScript", "TypeScript", "Node.js"];
const scores: Array<number> = [95, 88, 72, 100];

console.log("Навички:", skills);
console.log("Бали:", scores);