const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
]

const monthsElement = document.querySelector(".table_month .months");

//заполняем месяцы
(async ()=> {
    const monthsFromBD = await Urls.getMonths()

    months.forEach((month, i) => {
        const div = document.createElement("div")
        div.classList.add("month")
        div.classList.add("enable")

        div.dataset.number = i + 1
        div.dataset.name = month

        const p = document.createElement("p")
        p.textContent = month
        div.appendChild(p)

        const button = document.createElement("button")
        button.textContent = "Открыть"
        div.appendChild(button)

        monthsElement.appendChild(div)
    });
})();