const formatDateToDateDroper = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
};

(async () => {
    let disabledDays = await blockDate(formatDateToDateDroper);
    let maxDate = await getFinalDay(formatDateToDateDroper);
    
    $('#visit-input').dateDropper({
        disabledDays: disabledDays,
        lock: 'from',
        maxDate
    });
    
    $('#date_visit_client').dateDropper({
        disabledDays,
        lock: 'from',
        maxDate
    });
})();

let date_visit_client = document.getElementById("date_visit_client")

date_visit_client.onchange = async () => {
    await blockedOptionsByInputDate()
}

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

const tdButtons = document.querySelectorAll(".buttons")

//удаляет запись
const deleteVisit = async (visitId) => {
    await Urls.deleteVisit(visitId)
    await blockedOptionsByInputDate()

    const tr = document.querySelector(`[data-id='${visitId}']`)

    const card = tr.querySelector(`.card`)

    card.classList.add("empty")
    card.classList.remove("not_paid")
    card.classList.remove("paid")
    card.innerHTML = ""

    tr.querySelector(".buttons").classList.add("hide")
}

//делает статус оплаченным
const changeStatusToPay = async (visitId) => {
    await Urls.changeStatusToPay(visitId)

    const tr = document.querySelector(`[data-id='${visitId}']`)

    const card = tr.querySelector(`.card`)
    card.classList.remove("not_paid")
    card.classList.add("paid")
}

//заполняет таблицу
const fillTable = async (date) => {
    let data = await Urls.getVisits(date)

    divCards.forEach(card => {
        card.classList.add("empty")
        card.classList.remove("not_paid")
        card.classList.remove("paid")
        
        //очищаем
        card.innerHTML = ""
        card.onclick = () => {}
    })

    tdButtons.forEach(td => {
        td.classList.add("hide")
    })

    data.forEach(item => {
        //example
        // item = { 
        //     time: "09:30", 
        //     first_name: "Vadim", 
        //     last_name: "Pogodin", 
        //     phone: "89150858651", 
        //     service_name: "Чистка лица",
        //     status: "NO",
        //     visit_id: 741
        //}

        const tr = document.querySelector(`[data-time='${item.time}']`)
        tr.dataset.id = item.visit_id

        tr.querySelector(".buttons").classList.remove("hide")

        const buttonStatusPaid = tr.querySelector(".status_paid");
        buttonStatusPaid.addEventListener("click", async () => {
            buttonStatusPaid.setAttribute("disabled", "disabled")
            await changeStatusToPay(item.visit_id)
            buttonStatusPaid.remove("disabled")
        })
    
        const buttonDelete = tr.querySelector(".delete");
        buttonDelete.addEventListener("click", async () => {
            buttonDelete.setAttribute("disabled", "disabled")
            await deleteVisit(item.visit_id)
            buttonDelete.remove("disabled")
        })

        const card = tr.querySelector(`.card`)
        card.classList.remove("empty")
        card.onclick = () => {
            showHistoryClient(item.visit_id)
        }

        if (item.status === "NO") {
            card.classList.add("not_paid")
        } else if (item.status === "PAY") {
            buttonStatusPaid.classList.add("hide")
            card.classList.add("paid")
        }

        const pName = document.createElement("p")
        pName.classList.add("name")
        pName.textContent = item.first_name
        card.appendChild(pName)

        const pSurname = document.createElement("p")
        pSurname.classList.add("surname")
        pSurname.textContent = item.last_name
        card.appendChild(pSurname)

        const pFatherName = document.createElement("p")
        pFatherName.classList.add("father_name")
        pFatherName.textContent = item.father_name
        card.appendChild(pFatherName)

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

//устанавливает время vistInput
const setDateVistInput = async (objDdate=new Date()) => {
    const date = formatDate(objDdate)
    vistInput.value = date
    labelCalendar.textContent = formatDateToLabelFromCalendar(date)
    await fillTable(formatDateToBDFromCalendar(date))
}

//устанавливает время date_visit_client
const setDateCreateVisitInput = async (objDdate=new Date()) => {
    const date = formatDate(objDdate)
    date_visit_client.value = date

    await blockedOptionsByInputDate()
}

const createVisitButton = document.querySelector(".create_visit form button");
//создаём запись
document.querySelector(".create_visit form").onsubmit = async (e) => {
    createVisitButton.setAttribute("disabled", "disabled")

    e.preventDefault()
    let {name, surname, father_name, phone, date, time, service} = e.target.elements
    await Urls.createVisit(name.value, surname.value, father_name.value, phone.value, 
        formatDateToBDFromCalendar(date.value), time.options[time.selectedIndex].value, service.value)

    if (date.value === vistInput.value) {
        await fillTable(formatDateToBDFromCalendar(date.value))
    }

    await blockedOptionsByInputDate()

    createVisitButton.removeAttribute("disabled")
}

vistInput.onchange = () => {
    labelCalendar.textContent = formatDateToLabelFromCalendar(vistInput.value)
    fillTable(formatDateToBDFromCalendar(vistInput.value))
}

window.onload = async () => {
    const tableElement = document.querySelector(".calendar table")
    tableElement.classList.add("hide")

    await setDateVistInput()
    setDateCreateVisitInput()
    
    tableElement.classList.remove("hide")
}

const calendar = document.querySelector(".сalendar")

//прячет calendar
const hideCalendar = () => {
    calendar.classList.add("hide")
}

//показывает calendar
const showCalendar = () => {
    calendar.classList.remove("hide")
}

//заполняем список услуги
(async () => {
    let selects = document.querySelector(".create_visit select[name='service']");

    (await Urls.getListServices()).forEach(service => {
        let option = document.createElement("option");

        option.value = service;
        option.textContent = service;

        selects.appendChild(option);
    });
})();

const selectTime = document.querySelector(".create_visit select[name='time']")
const timeOptions = selectTime.querySelectorAll("option")
const spanIsAllOtionsHide = document.querySelector(".create_visit .is_all_otions_hide")

//блокирует option времени в создании записи
const blockedOptions = (times) => {

    timeOptions.forEach(option => { 
        option.classList.remove("hide") 
        option.removeAttribute("selected")
    })

    timeOptions.forEach(option => {        
        times.forEach(time => {
            if (option.value === time)
                option.classList.add("hide")
        })
    })

    let isAllOtionsHide = true

    for (const option of timeOptions) {
        if (!option.classList.contains("hide")) {
            option.setAttribute("selected", true)
            isAllOtionsHide = false
            break;
        }
    }

    if (isAllOtionsHide) {
        selectTime.classList.add("hide")
        spanIsAllOtionsHide.classList.remove("hide")
    } else {
        selectTime.classList.remove("hide")
        spanIsAllOtionsHide.classList.add("hide")
    }
}

const blockedOptionsByInputDate = async () => {
    blockedOptions(await Urls.getBlockedTimeByDate(formatDateToBDFromCalendar(date_visit_client.value)))
}
