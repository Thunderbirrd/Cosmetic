const Urls = {
    goToUrl(url){
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
        let responce = await fetch("/form_basket/", {
            method: "Post",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })

        store.stateCheckout = await responce.json()
    },
    async buyProducts(id, address, phone, name, surname, order_type) {
        let responce = await fetch("/form_basket/form_order/", {
            method: "Post",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id,
                list: {address, phone, name, surname, order_type}
            })
        })

        return await responce.json()
    },
    async signUpForServices(user_id, service_name, date) {
        const data = JSON.stringify({
            user_id,
            service_name,
            date 
        })

        console.log(data);

        const response = await fetch("/form_service/", {
            method: "Post",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': CRF_TOKEN + ""
            },
            body: data
        })
        
        const result = await response.text()
        console.log(result)
        return result
    }
}