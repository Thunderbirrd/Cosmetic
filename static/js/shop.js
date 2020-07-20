const shop = document.querySelector(".shop")

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

//при щелчке по карточке в магазине показывать подробную информацию о продукте
shop.querySelectorAll(".card").forEach(el => {
    el.addEventListener("click", () => {
        showAboutProduct(el.dataset.id)
    })
})