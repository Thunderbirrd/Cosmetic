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

        let result = await responce.json()

        console.log(result)
    }
}