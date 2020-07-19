const initialHeaderPaddingTop = document.querySelector('header').style.paddingTop
const header = document.querySelector('header')
const main = document.querySelector('main')

//прокрутка к элементу element
const scrollToElement = (element) => {
    element.scrollIntoView()
    scrollBy(0, -1 * header.offsetHeight)
}

// задаёт header статическое или фиксированное положение в зависимости от прокрутки страницы
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
        let left = wrapHeader.clientWidth + wrapHeaderBox.left
        wrapBasket.style.left = left + 'px'
    }

    let top = wrapHeader.clientHeight + wrapHeaderBox.top
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

    _setPositionShoppingBasket()
    _setPaddingShoppingBasket()
    _setVisibilityShoppingBasket()
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
        Urls.goToUrl(Paths.BASKET)
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

