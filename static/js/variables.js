//файл для хранения глобальных переменных

//сделать действие при переходе на новый url
const DO_ACTION = 'DO_ACTION'

//переход на новый url
const FORWARD = 'FORWARD'

//не совершать никаких действий при переходе на новый url
const NOT_DO_POPSTATE = 'NOT_DO_POPSTATE'

//макимальная ширина для мобильного устройства
const WIDTH_MOBILE_SCREEN = 400

//проверка на то что сейчас размер экрана мобильного устройства
const isWidthMobileScreen = () => window.innerWidth <= WIDTH_MOBILE_SCREEN

//ширина маленьких экранов
const WIDTH_SMALL_SCREEN = 1100

//проверка на то что сейчас размер маленький экрана 
const isWidthSmallScreen = () => window.innerWidth <= WIDTH_SMALL_SCREEN

//статическая папка
const STATIC = "/static/"

const articles = document.querySelector(".articles")
const contacts = document.querySelector("#footer_site")
const service = document.getElementById("service")

//карточки товаров в магазине
const shopCard = document.querySelectorAll("main .shop .card")