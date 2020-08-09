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
        selected.innerHTML = o.querySelector("label").innerHTML;
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

$('#date-input').dateDropper({
    disabledDays: blockDate(formatDate),
    lock: 'from',
    maxDate: getFinalDay(formatDate)
});

const dateedInput = document.getElementById("date-input")

//из Y.m.d в d.m.Y
const changeFromYMDToDMY = (date) => date.split("-").reverse().join("-")

//проверяет время
const checkTimeButtons = () => {
    // Надо добавлять класс occupied кнопке, value которой совпадает с service.time
    buttom.forEach(knopka => {
        if (store.servicecontent.findIndex(time => time === knopka.textContent) >= 0) {
            knopka.classList.add("occupied")
        } else {
            knopka.classList.remove("occupied")
        }
    })
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

    //отправка данных на сервер и запись на услугу
    document.querySelector("#service .approvebtn").addEventListener("click", async () => {
        const dateArr = String(dateInput.value).split('-')
        const date = [dateArr[2], dateArr[1], dateArr[0]].join('-')
        const time = document.querySelector(".btn.active").textContent

        store.servicecontent.push(time)

        checkTimeButtons()

        await Urls.signUpForServices(selected.textContent, `${date} ${time}`)

        store.servicecontent = await Urls.refreshServiceContent(date)

        checkTimeButtons()
    });

    dateedInput.onchange = async () => {
        const dateArr = String(dateInput.value).split('-')
        const date = [dateArr[2], dateArr[1], dateArr[0]].join('-')
    
        store.servicecontent = await Urls.refreshServiceContent(date)
        checkTimeButtons()
    }
})();
