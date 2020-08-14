const shop = document.querySelector("main .shop")

//замена прокрутки по оси OY на ось OX
shop.querySelectorAll(".row").forEach(el => {
    el.addEventListener("wheel", (e) => {
        e = e || event

        let delta = e.deltaY === 0 ? e.deltaX : e.deltaY

        //поправка на 1 пиксель
        if ((delta > 0 && el.scrollLeft + el.offsetWidth + 1 < el.scrollWidth) || (delta < 0 && el.scrollLeft > 0)) {
            e.preventDefault()
            el.scrollBy(delta, 0)
        }
    })
})

const shopSearchInput = shop.querySelector(".search_input")

const divNothingFound = shop.querySelector(".nothing_found")

const showProductByFilter = (name, brand, line, category) => {
    const all = ""

    let isNothingFound = true

    shopCard.forEach(el => {
        if ((brand === all || el.dataset.brand === brand) &&
            (line === all || el.dataset.line === line) &&
            (category === all || el.dataset.category === category) &&
            String(el.dataset.name).toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
            el.classList.remove("hide")
            isNothingFound = false
        } else {
            el.classList.add("hide")
        }
    })

    if (isNothingFound) {
        divNothingFound.classList.remove("hide")
    } else {
        divNothingFound.classList.add("hide")
    }
}

//показывает продукты названия которых совпадают с "name"
const showProductByName = (name) => {
    store.filter.name = name
}

//ищем продукты по названию
shopSearchInput.addEventListener("input", (e) => {
    showProductByName(shopSearchInput.value)
});

//Анимация лупы
$(".btnsearch").on("click", function () {
    $(".search_input").toggleClass("inclicked");
    $(".btnsearch").toggleClass("close");
});
