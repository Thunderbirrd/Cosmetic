const list_product = document.querySelector(".list_product")

const showListProduct = () => {
    list_product.classList.add("show")
}

const hideListProduct = () => {
    list_product.classList.remove("show")
}

jQuery(function($){
    $(document).mouseup(function (e){ // событие клика по веб-документу
        let list_product = $(".list_product")
        let basket = $(".wrap_basket")

		if (!list_product.is(e.target) // если клик был не по списку товаров
            && list_product.has(e.target).length === 0 // и не по дочерним элементам списка товаров
            && !basket.is(e.target)// и не по корзине
            && basket.has(e.target).length === 0){ // и не по дочерним элементам корзины
                hideListProduct()
		}
	});
});