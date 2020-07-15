const list_product = document.querySelector(".list_product")
const ulListProduct = list_product.querySelector("ul")
const listIsEmpty = document.querySelector(".listIsEmpty")

//переключает видимость сообщение о том что пуста ли корзина покупок
const togleDisplayListIsEmpty = () => {
    if (store.stateBasket.length === 0) {
        listIsEmpty.style.display = "block"
    } else {
        listIsEmpty.style.display = "none"
    }
}

const showListProduct = () => {
    togleDisplayListIsEmpty()

    list_product.classList.add("show")
}

const hideListProduct = () => {
    list_product.classList.remove("show")
}

jQuery(function($){
    $(document).mouseup(function (e){ // событие клика по веб-документу
        let list_product = $(".list_product")
        let basket = $(".wrap_basket")

		if (!list_product.is(e.target) // если клик был не по списку товаров
            && list_product.has(e.target).length === 0 // и не по дочерним элементам списка товаров
            && !basket.is(e.target)// и не по корзине
            && basket.has(e.target).length === 0){ // и не по дочерним элементам корзины
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
    input.type = "number"
    input.max = "99"
    input.min = "1"
    input.value = count
    input.onchange = () => {
        console.log(title, input.value)
        store.changeCountBasket(title, input.value)
    }

    div.appendChild(input)

    return div 
}

//удаляет в всплывающем окне запись
const deleteListItem = (title) => {
    //удаляем из store
    let index = store.stateBasket.findIndex( item => item.title === title )
    store.stateBasket.splice(index, 1)

    //удаляем из списка
    ulListProduct.removeChild(document.querySelector(`.list_product li[data-title='${title}']`))
    
    //проверяем видимость
    togleDisplayListIsEmpty()
}

const _createDelete = (title) => {
    const div = document.createElement("div")
    div.classList.add("delete")

    const button = document.createElement("button")
    button.addEventListener("click", () => {
        deleteListItem(title)
    })
    
    const img = document.createElement("img")
    img.src = "/static/img/X.svg"
    img.alt = "X"

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

//оформляем заказ при клике на кнопку
document.querySelector(".checkout button").addEventListener("click", () => {
    const data = {}

    const list = ulListProduct.children

    for (let i = 0; i < list.length; i++) {
        data[list[i].dataset.title] = list[i].querySelector(".count input").value      
    }

    Urls.checkout(data) 
})