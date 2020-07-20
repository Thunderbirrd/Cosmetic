const selected = document.querySelector(".selected");
const options_container = document.querySelector(".options_container");
const optionslist = document.querySelectorAll(".option");
const buttom = document.querySelectorAll(".btn");
const buttons = document.querySelectorAll(".active");

selected.addEventListener("click", () => {
    options_container.classList.toggle("active");
});

optionslist.forEach(o => {
    o.addEventListener("click", () => {
        selected.innerHTML = o.querySelector("label").innerHTML;
        options_container.classList.remove("active");
    });
});

buttom.forEach(item => {
    item.addEventListener("click", () => {
        buttons.classList.remove("active");
        item.classList.add("active");
    });
});



// buttom.addEventListener("click", () => {
//     buttom.classList.add("active")});