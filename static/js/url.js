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

            store.stateCheckout = await responce.json()
        } catch (error) {
            console.error(error)
        }
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
                showMessage(result)
                return;
            }

            document.documentElement.innerHTML = result
            window.history.pushState({}, '', "/auth/login/")
        } catch (e) {
            console.error(e)
        }
    }
}