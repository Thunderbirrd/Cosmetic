const popUpElements = document.querySelectorAll(".pop_up_element")

//добавляет анимацию всплытия элементов с кклассом "pop_up_element" при прокрутке страницы
const checkPopUpElements = () => {
    popUpElements.forEach(element => {
        if (!element.classList.contains("show_element") &&
            element.getBoundingClientRect().top - 100 <= document.documentElement.clientHeight) {

            element.classList.add("show_element")
        } 
    })
}