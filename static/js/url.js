const Urls = {
    goToUrl(url) {
        window.history.replaceState({
            type: FORWARD,
            newPath: url
        }, '')

        window.history.pushState({
            type: DO_ACTION
        }, '', url)

        window.history.back()
    },
    async checkout(data) {
        try {
            let responce = await fetch("/form_basket/", {
                method: "Post",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })

            if (!responce.ok) throw Error(`Ошибка ${responce.status}`)

            return await responce.json()
        } catch (error) {
            console.error(error)
        }

        return null
    },
    async buyProducts(id, address, phone, name, surname, order_type) {
        let responce = await fetch("/form_basket/form_order/", {
            method: "Post",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id,
                list: { address, phone, name, surname, order_type }
            })
        })

        return await responce.json()
    },
    async signUpForServices(service_name, date) {
        const data = JSON.stringify({
            service_name,
            date
        })

        console.log(data);

        try {
            const response = await fetch("/form_service/", {
                method: "Post",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-CSRFToken': CRF_TOKEN + ""
                },
                body: data
            })

            if (!response.ok) throw Error(`Ошибка ${response.status}`)

            let result = await response.text()

            console.log(result)

            if (result === 'Success') {
                message.showMessage("Вы успешно записались на услугу", message.SUCCESS, 4000, message.CENTER)
                return;
            }

            document.documentElement.innerHTML = result
            window.history.pushState({}, '', "/auth/login/")
        } catch (e) {
            console.error(e)
        }
    },
    async refreshServiceContent(date) {
        let responce = await fetch("/refresh/", {
            method: "Post",
            headers: {
                'Content-type': 'application/json;charset=utf-8',
                'X-CSRFToken': CRF_TOKEN + ""
            },
            body: JSON.stringify({
                date
            })
        })

        return await responce.json()
    },
    async getArticlesContents() {
        let responce = await fetch('/articles/', {
            method: "Get",
            headers: {
                'X-CSRFToken': CRF_TOKEN + ""
            }
        })
        
        let result = await responce.json()

        console.log(result)

        return result
    },
    async getArticle(id) {
        let responce = await fetch(`/articles/${id}/`, {
            method: "Get",
            headers: {
                'X-CSRFToken': CRF_TOKEN + ""
            }
        })

        let result = await responce.json()

        console.log(result)

        return result
    }
}