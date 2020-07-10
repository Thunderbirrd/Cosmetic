window.addEventListener('resize', () => {
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
