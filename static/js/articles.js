const withoutArticles = document.querySelectorAll(".without_articles ")

//прячет "Стастьи" и показывает основной лендинг
const hideArtices = () => {
    withoutArticles.forEach(el => { 
        el.classList.remove("hide_without_articles") 
    })

    articles.classList.add("hide")
}

//показывает "Стастьи" и прячет основной лендинг
const showArtices = async () => {
    withoutArticles.forEach(el => { 
        el.classList.add("hide_without_articles") 
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
        li.dataset.title = content.title
        li.addEventListener("click", () => {  
            Urls.addQueryParam("id", content.id)
            doActionByCurentURL()
        })

        const h3 = document.createElement("h3")
        h3.textContent = content.title
        li.appendChild(h3)

        const p = document.createElement("p")
        p.textContent = content.text + "..."
        li.appendChild(p)

        const img = document.createElement("img")
        img.src = content.image
        img.alt = content.title
        li.appendChild(img)

        ulContents.appendChild(li)
    })
}

const elementArticle = document.querySelector(".articles article")

const listArticles = document.querySelector(".articles .list_articles")
const wrapArticle = document.querySelector(".articles .wrap_article")

const h3 = elementArticle.querySelector("h3")
const articlesText = elementArticle.querySelector(".articles_text")
const articlesImages = elementArticle.querySelector(".articles_images")
//показывает статью
const showArticle = async (id) => {
    listArticles.classList.add("hide")

    articlesImages.innerHTML = ""

    const article = await Urls.getArticle(id)

    h3.textContent = article.title

    articlesText.innerHTML = article.text.replace(/\n/g, "<br>");

    article.images.forEach(src => {
        const img = document.createElement("img")
        img.src = src
        img.alt = ""
        articlesImages.appendChild(img)
    })
    
    wrapArticle.classList.remove("hide")
}

//прячет статью и показывает оглавление
const hideArticle = () => {
    listArticles.classList.remove("hide")
    wrapArticle.classList.add("hide")
}

wrapArticle.querySelector(".back").addEventListener("click", () => {
    hideArticle()
    Urls.goToUrl(Paths.ARTICLES)
})

//показывает статьи по названию
const showArticleByTitle = (title) => {
    ulContents.querySelectorAll("li").forEach(el => {
        console.log(title, el.dataset.title)
        if (String(el.dataset.title).toLocaleLowerCase().includes(String(title).toLocaleLowerCase())) {
            el.classList.remove("hide")
        } else {
            el.classList.add("hide")
        }
    })
}

const articlesSeachInput = listArticles.querySelector(".search_input")

//ищем статьи по названию
articlesSeachInput.addEventListener("input", () => {
    showArticleByTitle(articlesSeachInput.value)
});