//хранилище 

const store = {
    //хранилище корзины покупок
    //{
    //     id,
    //     type,
    //     src,
    //     title, 
    //     count, 
    //     price, 
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
        // newPrice
        // discount 
        // description
    //}
    get stateShop() {
        return arrShop
    },

    _stateCheckout: {},

    get stateCheckout() {
        return this._stateCheckout
    },

    set stateCheckout(value) {
        this._stateCheckout = value
    },

    //brands
    //[
    //    {
    //          brand: бренд,
    //          lines: [ линия, линия]
    //    }
    //]
    brands: [],

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

            if (value !== "" && !store.brands.find(b => b.brand === value).lines.some(line => line === this._line)) {

                this._line = ""
            }

            showProductByFilter(this.name, this.brand, this.line, this.category)
        },

        _line: "",

        get line() {
            return this._line
        },

        set line(value="") {
            this._line = value

            let brand = store.brands.find(brand => brand.lines.some(line => line === value))

            if (brand !== undefined) {
                this._brand = brand.brand
            }

            showProductByFilter(this.name, this.brand, this.line, this.category)
        },

        _category: "",

        get category() {
            return this._category
        },

        set category(value="") {
            this._category = value
            showProductByFilter(this.name, this.brand, this.line, this.category)
        },

        resetAllFilter() {
            this._line = ""
            this._brand = ""
            this._category = ""

            showProductByFilter(this.name, this.brand, this.line, this.category)
        }
    },

    servicecontent: servicecontent,

    clearStateBasket() {
        this.stateBasket = []
    },

    setQuantityById(id, type, quantity){
        this.getProductByIdAndType(id, type).quantity = quantity
        aboutProductOptions.maxNumber = quantity
    },

    getIdByTitle(title){
        return this.getProductByTitle(title).id
    },

    getProductByTitle(title){
        return this.stateShop.find(product => product.name === title)
    },

    getProductByIdAndType(id, type){
        return this.stateShop.find(product => product.id == id && product.type == type)
    },

    hasItemInBasket(title) {
        return this.stateBasket.findIndex(item => item.title === title) > -1
    },

    changeCountBasket(id, type, count) {
        this.stateBasket.find(item => item.id == id || item.type == type).count = count
    },

    getCountBasket(title) {
        return Number(this.stateBasket.find(item => item.title === title).count)
    },

    deleteProductFromBasket(id, type) {
        let index = this.stateBasket.findIndex(item => item.id == id && item.type == type)
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
    if (product.category === "Сертификаты") return;

    //заполняем список брендов и линий
    const indexBrand = store.brands.findIndex(b => b.brand === product.brand)
    if (indexBrand < 0) {
        store.brands.push({
            brand: product.brand,
            lines: [product.line]
        })
    } else if (!store.brands[indexBrand].lines.includes(product.line)) {
        store.brands[indexBrand].lines.push(product.line)
    }    

    //заполняем список категорий
    if (!store.categories.includes(product.category)) {
        store.categories.push(product.category)
    }
})

store.categories.push("Сертификаты")
store.categories.push("Подборка")
