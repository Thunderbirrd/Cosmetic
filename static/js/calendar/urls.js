const Urls = {
    //admin_app/visits/
    async getVisits(date){
        try {
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
    
            return result
        } catch (error) {
            console.log(error)
        }        
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
    },

    async getAllVisitsByVisitId(visitId) {
        let responce = await fetch(`/admin_app/visit/${visitId}/`, {
            method: "Get",
            headers: {
                'X-CSRFToken': CRF_TOKEN + ""
            }
        })

        return await responce.json()
    },

    async getListServices() {
        let responce = await fetch(`/admin_app/visits/get_services/`)

        return await responce.json()
    },
    
    async getBlockedTimeByDate(date) {
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
    }
}