window.onload = () => {
    //задаём header статическое или фиксированное положение в зависимости от прокрутки страницы
    _setPositionHeader()

    // задаём начальные настройки кружочка корзинки покупок и самой корзинки
    _setPositionShoppingBasket()
    _setPaddingShoppingBasket()
    _setVisibilityShoppingBasket()
    _setPositionShoppingBasketCircle()
}

// при прокрутке странице делаем header фиксированным
window.addEventListener('scroll', _setPositionHeader)

window.addEventListener('resize', () => {
    _setPositionShoppingBasket()
    _setPositionShoppingBasketCircle()
})

window.onpopstate = (event) => {
    switch (event.state.type) {
        case DO_ACTION:
            doActionByCurentURL()
            return;
        case FORWARD:
            window.history.forward()
            return;
        case NOT_DO_POPSTATE:
            return;
        default:
            return;
    }
}

//переход по url
//можно вставлять сюда свои функции, чтобы отлавливать переход по url
const doActionByCurentURL = () => {
    addClassNameActiveMenu()

    switch (window.location.pathname) {
        case Paths.HOME:
            console.log(window.location.pathname)
            return;
        case Paths.SHOP:
            console.log(window.location.pathname)
            return;
        case Paths.SHIPPING_AND_PLAYMENT:
            console.log(window.location.pathname)
            return;
        case Paths.SERVICES:
            console.log(window.location.pathname)
            return;
        case Paths.CONTACTS:
            console.log(window.location.pathname)
            return;
        case Paths.BASKET:
            console.log(window.location.pathname)
            return;
        default:
            console.log(`not found url: ${window.location.pathname}`)
            return;
    }
}

//делаем действия при начальной загрузке страницы
doActionByCurentURL()
