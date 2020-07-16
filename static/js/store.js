//хранилище 

const store = {
    //хранилище корзины покупок
    //{
    //     src: 
    //     title: 
    //     count: 
    //     price: 
    // }
    stateBasket: [],

    //хранилище списка магазина
    stateShop: [],

    hasItemInBasket(title) {
        return this.stateBasket.findIndex(item => item.title === title) > -1
    },

    changeCountBasket(title, count) {
        this.stateBasket.find(item => item.title === title).count = count
    },

    deleteProductFromBasket(title) {
        let index = this.stateBasket.findIndex( item => item.title === title )
        this.stateBasket.splice(index, 1)
    },

    getAmountBasket() {
        let amount = 0

        this.stateBasket.forEach(item => {
            amount += item.price * item.count
        })

        return amount
    }
}