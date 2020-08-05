const list_product = document.querySelector(".list_product")
const ulListProduct = list_product.querySelector("ul")
const listIsEmpty = document.querySelector(".listIsEmpty")
const divAmount = document.querySelector(".list_product .amount")
const spanAmount = divAmount.querySelector("span")

//задаёт сумму в span 
const setTextInSpanAmount = (amount=store.getAmountBasket()) => {
    spanAmount.textContent = amount
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
        const maxNumber = Math.min(99, store.getProductByTitle(title).quantity)

        if (Number(input.value) >= maxNumber) {
            input.value = maxNumber
        }

        store.changeCountBasket(title, input.value)

        setAmountProductes()
        setTextInSpanAmount()
    }
    input.onchange = () => {
        if (Number(input.value) <= 0) {
            deleteListItem(title)
            return;
        }
    }

    const buttonMinus = document.createElement("button")
    buttonMinus.classList.add("minus")
    buttonMinus.innerHTML = "&#8211;"
    buttonMinus.addEventListener("click", () => {
        input.value--

        if (Number(input.value) <= 0) {
            deleteListItem(title)
            return;
        }

        store.changeCountBasket(title, input.value)

        setAmountProductes()
        setTextInSpanAmount()
    })

    const buttonPlus = document.createElement("button")
    buttonPlus.classList.add("plus")
    buttonPlus.textContent = "+"
    buttonPlus.dataset.title = "Данного товара на складе очень мало"
    buttonPlus.addEventListener("click", () => {
        const maxNumber = Math.min(99, store.getProductByTitle(title).quantity)

        if (Number(input.value) >= maxNumber) {
            input.value = maxNumber
            return;
        }

        input.value++

        store.changeCountBasket(title, input.value)

        setAmountProductes()
        setTextInSpanAmount()
    })
    if (store.getProductByTitle(title).quantity > 10) {
        buttonPlus.classList.remove("show_tooltip") 
    } else {
        buttonPlus.classList.add("show_tooltip") 
    }

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

//создает предупреждение которое пока невидимо
const _createWarning = () => {
    const div = document.createElement("div")
    div.classList.add("warning")
    div.classList.add("hide")

    const p = document.createElement("p")

    div.appendChild(p)

    return div
}

//показ предупреждения
const showWarningListItem = (text, id, newQuantity) => {
    const li = document.querySelector(`.list_product li[data-id='${id}']`)
    li.classList.add("warning_item")

    const divWarning = li.querySelector(".warning")
    divWarning.classList.remove("hide")

    const p = divWarning.querySelector("p")
    p.textContent = text

    store.getProductById(id).quantity = newQuantity
}

//очищаем список покупок
const clearListProducts = () => {
    ulListProduct.innerHTML = ""
    store.clearStateBasket()
    setAmountProductes()
}

//создаёт в всплывающем окне запись
const createListItem = (src, title, price, count) => {
    const li = document.createElement("li")
    li.dataset.title = title
    li.dataset.id = store.getIdByTitle(title)

    li.appendChild(_createImgProduct(src))
    li.appendChild(_createTitle(title))
    li.appendChild(_createPrice(price))
    li.appendChild(_createCount(title, count))
    li.appendChild(_createDelete(title))
    li.appendChild(_createWarning())

    ulListProduct.appendChild(li)
}

//обновляет количество товаров
const updateCountProducts = (title, count) => {
    document.querySelector(`.list_product li[data-title='${title}'] .count input`).value = count
}

//проверка на несоответствия данных количество товаров
const checkForDataInconsistencies = (userData, serverData) => {
    for (const id in userData) {
        if (userData.hasOwnProperty(id) && serverData[id] !== userData[id]) {
            let text = `К сожаление на складе количество товара: ${serverData[id]}, а не ${userData[id]} (как вы указали)`
            showWarningListItem(text, id, serverData[id])
            store.setQuantityById(id, serverData[id])
        }
    }
}

const addClickListenerForCheckoutButton = () => {
    //оформляем заказ при клике на кнопку
    document.querySelector(".checkout button").addEventListener("click", async () => {
        const data = {}

        const list = ulListProduct.children

        if (list.length === 0) {
            message.showMessage("Список покупок пуст", message.WARNING, 1000)
            return;
        }

        for (let i = 0; i < list.length; i++) {
            let product = store.stateShop.find(item => item.name === list[i].dataset.title )

            data[product.id] = Number(list[i].querySelector(".count input").value)
        }

        let result = await Urls.checkout(data)

        if (result === null) {
            message.showMessage("Произошла ошибка на стороне сервера", message.ERROR)
        } else if (result.id === 0) { //result.id === 0 не надо оформлять договор с сервером
            checkForDataInconsistencies(data, result.list)
            message.showMessage("Некоторые продукты недоступны в таком количестве", 
                message.WARNING)
        } else {
            store.stateCheckout = result
            hideListProduct()
            showShoppingWindow()
        }
    })
}