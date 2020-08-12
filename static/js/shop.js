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

const selectCategories = shop.querySelector(".categories")

//заполняем select категорий
store.categories.forEach(category => {
    const option = document.createElement("option")
    option.textContent = category
    option.value = category
    selectCategories.appendChild(option)
})

//сортирует продукты по категориям
const showProductByCategory = (category) => {
    store.filter.category = category
}

selectCategories.addEventListener("change", () => {
    showProductByCategory(selectCategories.value)
})

const selectLines = shop.querySelector(".lines")

//заполняем select линий
store.lines.forEach(line => {
    const option = document.createElement("option")
    option.textContent = line
    option.value = line
    selectLines.appendChild(option)
})

//сортирует продукты по категориям
const showProductByLine = (line) => {
    store.filter.line = line
}

selectLines.addEventListener("change", () => {
    showProductByLine(selectLines.value)
})
