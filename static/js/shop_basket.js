//хранилище товаров
const products = []

//input количества товара
const inputCount = document.querySelector(".about_product .count")
const divTitle = document.querySelector(".about_product .card__title")
const divPrice = document.querySelector(".about_product .card__price")

//добавляем товар в корзину
const addProductToShop = () => {
    products.push([divTitle.textContent, Number(inputCount.textContent), divPrice.textContent])
}
