const selected = document.querySelector(".selected");
const options_container = document.querySelector(".options_container");
const optionslist = document.querySelectorAll(".option");
const buttom = document.querySelectorAll(".btn");
const currservice = document.getElementsByClassName("radio");
const currdate = document.getElementById("date-input");
const currtime = document.getElementsByClassName("btn");

selected.addEventListener("click", () => {
    options_container.classList.toggle("active");
});

const hideOptionsContainer = () => {
    options_container.classList.remove("active");
}

/////// Service type   //////
optionslist.forEach(o => {
    o.addEventListener("click", () => {
        let label = o.querySelector("label")
        selected.innerHTML = label.innerHTML;
        selected.dataset.name = label.dataset.name
        selected.dataset.price = label.dataset.price
        hideOptionsContainer()
    });
});


//////////// Time selector /////////////////////

buttom.forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".active").forEach(b => {
            b.classList
                .remove("active")
        });
        item.classList.add("active");
    });
});

const formatDate = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
};

(async () => {
    let disabledDays = await blockDate(formatDate);
    let maxDate = await getFinalDay(formatDate);

    $('#date-input').dateDropper({
        disabledDays,
        lock: 'from',
        maxDate
    });
})()

const dateedInput = document.getElementById("date-input")

//из Y.m.d в d.m.Y
const changeFromYMDToDMY = (date) => date.split("-").reverse().join("-")

const divbusyAllTime = document.querySelector("#service .busy_all_time")

//проверяет время
const checkTimeButtons = () => {
    let isAllTimeBusy = true
    // Надо добавлять класс occupied кнопке, value которой совпадает с service.time
    buttom.forEach(knopka => {
        if (store.servicecontent === null || store.servicecontent.findIndex(time => time === knopka.textContent) >= 0) {
            knopka.classList.add("occupied")
        } else {
            isAllTimeBusy = false
            knopka.classList.remove("occupied")
        }
    })

    if (isAllTimeBusy) {
        divbusyAllTime.classList.remove("hide")
    } else {
        divbusyAllTime.classList.add("hide")
    }
}

const formatDateToDMY = (date) => {
    let day = date.getDate()
    day = day < 10 ?`0${day}` :`${day}`

    let month = date.getMonth() + 1
    month = month < 10 ?`0${month}` :`${month}`

    return `${day}-${month}-${date.getFullYear()}`
}

dateedInput.value = formatDateToDMY(new Date())
checkTimeButtons();

(() => {
    const dateInput = document.getElementById("date-input")

    const approvebtn = document.querySelector("#service .approvebtn")

    //отправка данных на сервер и запись на услугу
    approvebtn.addEventListener("click", async () => {
        if (document.querySelector(".btn.active") === null || selected.dataset.name === undefined) {
            message.showMessage("Вы указали не все поля для записи на услугу", message.WARNING, 2000)
            return false;
        }

        approvebtn.setAttribute("disabled", "disabled")

        const dateArr = String(dateInput.value).split('-')
        const date = [dateArr[2], dateArr[1], dateArr[0]].join('-')
        const time = document.querySelector(".btn.active").textContent

        store.servicecontent.push(time)

        checkTimeButtons()

        let result = await Urls.signUpForServices(selected.dataset.name, `${date} ${time}`)

        if (result === 'Success') {
            message.showMessage("Вы успешно оставаили заявку на запись на услугу.\nВыполните условия, указанные в инструкции",
                    message.SUCCESS, 4000, message.CENTER)

            //store.servicecontent = await Urls.refreshServiceContent(date)
    
            checkTimeButtons()

            showInstruction(selected.dataset.price)
        } else if (result !== Urls.ERROR){
            document.documentElement.innerHTML = result
            window.history.pushState({}, '', "/auth/login/")
        }

        approvebtn.removeAttribute("disabled")
    });

    dateedInput.onchange = async () => {
        const dateArr = String(dateInput.value).split('-')
        const date = [dateArr[2], dateArr[1], dateArr[0]].join('-')
    
        store.servicecontent = await Urls.refreshServiceContent(date)
        checkTimeButtons()
    }
})();

const elementInstruction = document.querySelector("#service .instruction")
const pInstruction = elementInstruction.querySelector("p")

//заполняет инструкцию
const showInstruction = (price) => {
    pInstruction.innerText = `Инструкция: Запись на процедуру строго по
        задатку от 50% от стоимости процедуры. Стоимость выбранной вами
        процедуры: ${price} рублей. 
        В случае отмены записи с вашей стороны задаток не возвращается. 
        Переносов записи нет. Если согласны с нашими условиями, ждём задаток 
        в размере ${price / 2} рублей на номер 89841027756(Сбербанк онлайн), получатель 
        Виктория Валентиновна К. После оплаты скриншот чека и своё ПОЛНОЕ 
        ФИО (например, Иванов Иван Иванович) отправьте на ранее указанный 
        номер в WhatsApp. Большое спасибо за запись!`.replace(/\n/g, " ")
    elementInstruction.classList.remove("hide")
}
