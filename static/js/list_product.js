const list_product = document.querySelector(".list_product")
const ulListProduct = list_product.querySelector("ul")
const listIsEmpty = document.querySelector(".listIsEmpty")
const divAmount = document.querySelector(".list_product .amount")
const spanAmount = divAmount.querySelector("span")

//задаёт сумму в span 
const setTextInSpanAmount = () => {
    spanAmount.textContent = store.getAmountBasket()
}

//переключает видимость сообщение о том что пуста ли корзина покупок
const togleDisplayListIsEmpty = () => {
    if (store.stateBasket.length === 0) {
        listIsEmpty.style.display = "block"
        divAmount.style.display = "none"
    } else {
        listIsEmpty.style.display = "none"
        divAmount.style.display = "block"
    }
}

const showListProduct = () => {
    togleDisplayListIsEmpty()

    list_product.classList.add("show")
}

const hideListProduct = () => {
    list_product.classList.remove("show")
}

jQuery(function ($) {
    $(document).mouseup(function (e) { // событие клика по веб-документу
        let list_product = $(".list_product")
        let basket = $(".wrap_basket")

        if (!list_product.is(e.target) // если клик был не по списку товаров
            && list_product.has(e.target).length === 0 // и не по дочерним элементам списка товаров
            && !basket.is(e.target)// и не по корзине
            && basket.has(e.target).length === 0) { // и не по дочерним элементам корзины
            hideListProduct()
        }
    });
});

const _createImgProduct = (src) => {
    const div = document.createElement("div")
    div.classList.add("img_product")

    const img = document.createElement("img")
    img.src = src
    img.alt = "Продукт"
    img.width = 80
    img.height = 80

    div.appendChild(img)

    return div
}

const _createTitle = (title) => {
    const div = document.createElement("div")
    div.classList.add("title")

    const p = document.createElement("p")
    p.textContent = title

    div.appendChild(p)

    return div
}

const _createPrice = (price) => {
    const div = document.createElement("div")
    div.classList.add("price")

    const p = document.createElement("p")
    p.textContent = price

    div.appendChild(p)

    return div
}

const _createCount = (title, count) => {
    const div = document.createElement("div")
    div.classList.add("count")

    const input = document.createElement("input")
    input.type = "text"
    input.size = "2"
    input.maxLength = "2"
    input.minLength = "1"
    input.value = count
    input.onkeypress = (event) => {
        const data = String.fromCharCode(event.charCode)

        if (data < "0" || data > "9") event.preventDefault();
    }
    input.oninput = () => {
        store.changeCountBasket(title, input.value)

        setAmountProductes()
        setTextInSpanAmount()

        console.log(store.stateBasket[0].count)
    }

    const buttonMinus = document.createElement("button")
    buttonMinus.classList.add("minus")
    buttonMinus.innerHTML = "&#8211;"
    buttonMinus.addEventListener("click", () => {
        if (Number(input.value) === 1) return;

        input.value--

        store.changeCountBasket(title, input.value)

        setAmountProductes()
        setTextInSpanAmount()
    })

    const buttonPlus = document.createElement("button")
    buttonPlus.classList.add("plus")
    buttonPlus.textContent = "+"
    buttonPlus.addEventListener("click", () => {
        if (Number(input.value) === 99) return;

        input.value++

        store.changeCountBasket(title, input.value)

        setAmountProductes()
        setTextInSpanAmount()
    })

    div.appendChild(buttonMinus)
    div.appendChild(input)
    div.appendChild(buttonPlus)

    return div
}

//удаляет в всплывающем окне запись
const deleteListItem = (title) => {
    //удаляем из store
    store.deleteProductFromBasket(title)

    //удаляем из списка
    ulListProduct.removeChild(document.querySelector(`.list_product li[data-title='${title}']`))

    //проверяем видимость надписи, что список пуст
    togleDisplayListIsEmpty()

    setAmountProductes()
}

const _createDelete = (title) => {
    const div = document.createElement("div")
    div.classList.add("delete")

    const button = document.createElement("button")
    button.addEventListener("click", () => {
        deleteListItem(title)
    })

    const img = document.createElement("img")
    img.src = "/static/img/basket.png"
    img.alt = "удалить"

    button.appendChild(img)

    div.appendChild(button)

    return div
}

//создаёт в всплывающем окне запись
const createListItem = (src, title, price, count) => {
    const li = document.createElement("li")
    li.dataset.title = title

    li.appendChild(_createImgProduct(src))
    li.appendChild(_createTitle(title))
    li.appendChild(_createPrice(price))
    li.appendChild(_createCount(title, count))
    li.appendChild(_createDelete(title))

    ulListProduct.appendChild(li)
}

//обновляет количество товаров
const updateCountProducts = (title, count) => {
    document.querySelector(`.list_product li[data-title='${title}'] .count input`).value = count
}

const addClickListenerForCheckoutButton = () => {
    //оформляем заказ при клике на кнопку
    document.querySelector(".checkout button").addEventListener("click", () => {
        const data = {}

        const list = ulListProduct.children

        for (let i = 0; i < list.length; i++) {
            data[list[i].dataset.title] = list[i].querySelector(".count input").value
        }

        Urls.checkout(data)

        loadingShoppingList()
    })
}