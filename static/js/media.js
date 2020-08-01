var items = document.querySelector(".line");
var media = document.querySelector(".content");
var attention = document.querySelector(".text");

items.addEventListener("mouseenter", function () {
    media.classList.add("show");
});

items.addEventListener("click", function () {
    media.classList.toggle("show");
});

items.addEventListener("mouseenter", function () {
    attention.classList.add("hidden");
});

items.addEventListener("click", function () {
    attention.classList.toggle("hidden");
});

const showMedia = () => {
    media.classList.add("show");
    attention.classList.add("hidden");
}