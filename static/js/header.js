const initialHeaderPaddingTop = document.querySelector('header').style.paddingTop
const header = document.querySelector('header')
const main = document.querySelector('main')

// при прокрутке странице делаем header фиксированным
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 0) {
        header.style.position = 'fixed'
        main.style.paddingTop = header.offsetHeight + 'px'
    } else {
        header.style.position = 'static'
        main.style.paddingTop = initialHeaderPaddingTop
    }
})

const count_productes = document.getElementById('count_productes')
const basket = document.querySelector('.wrap_basket img')

// задаёт положение корзинки покупок
const _setPositionShoppingBasket = () => {
    const wrapHeader = document.querySelector('.wrap_header')

    const wrapHeaderBox = wrapHeader.getBoundingClientRect()

    const wrapBasket = document.querySelector('.wrap_basket')

    let left = wrapHeader.clientWidth + wrapHeaderBox.left
    wrapBasket.style.left = left + 'px'

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
    if (count_productes.textContent && Number(count_productes.textContent) !== 0) {
        count_productes.style.visibility = 'visible'
    } else {
        count_productes.style.visibility = 'hidden'
    }
}

// задаёт отступы кружочка корзинки покупок
const _setPaddingShoppingBasket = () => {
    if (count_productes.textContent.length === 1) {
        count_productes.style.padding = '3px 7px'
    } else {
        count_productes.style.padding = '3px'
    }
}

// изменяет количество продуктов в кружочке
const setCountProductes = (count) => {
    count_productes.textContent = count

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
            window.history.replaceState({
                type: FORWARD,
                newPath: Paths[item.getAttribute('data-path')]
            }, '')

            window.history.pushState({
                type: DO_ACTION
            }, '', Paths[item.getAttribute('data-path')])

            window.history.back()
        })
    })

    const goToBasket = () => {
        window.history.replaceState({
            type: FORWARD,
            newPath: Paths.BASKET
        }, '')

        window.history.pushState({
            type: DO_ACTION
        }, '', Paths.BASKET)

        window.history.back()
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

