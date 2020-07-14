//input количества товара
const inputCount = document.querySelector(".about_product .my_input")

//div названия товара
const divTitle = document.querySelector(".about_product .card__title")

//div цены товара
const divPrice = document.querySelector(".about_product .card__price")

//добавляем товар в корзину
const addProductToShop = () => {
    let product = store.stateBasket.find(item => item.title === divTitle.textContent)

    if (product !== undefined) {
        product.count += Number(inputCount.value)
    } else {
        store.stateBasket.push({
            title: divTitle.textContent,
            count: Number(inputCount.value),
            price: divPrice.textContent
        })
    }

    setCountProductes(store.stateBasket.length)
}
