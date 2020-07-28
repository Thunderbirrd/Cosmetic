const aboutProduct = document.querySelector(".about_product")

aboutProduct.querySelector(".my_button").addEventListener("click", () => {
    addProductToShop()
    scrollToShop()
    hideAboutProduct()
})

const aboutProductTitle = aboutProduct.querySelector(".card__title")
const aboutProductImage = aboutProduct.querySelector(".card__image img")
const aboutProductPrice = aboutProduct.querySelector(".card__price")
const aboutProductCount = aboutProduct.querySelector(".input_count")
const aboutProductDescription =aboutProduct.querySelector(".description p")

//показывает подробные данные о товаре
const showAboutProduct = (id) => {
    id = Number(id)

    const product = store.stateShop.find(product => product.id === id)

    aboutProductTitle.textContent = product.name
    aboutProductImage.src = STATIC + product.image
    aboutProductPrice.innerHTML = product.price + " &#8381;"
    aboutProductCount.value = 1
    aboutProductDescription.textContent = product.description

    if (aboutProduct.classList.contains("hide")){
        aboutProduct.classList.remove("hide")
    }

    scrollToAboutProduct()
}

//прячет подробные данные о товаре
const hideAboutProduct = () => {
    aboutProduct.classList.add("hide")
}