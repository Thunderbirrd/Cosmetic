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
    const dataInput = document.getElementById("date-input")

    //отправка данных на сервер и запись на услугу
    document.querySelector("#service .approvebtn").addEventListener("click", async () => {
        console.log(JSON.stringify({
            user_id: 21,
            service_id: selected.textContent,
            date: `${dataInput.value} ${document.querySelector(".btn.active").textContent}` 
        }));

        let response = await fetch("/form_service/", {
            method: "Post",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': CRF_TOKEN + ""
            },
            body: JSON.stringify({
                user_id: 21,
                service_id: selected.textContent,
                date: `${dataInput.value} ${document.querySelector(".btn.active").textContent}` 
            })
        })
    
        alert(await response.text())
    })
})()
