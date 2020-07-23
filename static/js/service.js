const selected = document.querySelector(".selected");
const options_container = document.querySelector(".options_container");
const optionslist = document.querySelectorAll(".option");
const buttom = document.querySelectorAll(".btn");

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
        const dateArr = String(dateInput.value).split('/')
        const date = [dateArr[2], dateArr[0], dateArr[1]].join('-')

        Urls.signUpForServices(21, selected.textContent, 
            `${date} ${document.querySelector(".btn.active").textContent}`)
    })
})()
