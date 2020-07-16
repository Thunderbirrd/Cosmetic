//для шаблонов без функций
(() => {

})

document.querySelectorAll(".number_input").forEach(div => {
    const input = div.querySelector("input")
    const buttonMinus = div.querySelector(".minus")
    const buttonPlus = div.querySelector(".plus")

    buttonMinus.addEventListener("click", (event) => {
        if (Number(input.value) === 1) return;

        input.value--
    })

    input.onkeypress = (event) => {
        const data = String.fromCharCode(event.charCode)

        if (data < "0" || data > "9") event.preventDefault();
    }

    buttonPlus.addEventListener("click", (event) => {
        if (Number(input.value) === 99) return;

        input.value++
    })
})

//создаёт number_input
const createNumberInput = (defaultValue="", maxLength="", minLength="", size="",
    keypressHandler = (event, inputValue, parentElement) => {}, 
    inputHandler = (event, inputValue, parentElement) => {}, 
    clickButtonMinusHandler = (event, inputValue, parentElement) => {}, 
    clickButtonPlusHandler = (event, inputValue, parentElement) => {}) => {

    const div = document.createElement("div")
    div.classList.add("number_input")
    
    const input = document.createElement("input")
    input.type = "text"
    input.size = size
    input.maxLength = maxLength
    input.minLength = minLength
    input.value = defaultValue
    input.onkeypress = (event) => {
        const data = String.fromCharCode(event.charCode)

        if (data < "0" || data > "9") event.preventDefault();

        keypressHandler(event, input.value, div)
    }
    input.oninput = (event) => {
        inputHandler(event, input.value, div)
    }

    const buttonMinus = document.createElement("button")
    buttonMinus.classList.add("minus")
    buttonMinus.textContent = "-"
    buttonMinus.addEventListener("click", (event) => {
        if (Number(input.value) === 1) return;

        input.value--

        clickButtonMinusHandler(event, input.value, div)
    })

    const buttonPlus = document.createElement("button")
    buttonPlus.classList.add("plus")
    buttonPlus.textContent = "+"
    buttonPlus.addEventListener("click", (event) => {
        if (Number(input.value) === 99) return;

        input.value++

        clickButtonPlusHandler(event, input.value, div)
    })

    div.appendChild(buttonMinus)
    div.appendChild(input)
    div.appendChild(buttonPlus)

    return div 
}