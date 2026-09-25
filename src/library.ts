interface LibraryItem {
  title: string;
  author: string;
  isBorrowed: boolean;
  borrow(): void;
  getDetails(): string;
}

class Book implements LibraryItem {
  public isBorrowed: boolean = false;

  constructor(
    public title: string,
    public author: string,
    public pageCount: number
  ) {}

  borrow(): void {
    this.isBorrowed = true;
  }

  getDetails(): string {
    return `Книга: "${this.title}", Автор: ${this.author}, Сторінок: ${this.pageCount}`;
  }
}

class Magazine implements LibraryItem {
  public isBorrowed: boolean = false;

  constructor(
    public title: string,
    public author: string,
    public issueNumber: number
  ) {}

  borrow(): void {
    this.isBorrowed = true;
  }

  getDetails(): string {
    return `Журнал: "${this.title}", Видавець/Редактор: ${this.author}, Номер: ${this.issueNumber}`;
  }
}

class DVD implements LibraryItem {
  public isBorrowed: boolean = false;

  constructor(
    public title: string,
    public author: string, // Режисер
    public durationMinutes: number
  ) {}

  borrow(): void {
    this.isBorrowed = true;
  }

  getDetails(): string {
    return `DVD: "${this.title}", Режисер: ${this.author}, Тривалість: ${this.durationMinutes} хв.`;
  }
}

class Library {
  private items: LibraryItem[] = [];

  addItem(item: LibraryItem): void {
    this.items.push(item);
  }

  findItemByName(name: string): LibraryItem | undefined {
    return this.items.find(item => item.title.toLowerCase() === name.toLowerCase());
  }

  listAvailableItems(): void {
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