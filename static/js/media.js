var items = document.querySelector(".line");
var media = document.querySelector(".content");

    items.addEventListener("mouseenter", function () {
        media.classList.add("show");
    });

    items.addEventListener("click", function () {
        media.classList.remove("show");
    });