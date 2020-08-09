const withoutArticles = document.querySelectorAll(".without_articles ")

//прячет "Стастьи" и показывает основной лендинг
const hideArtices = () => {
    withoutArticles.forEach(el => { 
        el.classList.remove("hide") 
    })

    articles.classList.add("hide")
}

//показывает "Стастьи" и прячет основной лендинг
const showArtices = () => {
    withoutArticles.forEach(el => { 
        el.classList.add("hide") 
    })

    articles.classList.remove("hide")
}