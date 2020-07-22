//input количества товара
const inputCount = document.querySelector(".about_product .input_count")

//div названия товара
const divTitle = document.querySelector(".about_product .card__title")

//div цены товара
const divPrice = document.querySelector(".about_product .card__price")

//img товара
const imgProduct = document.querySelector(".about_product .card__image img")

//добавляем товар в корзину
const addProductToShop = () => {
    if (store.hasItemInBasket(divTitle.textContent)) {
        store.changeCountBasket(divTitle.textContent, Number(inputCount.value))
        updateCountProducts(divTitle.textContent, Number(inputCount.value))
    } else {
        store.stateBasket.push({
            src: imgProduct.src,
            title: divTitle.textContent,
            count: Number(inputCount.value),
            price: Number(divPrice.textContent.slice(0, divPrice.textContent.length - 2))
        })

        createListItem(imgProduct.src, divTitle.textContent, divPrice.textContent, Number(inputCount.value))
    }

    setAmountProductes()
}
