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

    get CENTER() {
        return "CENTER"
    },

    get BOTTOM_RIGHT() {
        return "BOTTOM_RIGHT"
    },

    showMessage(text, status=this.SUCCESS, time=4000, position=message.BOTTOM_RIGHT) {
        const p = document.createElement("p")
        p.classList.add("message")
        p.textContent = text

        if (status === this.SUCCESS) {
            p.classList.add("success")
        } else if (status === this.WARNING) {
            p.classList.add("warning")
        } else if (status === this.ERROR) {
            p.classList.add("error")
        }

        body.appendChild(p)

        if (position === message.CENTER) {
            let top = document.documentElement.clientHeight / 2 - p.clientHeight / 2
            let left = document.documentElement.clientWidth / 2 - p.clientWidth / 2

            p.style.top = top + 'px'
            p.style.left = left + 'px'
            
        } else if (position === message.BOTTOM_RIGHT) {
            p.style.bottom = 0 + 'px'
            p.style.right = 0 + 'px'
        }

        setTimeout(() => { 
            $(p).fadeOut(400)
            setTimeout(() => {
                body.removeChild(p)
            }, 400)
        }, time)
    }
}