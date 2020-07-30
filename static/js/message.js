const body = document.querySelector("body")

const message = {
    get SUCCESS() { 
        return "SUCCESS" 
    },

    get WARNING() { 
        return "WARNING" 
    },

    get ERROR() { 
        return "ERROR" 
    },

    showMessage(text, status=this.SUCCESS, time=3000) {
        const p = document.createElement("p")
        p.classList.add("message")
        p.textContent = text

        if (status === this.SUCCESS) {
            p.classList.add("succes")
        } else if (status === this.WARNING) {
            p.classList.add("warning")
        } else if (status === this.ERROR) {
            p.classList.add("error")
        }

        body.appendChild(p)

        let top = document.documentElement.clientHeight / 2 - p.clientHeight / 2
        let left = document.documentElement.clientWidth / 2 - p.clientWidth / 2

        p.style.top = top + 'px'
        p.style.left = left + 'px'

        setTimeout(() => { 
            $(p).fadeOut(400)
            setTimeout(() => {
                body.removeChild(p)
            }, 400)
        }, time)
    }
}