const _createImgProductShoppingWindow = (src) => {
    const div = document.createElement("div")
    div.classList.add("img_product")

    const img = document.createElement("img")
    img.width = 80
    img.height = 80
    img.src = src
    img.alt = "Фото продукта"

    div.appendChild(img)

    return div
}

const _createTitleShoppingWindow = (title) => {
    const div = document.createElement("div")
    div.classList.add("title")

    const p = document.createElement("p")
    p.textContent = title

    div.appendChild(p)

    return div
}

const _createPriceShoppingWindow = (price) => {
    const div = document.createElement("div")
    div.classList.add("price")

    const p = document.createElement("p")
    p.innerHTML = `Цена: ${price} &#8381;`

    div.appendChild(p)

    return div
}

const _createCountShoppingWindow = (count) => {
    const div = document.createElement("div")
    div.classList.add("count")

    const p = document.createElement("p")
    p.innerHTML = `Количество: ${count}`

    div.appendChild(p)

    return div
}

const _createAmountShoppingWindow = (price, count) => {
    const div = document.createElement("div")
    div.classList.add("amount")

    const p = document.createElement("p")
    p.innerHTML = `Сумма: ${price * count} &#8381;`

    div.appendChild(p)

    return div
}

//загрузка списка покупок
const loadingShoppingList = () => {
    const list = document.querySelector(".shopping_window .list")

    list.innerHTML = ''

    store.stateBasket.forEach(data => {
        const li = document.createElement("li")
        li.dataset.title = data.title

        li.appendChild(_createImgProductShoppingWindow(data.src))
        li.appendChild(_createTitleShoppingWindow(data.title))
        li.appendChild(_createPriceShoppingWindow(data.price))
        li.appendChild(_createCountShoppingWindow(data.count))
        li.appendChild(_createAmountShoppingWindow(data.price, data.count))

        list.appendChild(li)
    })
}

loadingShoppingList()

const shoppingWindow = document.querySelector(".shopping_window")

//показ shopping_window
const showShoppingWindow = () => {
    scrollToElement(shoppingWindow)
    loadingShoppingList()
}

//в поле номер телефона вводить можно только числа
document.querySelector(".shopping_window .data_fields .number").addEventListener("keypress", (event) => {
    const data = String.fromCharCode(event.charCode)

    if (data < "0" || data > "9") event.preventDefault();
});

(() => {
    const additionallyFields = document.querySelectorAll(".shopping_window .data_fields .address .additionally")

    //при клике что город Якутск показываем поля название улицы и номер дома, убираем поле город
    document.getElementById("isCityYakutsk").onchange = (ev) => {
        additionallyFields.forEach(field => {
            field.classList.toggle("hide")
        })
    }
})()

const cityCheckbox = document.getElementById("isCityYakutsk")
const cityInput = shoppingWindow.querySelector(".data_fields .city .my_input")

const streetInput = shoppingWindow.querySelector(".data_fields .street .my_input")

const homeInput = shoppingWindow.querySelector(".data_fields .home .my_input")

const phoneInput = shoppingWindow.querySelector(".data_fields .number .my_input")

const nameInput = shoppingWindow.querySelector(".data_fields .name .my_input")

const surnameInput = shoppingWindow.querySelector(".data_fields .surname .my_input")

const orderTypeInput = shoppingWindow.querySelector(".data_fields .order_type .my_input")

//событие покупки товаров при клике по кнопке "Купить"
document.querySelector(".shopping_window .data_fields .buy").onclick = () => {
    //id, address, phone, name, surname, order_type

    const id = store.stateCheckout.id
    const address = cityCheckbox.checked 
        ?"Якутск" 
        :`${cityInput.textContent} ${streetInput.textContent} ${homeInput.textContent}`
    const phone = phoneInput.textContent
    const name = nameInput.textContent
    const surname = surnameInput.textContent
    const orderType = orderTypeInput.textContent

    console.log(id, address, phone, name, surname, orderType)

    Urls.buyProducts(id, address, phone, name, surname, orderType)
}