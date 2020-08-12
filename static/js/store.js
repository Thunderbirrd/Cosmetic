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
        // line
        // image
        // quantity
        // is_active
        // discount 
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

    lines: [],

    categories: [],

    filter: {
        _name: "",

        get name() {
            return this._name
        },

        set name(value="") {
            this._name = value
            showProductByFilter(this.name, this.brand, this.line, this.category)
        },

        _brand: "",

        get brand() {
            return this._brand
        },

        set brand(value="") {
            this._brand = value
            showProductByFilter(this.name, this.brand, this.line, this.category)
        },

        _line: "",

        get line() {
            return this._line
        },

        set line(value="") {
            this._line = value
            showProductByFilter(this.name, this.brand, this.line, this.category)
        },

        _category: "",

        get category() {
            return this._category
        },

        set category(value="") {
            this._category = value
            showProductByFilter(this.name, this.brand, this.line, this.category)
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

arrayProducts.forEach(product => {
    //заполняем список брендов
    if (!store.brands.includes(product.brand)) {
        store.brands.push(product.brand)
    }

    //заполняем список линий
    if (!store.lines.includes(product.line)) {
        store.lines.push(product.line)
    }

    //заполняем список категорий
    if (!store.categories.includes(product.category)) {
        store.categories.push(product.category)
    }
})
