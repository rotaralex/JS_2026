"use strict";
class Book {
    title;
    author;
    pageCount;
    isBorrowed = false;
    constructor(title, author, pageCount) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
    }
    borrow() {
        this.isBorrowed = true;
    }
    getDetails() {
        return `Книга: "${this.title}", Автор: ${this.author}, Сторінок: ${this.pageCount}`;
    }
}
class Magazine {
    title;
    author;
    issueNumber;
    isBorrowed = false;
    constructor(title, author, issueNumber) {
        this.title = title;
        this.author = author;
        this.issueNumber = issueNumber;
    }
    borrow() {
        this.isBorrowed = true;
    }
    getDetails() {
        return `Журнал: "${this.title}", Видавець/Редактор: ${this.author}, Номер: ${this.issueNumber}`;
    }
}
class DVD {
    title;
    author;
    durationMinutes;
    isBorrowed = false;
    constructor(title, author, // Режисер
    durationMinutes) {
        this.title = title;
        this.author = author;
        this.durationMinutes = durationMinutes;
    }
    borrow() {
        this.isBorrowed = true;
    }
    getDetails() {
        return `DVD: "${this.title}", Режисер: ${this.author}, Тривалість: ${this.durationMinutes} хв.`;
    }
}
class Library {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    findItemByName(name) {
        return this.items.find(item => item.title.toLowerCase() === name.toLowerCase());
    }
    listAvailableItems() {
        console.log("\n--- Доступні матеріали в бібліотеці ---");
        const available = this.items.filter(item => !item.isBorrowed);
        if (available.length === 0) {
            console.log("Немає доступних матеріалів.");
            return;
        }
        available.forEach(item => console.log(item.getDetails()));
    }
}
const lib = new Library();
const book1 = new Book("Кобзар", "Тарас Шевченко", 400);
const mag1 = new Magazine("National Geographic", "Editorial Board", 12);
const dvd1 = new DVD("Тіні забутих предків", "Сергій Параджанов", 97);
lib.addItem(book1);
lib.addItem(mag1);
lib.addItem(dvd1);
console.log("Всі матеріали після додавання:");
lib.listAvailableItems();
// Позичаємо один елемент
console.log("\nПозичаємо книгу 'Кобзар'...");
const found = lib.findItemByName("Кобзар");
if (found) {
    found.borrow();
}
console.log("\nМатеріали після видачі книги:");
lib.listAvailableItems();
