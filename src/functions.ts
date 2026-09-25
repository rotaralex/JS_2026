// 4. Функція з параметром за замовчуванням
function displayUser(name: string, level: number = 1): void {
  console.log(`Користувач: ${name}, Рівень: ${level}`);
}

displayUser("Олександр");       // Використає значення за замовчуванням: 1
displayUser("Марія", 5);        // Використає передане значення: 5