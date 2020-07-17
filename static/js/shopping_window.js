//загрузка списка покупок
const loadingShoppingList = () => {
    const list = document.querySelector(".shopping_window .list")

    list.innerHTML = ''

    store.stateBasket.forEach(data => {
        const li = document.createElement("li")
        li.dataset.title = data.title

        li.appendChild(_createImgProduct(data.src))
        li.appendChild(_createTitle(data.title))
        li.appendChild(_createPrice(data.price))
        li.appendChild(_createCount(data.title, data.count))
        li.appendChild(_createDelete(data.title))

        list.appendChild(li)
    })
}
//loadingShoppingList()

//в поле номер телефона вводить можно только числа
document.querySelector(".shopping_window .data_fields .number").addEventListener("keypress", (event) => {
    const data = String.fromCharCode(event.charCode)

    if (data < "0" || data > "9") event.preventDefault();
})