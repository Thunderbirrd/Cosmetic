$('#visit-input').dateDropper({
    });

const vistInput = document.getElementById("visit-input")
const labelCalendar = document.querySelector(".input_calendar")

//приводит объект класса Date к строке вида mm-dd-yyyy
const formatDate = (date) => {
    let month = date.getMonth() + 1 
    month = month < 10 ?`0${month}` :`${month}`

    let day = date.getDate()
    day = day < 10 ?`0${day}` :`${day}`

    return `${day}-${month}-${date.getFullYear()}`
};

//приводит формат времени календаря к формату в котором хранится в базе данных
const formatDateToBDFromCalendar = (date) => {
    let arrDate = date.split("-")
    return [arrDate[2], arrDate[1], arrDate[0]].join("-")
}

//приводит формат времени календаря к формату label
const formatDateToLabelFromCalendar = (date) => {
    return date.split("-").join(".")
}

const divCards = document.querySelectorAll(".card")


//заполняет таблицу
const fillTable = async (date) => {
    let data = await Urls.getVisits(date)

    divCards.forEach(card => {
        card.classList.add("empty")
        
        //очищаем
        card.innerHTML = ""
    })

    data.forEach(item => {
        //example
        // item = { 
        //     time: "09:30", 
        //     first_name: "Vadim", 
        //     last_name: "Pogodin", 
        //     phone: "89150858651", 
        //     service_name: "Чистка лица"
        //}

        const card = document.querySelector(`.card[data-time='${item.time}']`)
        card.classList.remove("empty")

        const pName = document.createElement("p")
        pName.classList.add("name")
        pName.textContent = item.first_name
        card.appendChild(pName)

        const pSurname = document.createElement("p")
        pSurname.classList.add("surname")
        pSurname.textContent = item.last_name
        card.appendChild(pSurname)

        const pServie = document.createElement("p")
        pServie.classList.add("service")
        pServie.textContent = item.phone
        card.appendChild(pServie)

        const pPhone = document.createElement("p")
        pPhone.classList.add("phone")
        pPhone.textContent = item.service_name
        card.appendChild(pPhone)
    })
}

vistInput.onchange = () => {
    labelCalendar.textContent = formatDateToLabelFromCalendar(vistInput.value)
    fillTable(formatDateToBDFromCalendar(vistInput.value))
}

window.onload = () => {
    const date = formatDate(new Date())
    vistInput.value = date
    labelCalendar.textContent = formatDateToLabelFromCalendar(date)
    fillTable(formatDateToBDFromCalendar(date))
}