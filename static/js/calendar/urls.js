const Urls = {
    //admin_app/visits/
    async getVisits(date){
        let responce = await fetch("/admin_app/visits/", {
            method: "Post",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                date
            })
        })

        let result = await responce.json()

        console.log(date, result)

        return result
    }
}