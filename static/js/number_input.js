//для шаблонов без функций

document.querySelectorAll(".number_input").forEach(div => {
    const input = div.querySelector("input")
    const buttonMinus = div.querySelector(".minus")
    const buttonPlus = div.querySelector(".plus")

    buttonMinus.addEventListener("click", (event) => {
        if (Number(input.value) <= 1) {
            input.value = 1
            return;
        }

        input.value--
    })

    input.onkeypress = (event) => {
        const data = String.fromCharCode(event.charCode)

        if (data < "0" || data > "9") event.preventDefault();
    }

    input.oninput = () => {
        if (input.value !== "" && Number(input.value) === 0) input.value = 1
    }

    input.onchange = () => {
        if (Number(input.value) === 0) input.value = 1
    }

    buttonPlus.addEventListener("click", (event) => {
        if (Number(input.value) >= 99) {
            input.value = 99
            return;
        }

        input.value++
    })
})

//создаёт number_input
const createNumberInput = ({defaultValue="", maxLength="", minLength="", size="", className="",
    classNameInput="",
    keypressHandler = (event, inputValue, parentElement) => {}, 
    inputHandler = (event, inputValue, parentElement) => {}, 
    clickButtonMinusHandler = (event, inputValue, parentElement) => {}, 
    clickButtonPlusHandler = (event, inputValue, parentElement) => {}, options={maxNumber:99, minNumber:1}}) => {

    const div = document.createElement("div")
    div.className = className
    div.classList.add("number_input")
    
    const input = document.createElement("input")
    input.className = classNameInput
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
        const maxNumber = Math.min(99, options.maxNumber)

        if (Number(input.value) >= maxNumber) {
            input.value = maxNumber
            input.classList.add("show_message")
        } else {
            input.classList.remove("show_message")
        }

        inputHandler(event, input.value, div)
    }
    input.onchange = () => {
        const minNumber = Math.max(1, options.minNumber)

        if (Number(input.value) <= minNumber) {
            input.value = minNumber
        }
    }

    const buttonMinus = document.createElement("button")
    buttonMinus.classList.add("minus")
    buttonMinus.textContent = "–"
    buttonMinus.addEventListener("click", (event) => {
        const minNumber = Math.max(1, options.minNumber)

        if (Number(input.value) <= minNumber) {
            input.value = minNumber
            return;
        }

        input.value--

        clickButtonMinusHandler(event, input.value, div)
    })

    const buttonPlus = document.createElement("button")
    buttonPlus.classList.add("plus")
    buttonPlus.textContent = "+"
    buttonPlus.dataset.title = "Данного товара на складе очень мало"
    buttonPlus.addEventListener("click", (event) => {
        const maxNumber = Math.min(99, options.maxNumber)

        if (Number(input.value) >= maxNumber) {
            input.value = maxNumber
            return;
        }

        input.value++

        clickButtonPlusHandler(event, input.value, div)
    })

    div.appendChild(buttonMinus)
    div.appendChild(input)
    div.appendChild(buttonPlus)

    return div 
}