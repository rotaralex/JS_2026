"use strict";
const CUP_PRICES = {
    small: 10,
    large: 25
};
const TOPPING_PRICES = {
    chocolate: 5,
    caramel: 6,
    berries: 10
};
const MARSHMALLOW_PRICE = 5;
function calculateIceCreamPrice(order) {
    let total = CUP_PRICES[order.size];
    for (const topping of order.toppings) {
        total += TOPPING_PRICES[topping];
    }
    if (order.hasMarshmallow) {
        total += MARSHMALLOW_PRICE;
    }
    return total;
}
// Обробка вводу користувача через prompt
function runIceCreamApp() {
    const sizeInput = prompt("Оберіть розмір стаканчика (small або large):")?.toLowerCase();
    const size = sizeInput === "large" ? "large" : "small";
    const toppingsInput = prompt("Введіть начинки через кому (chocolate, caramel, berries). Мінімум одна:");
    const rawToppings = toppingsInput ? toppingsInput.split(",").map(t => t.trim().toLowerCase()) : [];
    const validToppings = rawToppings.filter((t) => t === "chocolate" || t === "caramel" || t === "berries");
    if (validToppings.length === 0) {
        console.warn("Не вибрано жодної начинки, автоматично додано 'chocolate'.");
        validToppings.push("chocolate");
    }
    const marshmallowInput = prompt("Додати маршмелоу? (так / ні):")?.toLowerCase();
    const hasMarshmallow = marshmallowInput === "так" || marshmallowInput === "yes";
    const order = {
        size,
        toppings: validToppings,
        hasMarshmallow
    };
    const finalPrice = calculateIceCreamPrice(order);
    console.log(`Замовлення оформлено! Загальна вартість: ${finalPrice} грн.`);
}
runIceCreamApp();
