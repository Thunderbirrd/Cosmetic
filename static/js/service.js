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

(() => {
    const dateInput = document.getElementById("date-input")

    //отправка данных на сервер и запись на услугу
    document.querySelector("#service .approvebtn").addEventListener("click", async () => {
        const dateArr = String(dateInput.value).split('-')
        const date = [dateArr[2], dateArr[0], dateArr[1]].join('-')

        //Исправить id
        Urls.signUpForServices(selected.textContent, 
            `${date} ${document.querySelector(".btn.active").textContent}`)
    })
})();

const formatDate = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
};

//блокируем даты записи среду и воскресенье
(() => {
    let resultArr = []
    let currentDate = new Date()

    const finalDay = new Date()
    finalDay.setMonth(finalDay.getMonth() + 3)
    const finalDayMilliseconds = finalDay.getTime()

    while(currentDate.getTime() <= finalDayMilliseconds){
        if(currentDate.getDay() === 0 || currentDate.getDay() === 3){
            resultArr.push(formatDate(currentDate))
        }
        
        //увеличваем дату
        currentDate.setDate(currentDate.getDate() + 1)
    }

    $('#date-input').dateDropper({
        disabledDays: resultArr.join(","),
        lock: 'from',
        maxDate: formatDate(finalDay)
    });
})();

const dateedInput = document.getElementById("date-input")

dateedInput.onchange = function () {
    servicecontent.forEach(service => {
        if (service.date == dateedInput.value) {
            if ("09:30" == service.time) {
                console.log("succeed")
                // Надо добавлять класс occupied кнопке, value которой совпадает с service.time
                // buttom.forEach(knopka => {
                //     if (knopka.value == service.time) {
                //         knopka.classList.add("occupied")
                //         console.log("success")
                //     }
                // })
            }
        } else {
            console.log(dateedInput.value)
        }
    })
}



