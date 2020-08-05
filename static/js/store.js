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
    //{
    // name
    // price
    // category
    // brand
    // image
    // quantity
    // is_active 
    // description
    //}
    get stateShop() {
        return arrayProducts
    },

    _stateCheckout: {},

    get stateCheckout() {
        return this._stateCheckout
    },

    set stateCheckout(value) {
        this._stateCheckout = value
    },

    brands: [],

    filter: {
        _name: "",

        get name() {
            return this._name
        },

        set name(value="") {
            this._name = value
            showProductByFilter(this._name, this._brand)
        },

        _brand: "",

        get brand() {
            return this._brand
        },

        set brand(value="") {
            this._brand = value
            showProductByFilter(this._name, this._brand)
        }
    },

    servicecontent: servicecontent,

    clearStateBasket() {
        this.stateBasket = []
    },

    setQuantityById(id, quantity){
        this.getProductById(id).quantity = quantity
        aboutProductOptions.maxNumber = quantity
    },

    getIdByTitle(title){
        return this.getProductByTitle(title).id
    },

    getProductByTitle(title){
        return this.stateShop.find(product => product.name === title)
    },

    getProductById(id){
        id = Number(id)
        return this.stateShop.find(product => product.id === id)
    },

    hasItemInBasket(title) {
        return this.stateBasket.findIndex(item => item.title === title) > -1
    },

    changeCountBasket(title, count) {
        this.stateBasket.find(item => item.title === title).count = count
    },

    deleteProductFromBasket(title) {
        let index = this.stateBasket.findIndex(item => item.title === title)
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

//заполняем список брендов
arrayProducts.forEach(product => {
    if (!store.brands.includes(product.brand)) {
        store.brands.push(product.brand)
    }
})