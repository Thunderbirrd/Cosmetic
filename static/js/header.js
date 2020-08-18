const initialHeaderPaddingTop = document.querySelector('header').style.paddingTop
const header = document.querySelector('header')
const main = document.querySelector('main')

//прокрутка к элементу element
const scrollToElement = (element) => {
    let scrollTop = jQuery(element).offset().top

    if (!isWidthMobileScreen()) {
        scrollTop -= header.offsetHeight - 1
    }

    //задаём параметры анимации прокрутки
    jQuery('html, body').animate({ scrollTop })
}

const scrollToAboutProduct = () => { scrollToElement(aboutProduct) }
const scrollToShoppingWindow = () => { scrollToElement(shoppingWindow) }
const scrollToShop = () => { scrollToElement(shop) }
const scrollToArticles = () => { scrollToElement(articles) }
const scrollToContacts = () => { scrollToElement(contacts) }
const scrollToService = () => { scrollToElement(service) }

//задаём header отступы main в зависимости от ширины экрана (ширина мобильного устройтва или компьютера)
const _setPositionHeader = () => {
    if (isWidthMobileScreen()) {
        main.style.paddingTop = initialHeaderPaddingTop
    } else {
        main.style.paddingTop = header.offsetHeight + 'px'
    }
}

const count_productes = document.getElementById('count_productes')
const basket = document.querySelector('.wrap_basket img')

// задаёт положение корзинки покупок
const _setPositionShoppingBasket = () => {
    const wrapHeader = document.querySelector('.wrap_header')

    const wrapHeaderBox = wrapHeader.getBoundingClientRect()

    const wrapBasket = document.querySelector('.wrap_basket')

    
    if (isWidthMobileScreen()) {
        wrapBasket.style.left = 10 + 'px'
        wrapBasket.style.top = 10 + 'px'
        return;
    }

    if (isWidthSmallScreen()) {
        wrapBasket.style.left = 10 + 'px'
    } else {
        let left = wrapHeader.clientWidth + wrapHeaderBox.left + 10
        wrapBasket.style.left = left + 'px'
    }

    let top = wrapHeader.clientHeight + wrapHeaderBox.top + 10
    wrapBasket.style.top = top + 'px'
}

// задаёт положение кружочка корзинки покупок
const _setPositionShoppingBasketCircle = () => {
    let basketBox = basket.getBoundingClientRect()

    let left = basket.offsetWidth + basketBox.left - count_productes.offsetWidth / 2
    count_productes.style.left = left + 'px'

    let top = basket.clientHeight + basketBox.top - count_productes.offsetHeight / 2 - 5
    count_productes.style.top = top + 'px'
}

// задаёт видимость кружочка корзинки покупок
const _setVisibilityShoppingBasket = () => {
    if (store.getAmountBasket() > 0) {
        count_productes.style.visibility = 'visible'
    } else {
        count_productes.style.visibility = 'hidden'
    }
}

// задаёт отступы кружочка корзинки покупок
const _setPaddingShoppingBasket = () => {
    if (count_productes.textContent.length === 1) {
        count_productes.style.padding = '1px 7px'
    } else {
        count_productes.style.padding = '2px 3px'
    }
}

// изменяет количество продуктов в кружочке
const setAmountProductes = (amount=store.getAmountBasket()) => {
    count_productes.innerHTML = `${amount} &#8381;`

    setTextInSpanAmount(amount)

    _setPaddingShoppingBasket()
    _setVisibilityShoppingBasket()
    _setPositionShoppingBasket()
    _setPositionShoppingBasketCircle()
}

//задаём изменение url при клике по элементам меню
(() => {
    const elementsMenu = document.querySelectorAll('.menu li')

    elementsMenu.forEach(item => {
        item.addEventListener('click', () => {
            Urls.goToUrl(Paths[item.getAttribute('data-path')])
        })
    })

    const goToBasket = () => {
        setTextInSpanAmount()
        showListProduct()
    }

    basket.addEventListener('click', goToBasket)
    count_productes.addEventListener('click', goToBasket)
})()

//добавляет класс active элементу меню, если соотетсвует url данному элементу
const addClassNameActiveMenu = () => {
    const elementsMenu = document.querySelectorAll('.menu li')

    elementsMenu.forEach(item => {
        if (Paths[item.getAttribute('data-path')] === window.location.pathname){
            item.classList.add('active')
        } else {
            item.classList.remove('active')
        }
    })
}

//функция показывающая список продуктов с указанным brand, если brand не указан то показываются все товары
const showProductByBrand = (brand="") => {
    store.filter.brand = brand
}

//сортирует продукты по категориям
const showProductByLine = (line="") => {
    store.filter.line = line
}

//сортирует продукты по категориям
const showProductByCategory = (category="") => {
    store.filter.category = category
}

const dropdownContent = document.querySelector("header .dropdown_content");
const dropupContent = document.querySelector("header .dropup_content");


//добавляет brand и список линий к element
const addBrandAndLinesContentToElement = (element, brand, lines) => {
    let divBrand = document.createElement("div")
    divBrand.classList.add("lines") 

    let a = document.createElement("a")
    a.href = "#"
    a.textContent = brand

    a.addEventListener("click", (e) => {
        e.preventDefault()
        showProductByBrand(brand)
    })

    divBrand.appendChild(a)

    const divLinesContent = createLinesContent(brand, lines)
    divLinesContent.classList.add("hide")

    divBrand.addEventListener("click", () => {
        divBrand.classList.toggle("active")
        divLinesContent.classList.toggle("hide")
    })
    
    element.appendChild(divBrand)
    element.appendChild(divLinesContent)
}

//создаёт список линий
const createLinesContent = (brand, lines) => {
    const divLinesContent = document.createElement("div")
    divLinesContent.classList.add("lines_content")
    divLinesContent.classList.add("list")

    const allElement = document.createElement("a")
    allElement.href = "/all"
    allElement.textContent = "Все линии"

    allElement.addEventListener("click", e => {
        e.preventDefault()
        showProductByBrand(brand)
        showProductByLine("")
    })

    divLinesContent.appendChild(allElement)

    lines.forEach(line => {
        const a = document.createElement("a")
        a.href = "/" + line
        a.textContent = line

        a.addEventListener("click", (e) => {
            e.preventDefault()
            showProductByLine(line)
        })

        divLinesContent.appendChild(a)
    })

    return divLinesContent
}

//добавляем список брендов в всплывающем меню в поле магазин в header
(() => {
    const brandsContentDown = dropdownContent.querySelector(".brands_content")
    const brandsContentUp = dropupContent.querySelector(".brands_content")

    //при щелчке по "Категории" показываем и скрываем список категорий 
    const brandsUp = dropupContent.querySelector(".brands")
    brandsUp.addEventListener("click", () => {
        brandsUp.classList.toggle("active")
        brandsContentUp.classList.toggle("hide")
    })

    const brandsDown = dropdownContent.querySelector(".brands")
    brandsDown.addEventListener("click", () => {
        brandsDown.classList.toggle("active")
        brandsContentDown.classList.toggle("hide")
    })

    //сбрасываем фильтры
    const resetFilter = (e) => {
        e.preventDefault()
        showProductByBrand("")
        showProductByLine("")
    }

    brandsContentUp.querySelector(".all").addEventListener("click", resetFilter)
    brandsContentDown.querySelector(".all").addEventListener("click", resetFilter)    

    store.brands.forEach(({brand, lines}) => {
        addBrandAndLinesContentToElement(brandsContentDown, brand, lines)
        addBrandAndLinesContentToElement(brandsContentUp, brand, lines)
    })
})();

//добавляем список категорий в всплывающем меню в поле магазин в header
(() => {
    const categoriesContentDown = dropdownContent.querySelector(".categories_content")
    const categoriesContentUp = dropupContent.querySelector(".categories_content")

    //при щелчке по "Категории" показываем и скрываем список категорий 
    const categotiesUp = dropupContent.querySelector(".categories")
    categotiesUp.addEventListener("click", () => {
        categotiesUp.classList.toggle("active")
        categoriesContentUp.classList.toggle("hide")
    })

    const categotiesDown = dropdownContent.querySelector(".categories")
    categotiesDown.addEventListener("click", () => {
        categotiesDown.classList.toggle("active")
        categoriesContentDown.classList.toggle("hide")
    })

    //сбрасываем фильтр по категориям
    const resetFilter = (e) => {
        e.preventDefault()
        showProductByCategory("")
    }

    categoriesContentUp.querySelector(".all").addEventListener("click", resetFilter)
    categoriesContentDown.querySelector(".all").addEventListener("click", resetFilter)

    //заполням списки категорий
    store.categories.forEach(category => {
        let a = document.createElement("a")
        a.href = "/" + category
        a.textContent = category

        const clickListener = (e) => {
            e.preventDefault()
            showProductByCategory(category)
        }

        a.addEventListener("click", clickListener)

        let clone = a.cloneNode(true)
        clone.addEventListener("click", clickListener)

        categoriesContentDown.appendChild(a)
        categoriesContentUp.appendChild(clone)
    })
})();

//настраивает видимость меню магазина
const setVisiabilityMenuShop = () => {
    if (isWidthMobileScreen()) {
        dropdownContent.classList.add("hide")
        dropupContent.classList.remove("hide")
    } else {
        dropdownContent.classList.remove("hide")
        dropupContent.classList.add("hide")        
    }
}

const resetAllFilter = () => {
    store.filter.resetAllFilter()
}

document.querySelectorAll("header .dropdown .reset_all_filter").forEach(el => {
    el.addEventListener("click", (e) => {
        e.preventDefault()
        resetAllFilter()
    })
})
