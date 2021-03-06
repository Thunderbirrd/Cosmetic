window.onload = () => {
    //задаём header отступы main в зависимости от ширины экрана (ширина мобильного устройтва или компьютера)
    _setPositionHeader()

    // задаём начальные настройки кружочка корзинки покупок и самой корзинки
    setAmountProductes()

    //добавляем событие клика для оформления покупок в корзину
    addClickListenerForCheckoutButton()

    //настраивает видимость меню магазина
    setVisiabilityMenuShop()

    //показывает корзинку с товарами и её кружочек
    showWrapBasket()

    //делаем действия при начальной загрузке страницы
    doActionByCurentURL()
    
    //показывает всплывающие элементы
    checkPopUpElements()
}

// при прокрутке странице делаем header фиксированным
// window.addEventListener('scroll', _setPositionHeader)

window.addEventListener('resize', () => {
    _setPositionHeader()
    _setPositionShoppingBasket()
    _setPositionShoppingBasketCircle()

    //настраивает видимость меню магазина
    setVisiabilityMenuShop()

    //настраиваем ширину строк магазина
    setUpRows()
})

window.onpopstate = () => {
    doActionByCurentURL()
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
            hideArtices()
            scrollToShop()
            break;
        case Paths.SHOP:
            hideArtices()
            scrollToShop()
            break;
        case Paths.ARTICLES:
            showArtices()

            let id = Urls.getQueryParam('id')
            if (id === "") {
                hideArticle()
            } else {            
                showArticle(id) 
            }

            break;
        case Paths.SERVICES:
            hideArtices()
            scrollToService()
            break;
        case Paths.CONTACTS:
            hideArtices()
            scrollToContacts()
            showMedia()
            break;
        default:
            console.log(`not found url: ${window.location.pathname}`)
            break;
    }
}

//событие отпускания кнопки мыши
jQuery(function ($) {
    $(document).mouseup(function (e) {
        //закрываем list_product если пикнуто не по нему или не по его дочерним элементам
        //и не по basket и не по его дочерним элементам
        const list_product = $(".list_product")
        const basket = $(".wrap_basket")

        if (!list_product.is(e.target) // если клик был не по списку товаров
            && list_product.has(e.target).length === 0 // и не по дочерним элементам списка товаров
            && !basket.is(e.target)// и не по корзине
            && basket.has(e.target).length === 0) { // и не по дочерним элементам корзины
            hideListProduct()
        }

        //закрываем selected если пикнуто не по options_container или не по его дочерним элементам
        //и не по selected и не по его дочерним элементам
        const options_container = $(".options_container")
        const selected = $(".selected")

        if (!options_container.is(e.target) &&
            options_container.has(e.target).length === 0 &&
            !selected.is(e.target) &&
            selected.has(e.target).length === 0) {

            hideOptionsContainer()
        }

        //закрываем orderTypeListOptions если пикнуто не по order_type_list_options или не по его дочерним элементам
        //и не по orderTypeTitle и не по его дочерним элементам
        const orderTypeTitle = $("#order_type .title")
        const orderTypeListOptions = $("#order_type .order_type_list_options")

        if (!orderTypeTitle.is(e.target) &&
            orderTypeTitle.has(e.target).length === 0 &&
            !orderTypeListOptions.is(e.target) &&
            orderTypeListOptions.has(e.target).length === 0) {

            hideOrderTypeList()
        }

        //закрываем about_product если пикнуто не по wrap_about_product и не по его дочерни элементам
        const wrapAboutProduct = $('.wrap_about_product')

        if (!wrapAboutProduct.is(e.target) &&
            wrapAboutProduct.has(e.target).length === 0){

            hideAboutProduct()
        }
    });
});

window.addEventListener("scroll", () => {
    //показывает всплывающие элементы
    checkPopUpElements()
})
