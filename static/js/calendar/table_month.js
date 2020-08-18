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

//заполняет месяцы
const fillTableMonth = async ()=> {
    const monthsFromBD = await Urls.getMonths()

    months.forEach((month, i) => {
        const div = document.createElement("div")
        div.classList.add("month")

        div.dataset.number = i + 1
        div.dataset.name = month

        const p = document.createElement("p")
        p.textContent = month
        div.appendChild(p)

        const button = document.createElement("button")
        button.addEventListener("click", async () => {
            button.setAttribute("disabled", "disabled")
            changeStatusMonthsOnTable(button, await Urls.changeStatusMonthsOnTable(i + 1))
        })
        div.appendChild(button)

        if (monthsFromBD[i + 1]) {
            div.classList.add("enable")
            button.textContent = "Закрыть"
        } else {
            div.classList.add("disable")
            button.textContent = "Открыть"
        }

        monthsElement.appendChild(div)
    });
}

fillTableMonth()

//изменяет статусы месяцев в таблице
const changeStatusMonthsOnTable = async (button, monthsFromBD) => {
    button.removeAttribute("disabled")

    monthsFromBD = monthsFromBD === undefined ?await Urls.getMonths() :monthsFromBD

    monthsElement.querySelectorAll(".month").forEach((month, i) => {
        if (monthsFromBD[i + 1]) {
            month.classList.remove("disable")
            month.classList.add("enable")
            month.querySelector("button").textContent = "Закрыть"
        } else {
            month.classList.remove("enable")
            month.classList.add("disable")
            month.querySelector("button").textContent = "Открыть"
        }
    });
}
