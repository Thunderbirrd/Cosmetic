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
    p.innerHTML = `Цена: ${price} <span style="font-family:Arial;">&#8381;</span>`

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
    p.innerHTML = `Сумма: ${price * count} <span style="font-family:Arial;">&#8381;</span>`

    div.appendChild(p)

    return div
}

//загрузка списка покупок
const loadingShoppingList = () => {
    const list = document.querySelector(".shopping_window .list ul")

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

const shopButton = document.querySelector(".shopping_window .data_fields .buy")

const errorMessages = shoppingWindow.querySelectorAll(".field .error_message")

//отключить кнопку shopButton
const disableShopButton = () => {
    shopButton.disabled = true
}

//включить кнопку shopButton
const enableShopButton = () => {
    shopButton.disabled = false
}

//прячем все сообщения об ошибках в начале
errorMessages.forEach(el => {
    el.classList.add("hide")
})

//логика показа сообщений ошибок кроме order_type
shoppingWindow.querySelectorAll(".field:not(.order_type)").forEach(el => {
    const my_input = el.querySelector(".my_input")
    const error_message = el.querySelector(".error_message")

    if (el.classList.contains("number")) {
        const inputHandler = () => {
            if (my_input.value.length === 10) {
                error_message.classList.add("hide")
            } else {
                error_message.classList.remove("hide")
            }
        }

        //для поля номера телефона
        my_input.addEventListener("blur", () => {
            if (my_input.value.length !== 10) {
                error_message.classList.remove("hide")
                my_input.addEventListener("input", inputHandler)
            } else {
                error_message.classList.add("hide")
                my_input.removeEventListener("input", inputHandler)
            }
        })
        
    } else {
        const inputHandler = () => {
            const arraySpace = my_input.value.match(/ /g)

            if ((arraySpace === null ||
                arraySpace.length !== my_input.value.length) &&
                my_input.value !== ''){
                
                error_message.classList.add("hide")
            } else {
                error_message.classList.remove("hide")
            }
        }

        //для остальных полей
        //строка ,начинающиеся и заканчивающиеся пробелом /^ $/
        my_input.addEventListener("blur", () => {
            const arraySpace = my_input.value.match(/ /g)

            if (arraySpace !== null &&
                arraySpace.length ===  my_input.value.length || 
                my_input.value === '') {
                error_message.classList.remove("hide")
                my_input.addEventListener("input", inputHandler)
            } else {
                error_message.classList.add("hide")
                my_input.removeEventListener("input", inputHandler)
            }
        })
    }
});

//проверка на правильность полей
const checkCorrect = () => {
    let flag = true

    shoppingWindow.querySelectorAll(".field:not(.order_type)").forEach(el => {
        const my_input = el.querySelector(".my_input")
        const error_message = el.querySelector(".error_message")
    
        if (el.classList.contains("number")) {
            const inputHandler = () => {
                if (my_input.value.length === 10) {
                    error_message.classList.add("hide")
                } else {
                    error_message.classList.remove("hide")
                }
            }
    
            //для поля номера телефона
            const isNotCorrect = my_input.value.length !== 10

            if (isNotCorrect) {
                error_message.classList.remove("hide")
                my_input.addEventListener("input", inputHandler)
            }

            flag = flag && !isNotCorrect
                        
        } else {
            const inputHandler = () => {
                const arraySpace = my_input.value.match(/ /g)
    
                if ((arraySpace === null ||
                    arraySpace.length !== my_input.value.length) &&
                    my_input.value !== ''){
                    
                    error_message.classList.add("hide")
                } else {
                    error_message.classList.remove("hide")
                }
            }
    
            //для города проверяем ещё чекбокс
            const inputIsCityYakutsk = document.getElementById("isCityYakutsk")
            let isCityYakutsk = true

            if (el.classList.contains("city")) {
                isCityYakutsk = inputIsCityYakutsk.checked
            }

            //для остальных полей
            //строка ,начинающиеся и заканчивающиеся пробелом /^ $/
            const arraySpace = my_input.value.match(/ /g)
            
            const isNotCorrect = arraySpace !== null &&
                arraySpace.length ===  my_input.value.length || 
                my_input.value === ''

            if (isNotCorrect) {
                error_message.classList.remove("hide")
                my_input.addEventListener("input", inputHandler)
            }

            flag = flag && (!isNotCorrect || isCityYakutsk)
        }
    });

    const order_type = shoppingWindow.querySelector(".order_type")
    const title = order_type.querySelector(".title")
    const error_message = order_type.querySelector(".error_message")

    const isNotCorrect = title.dataset.value === title.dataset.default

    if (isNotCorrect) {
        error_message.classList.remove("hide")

        order_type.querySelectorAll(".order_type_option").forEach(el => {
            el.addEventListener("click", () => {
                error_message.classList.add("hide")
            })
        })
    }

    flag = flag && !isNotCorrect

    return flag
}

//показ shopping_window
const showShoppingWindow = () => {
    shoppingWindow.classList.remove("hide")
    hideOrderTypeElementList()
    scrollToShoppingWindow()
    loadingShoppingList()
}

//спрятать shopping_window
const hideShoppingWindow = () => {
    shoppingWindow.classList.add("hide")
}

//в поле номер телефона вводить можно только числа
document.querySelector(".shopping_window .data_fields .number").addEventListener("keypress", (event) => {
    const data = String.fromCharCode(event.charCode)

    if (data < "0" || data > "9") event.preventDefault();
});

// скрывает некоторые пункты списка типов доставки
let hideOrderTypeElementList;

(() => {
    const additionallyFields = document.querySelectorAll(".shopping_window .data_fields .address .additionally:not(.not)")

    const additionallyCityFields = document.querySelectorAll(".shopping_window .data_fields .address .additionally.not")

    const errorMessage = document.querySelector(".shopping_window .data_fields .city .error_message")

    const inputIsCityYakutsk = document.getElementById("isCityYakutsk")

    const liYkt = document.querySelector(".shopping_window .order_type_option[data-value='YKT']")
    const liOut = document.querySelector(".shopping_window .order_type_option[data-value='OUT']")
    const liSam = document.querySelector(".shopping_window .order_type_option[data-value='SAM']")

    hideOrderTypeElementList = () => {
        if (inputIsCityYakutsk.checked) {
            liYkt.classList.remove("hide")
            liOut.classList.add("hide")
            liSam.classList.remove("hide")
        } else {
            liYkt.classList.add("hide")
            liOut.classList.remove("hide")
            liSam.classList.add("hide")
        }
    }

    //при клике что город Якутск показываем поля название улицы и номер дома, убираем поле город
    document.getElementById("isCityYakutsk").onchange = (ev) => {
        if (ev.target.checked) {
            errorMessage.classList.add("hide")
        }

        hideOrderTypeElementList()

        additionallyFields.forEach(field => {
            if (ev.target.checked) {
                field.classList.remove("hide")
            } else {
                field.classList.add("hide")
            }
        })

        additionallyCityFields.forEach(field => {
            if (ev.target.checked) {
                field.classList.add("hide")
            } else {
                field.classList.remove("hide")
            }
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

const orderTypeTitle = shoppingWindow.querySelector("#order_type .title")

const entranceInput = shoppingWindow.querySelector(".data_fields .entrance .my_input")

const flatInput = shoppingWindow.querySelector(".data_fields .flat .my_input")

//подъезд квартира

//событие покупки товаров при клике по кнопке "Купить"
shopButton.onclick = async () => {
    //id, address, phone, name, surname, order_type

    if (!checkCorrect()) return;

    disableShopButton()

    const id = store.stateCheckout.id
    const address = cityCheckbox.checked
        ? `Якутск ${streetInput.value} ${homeInput.value} ${entranceInput.value} ${flatInput.value}`
        : `${cityInput.value}`
    const phone = phoneInput.value
    const name = nameInput.value
    const surname = surnameInput.value
    const orderType = orderTypeTitle.dataset.value;

    if (await Urls.buyProducts(id, address, phone, name, surname, orderType) === "Success"){
        message.showMessage("Товар успешно заказан! Вам скоро перезвонят для уточнения", message.SUCCESS, 4000, message.CENTER)
    } else {
        message.showMessage("Извините, произошла ошибка", message.ERROR)
    }

    hideShoppingWindow()
    clearListProducts()
    scrollToShop()

    enableShopButton()
}

//список видов доставок
const orderType = document.getElementById("order_type")

//переключение класса active
document.querySelector("#order_type .title").addEventListener("click", () => {
    orderType.classList.toggle("active")
})

//прячит список типов доставок
const hideOrderTypeList = () => {
    orderType.classList.remove("active")
}

//выбор пункта из списка
orderType.querySelectorAll(".order_type_option").forEach(el => {
    el.addEventListener("click", () => {
        orderTypeTitle.textContent = el.textContent
        orderTypeTitle.dataset.value = el.dataset.value
        hideOrderTypeList()
    })
})