const historyClient = document.querySelector(".history_client")

const tbodyHistoryClient = historyClient.querySelector("tbody")

const spanName = document.querySelector(".about_client .name")
const spanSurname = document.querySelector(".about_client .surname")
const spanFatherName = document.querySelector(".about_client .father_name")
const spanPhone = document.querySelector(".about_client .phone")
const spanEmail = document.querySelector(".about_client .email")
const spanSale = document.querySelector(".about_client .sale")

//возвращает строку для табицы tbodyHistoryClient
const createRowInHistoryTable = ({date, time, service_id, status}) => {
    const tr = document.createElement("tr")

    const className = status === "PAY" ?"paid" :"not_paid"
    tr.classList.add(className)

    const tdDate = document.createElement("td")
    // в базе данных даты хранятся в формате гггг-мм-дд, надо отобразить дд-мм-гггг
    tdDate.textContent = date.split("-").reverse().join("-")
    tr.appendChild(tdDate)

    const tdTime = document.createElement("td")
    tdTime.textContent = time
    tr.appendChild(tdTime)

    const tdService = document.createElement("td")
    tdService.textContent = service_id
    tr.appendChild(tdService)

    return tr
}

//сравнивает даты date1 и date2 в формате гггг-мм-дд, если date1 > date2, то вернёт 1, иначе -1, если равны, то 0
const compareDate = (date1, date2) => {
    const arrDate1 = date1.split("-")
    
    const arrDate2 = date2.split("-")

    if (Number(arrDate1[0]) !== Number(arrDate2[0])) return Number(arrDate1[0]) > Number(arrDate2[0])?1 :-1

    if (Number(arrDate1[1]) !== Number(arrDate2[1])) return Number(arrDate1[1]) > Number(arrDate2[1])?1 :-1
    
    if (Number(arrDate1[2]) !== Number(arrDate2[2])) return Number(arrDate1[2]) > Number(arrDate2[2])?1 :-1

    return 0
}

//сравнивает даты time1 и time2 в формате чч:мм, если time1 > time2, то вернёт 1, иначе -1, если равны, то 0
const compareTime = (time1, time2) => {
    const arrTime1 = time1.split(":")
    
    const arrTime2 = time2.split(":")

    if (Number(arrTime1[0]) !== Number(arrTime2[0])) return Number(arrTime1[0]) > Number(arrTime2[0]) ?1 :-1
    
    if (Number(arrTime1[1]) !== Number(arrTime2[1])) return Number(arrTime1[1]) > Number(arrTime2[1]) ?1 :-1
    
    return 0
}

//показывает историю клиента по его visit_id
const showHistoryClient = async (visit_id) => {
    hideCalendar()

    historyClient.classList.remove("hide")

    const result = await Urls.getAllVisitsByVisitId(visit_id)

    //очищаем место для новой информации
    tbodyHistoryClient.querySelectorAll("tr").forEach( (elem, i) => {
        if (i !== 0) elem.remove()
    })
    
    //сортируем result.all_client_visits по убыванию даты и времени
    result.all_client_visits.sort((a, b) => {
        let result = compareDate(a.date, b.date)
        if (result !== 0){
            return result * -1
        }
        
        result = compareTime(a.time, b.time)
        if (result !== 0) {
            return result * -1
        }

        return 0
    })

    //заполняем новой информацией
    result.all_client_visits.forEach( clientVisit => {
        tbodyHistoryClient.appendChild(createRowInHistoryTable(clientVisit))
    })

    spanName.textContent = result["client's_name"]
    spanSurname.textContent = result["client's_surname"]
    spanFatherName.textContent = result["father_name"]
    spanPhone.textContent = result["client's_phone"]
    spanEmail.textContent = result["client's_email"]
    spanSale.textContent = result["client's_sale"] + "%"
}

//прячет историю клиента и показывает календарь
const hideHistoryClient = async () => {
    historyClient.classList.add("hide")

    showCalendar()
}

document.querySelector(".back a").addEventListener("click", (e) => {
    e.preventDefault()
    hideHistoryClient()
})
