const aboutProduct = document.querySelector(".about_product")

aboutProduct.querySelector(".my_button").addEventListener("click", addProductToShop)

const aboutProductTitle = document.querySelector(".about_product .card__title")
const aboutProductImage = document.querySelector(".about_product .card__image img")
const aboutProductPrice = document.querySelector(".about_product .card__price")

//показывает подробные данные о товаре
const showAboutProduct = (id) => {
    id = Number(id)

    const product = store.stateShop.find(product => product.id === id)

    aboutProductTitle.textContent = product.name
    aboutProductImage.src = product.image
    aboutProductPrice.textContent = product.price

    scrollToElement(aboutProduct)
}