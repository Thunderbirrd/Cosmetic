const withoutArticles = document.querySelectorAll(".without_articles ")

//прячет "Стастьи" и показывает основной лендинг
const hideArtices = () => {
    withoutArticles.forEach(el => { 
        el.classList.remove("hide") 
    })

    articles.classList.add("hide")
}

//показывает "Стастьи" и прячет основной лендинг
const showArtices = async () => {
    withoutArticles.forEach(el => { 
        el.classList.add("hide") 
    })

    articles.classList.remove("hide")

    await loadArticlesContents()
}

const ulContents = document.querySelector(".articles .contents")

//загружает оглавление
const loadArticlesContents = async () => {
    ulContents.innerHTML = ""

    const contents = await Urls.getArticlesContents()

    contents.forEach(content => {
        const li = document.createElement("li")
        li.dataset.id = content.id
        li.addEventListener("click", () => { showArticle(content.id) })

        const h3 = document.createElement("h3")
        h3.textContent = content.title
        li.appendChild(h3)

        const p = document.createElement("p")
        p.textContent = content.text + "..."
        li.appendChild(p)

        const img = document.createElement("img")
        img.src = content.img
        img.alt = content.title
        li.appendChild(img)

        ulContents.appendChild(li)
    })
}

const elementArticle = document.querySelector(".articles article")

//показывает статью
const showArticle = async (id) => {
    ulContents.classList.add("hide")
    elementArticle.classList.remove("hide")

    const article = await Urls.getArticle(id)

    const h3 = elementArticle.querySelector("h3")
    h3.textContent = article.title

    const articlesText = elementArticle.querySelector(".articles_text")
    articlesText.textContent = article.text

    const articlesImages = elementArticle.querySelector(".articles_images")
    article.images.forEach(src => {
        const img = document.createElement("img")
        img.src = src
        img.alt = ""
        articlesImages.appendChild(img)
    })
}

//прячет статью и показывает оглавление
const hideArticle = () => {
    ulContents.classList.remove("hide")
    elementArticle.classList.add("hide")
}