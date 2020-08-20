const aboutProduct = document.querySelector(".about_product")

document.querySelector(".about_product_inputs").insertBefore(
    numberInput,
    document.querySelector(".about_product_inputs .my_button")
)

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
const showAboutProduct = (id, type) => {
    const product = store.getProductByIdAndType(id, type)

    aboutProduct.dataset.id = id;
    aboutProduct.dataset.type = type;

    aboutProductTitle.textContent = product.name
    aboutProductImage.src = product.image
    aboutProductImage.width = 200
    aboutProductImage.height = 200
    aboutProductPrice.innerHTML = product.price + " &#8381;"
    aboutProductCount.value = 1
    aboutProductDescription.textContent = product.description

    setMaxNumber(store.getProductByIdAndType(id, type).quantity)

    if (aboutProduct.classList.contains("hide")){
        aboutProduct.classList.remove("hide")
    }
}

//прячет подробные данные о товаре
const hideAboutProduct = () => {
    aboutProduct.classList.add("hide")
}