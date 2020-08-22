//input количества товара
const inputCount = document.querySelector(".about_product .input_count")

//div названия товара
const divTitle = document.querySelector(".about_product .card__title")

//div цены товара
const divPrice = document.querySelector(".about_product .card__price")

//img товара
const imgProduct = document.querySelector(".about_product .card__image img")

const elementAboutProduct = document.querySelector(".about_product")

//добавляем товар в корзину
const addProductToShop = () => {
    let {id, type} = elementAboutProduct.dataset;
    const product = store.getProductByIdAndType(id, type)

    if (store.hasItemInBasket(divTitle.textContent)) {
        if (product.category == "Сертификаты") return;

        let newNumber = Math.min(Number(inputCount.value) + store.getCountBasket(divTitle.textContent), 99)
        store.changeCountBasket(id, type, newNumber)
        updateCountProducts(id, type, newNumber)
    } else {
        store.stateBasket.push({
            id,
            type,
            src: imgProduct.src,
            title: divTitle.textContent,
            count: Number(inputCount.value),
            price: product.newPrice
        })

        createListItem(imgProduct.src, divTitle.textContent, 
            divPrice.textContent, Number(inputCount.value), 
            id, type)
    }

    setAmountProductes()
}
