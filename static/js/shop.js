const shop = document.querySelector("main .shop")

//замена прокрутки по оси OY на ось OX
shop.querySelectorAll(".row").forEach(el => {
    el.addEventListener("wheel", (e) => {
        e = e || event

        let delta = e.deltaY === 0 ? e.deltaX : e.deltaY

        if ((delta > 0 && el.scrollLeft + el.clientWidth < el.scrollWidth) || (delta < 0 && el.scrollLeft > 0)) {
            e.preventDefault()
            el.scrollBy(delta, 0)
        }
    })
})

//при щелчке по карточке в магазине показывать подробную информацию о продукте
shop.querySelectorAll(".card").forEach(el => {
    el.addEventListener("click", () => {
        showAboutProduct(el.dataset.id)
    })
})

const shopSearchInput = shop.querySelector(".search_input")

const showProductByFilter = (name, brand) => {
    const all = ""

    shopCard.forEach(el => {
        if ((brand === all || el.dataset.brand === brand) &&
            String(el.dataset.name).toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
            el.classList.remove("hide")
        } else {
            el.classList.add("hide")
        }
    })
}

//показывает продукты названия которых совпадают с "name"
const showProductByName = (name) => {
    store.filter.name = name
}

//ищем продукты по названию
shopSearchInput.addEventListener("input", (e) => {
    showProductByName(shopSearchInput.value)
})