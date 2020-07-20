const body = document.querySelector("body")

const showMessage = (text) => {
    const p = document.createElement("p")
    p.classList.add("message")
    p.textContent = text

    body.appendChild(p)
    
    let top = document.documentElement.clientHeight / 2 - p.clientHeight / 2
    let left = document.documentElement.clientWidth / 2 - p.clientWidth / 2

    p.style.top = top + 'px'
    p.style.left = left + 'px'

    setTimeout(() => { body.removeChild(p) }, 4000)
}