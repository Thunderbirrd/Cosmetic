window.onload = () => {
    //задаём header отступы main в зависимости от ширины экрана (ширина мобильного устройтва или компьютера)
    _setPositionHeader()

    // задаём начальные настройки кружочка корзинки покупок и самой корзинки
    setAmountProductes()

    //добавляем событие клика для оформления покупок в корзину
    addClickListenerForCheckoutButton()

    //делаем действия при начальной загрузке страницы
    doActionByCurentURL()
}

// при прокрутке странице делаем header фиксированным
// window.addEventListener('scroll', _setPositionHeader)

window.addEventListener('resize', () => {
    _setPositionHeader()
    _setPositionShoppingBasket()
    _setPositionShoppingBasketCircle()
})

window.onpopstate = (event) => {
    switch (event.state.type) {
        case DO_ACTION:
            doActionByCurentURL()
            break;
        case FORWARD:
            window.history.forward()
            break;
        case NOT_DO_POPSTATE:
            break;
        default:
            break;
    }
}

//выключаю прокрутку страницы автоматически
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

//переход по url
//можно вставлять сюда свои функции, чтобы отлавливать переход по url
const doActionByCurentURL = () => {
    addClassNameActiveMenu()

    switch (window.location.pathname) {
        case Paths.HOME:
            scrollToShop()
            break;
        case Paths.SHOP:
            scrollToShop()
            break;
        case Paths.SHIPPING_AND_PLAYMENT:
            scrollToShippingAndPlayment()
            break;
        case Paths.SERVICES:
            scrollToService()
            break;
        case Paths.CONTACTS:
            scrollToContacts()
            break;
        case Paths.BASKET:
            setTextInSpanAmount()
            showListProduct()
            break;
        default:
            console.log(`not found url: ${window.location.pathname}`)
            break;
    }
}
