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
    },

    async deleteVisit(visitId){
        let result= await fetch(`/admin_app/visit/delete/${visitId}/`)
    },

    async changeStatusToPay(visitId){
        let result= await fetch(`/admin_app/visit/change/${visitId}/`)
    },

    async createVisit(name, surname, phone, date, time, service){
        // data = { 
        //     "name": имя клиента, 
        //     "surname": фамилия клиента, 
        //     "phone": номер телефона клиента, 
        //     "date": дата, 
        //     "time": время, 
        //     "service": услуга, 
        // }
        let responce = await fetch('/admin_app/visit/create/', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': CRF_TOKEN + ""
            },
            body: `${JSON.stringify({
                name, surname, phone, date, time, service
            })}`
        })

        console.log(await responce.text())
    }
}