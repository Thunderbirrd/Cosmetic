from telegram import Bot
from Cosmetic.apps.mainapp.models import ForBot

bot_info = ForBot.objects.first()
chatID = bot_info.chat_id
token = bot_info.token


class DataOrder:
    phone = ""
    order_type = ""
    name = ""
    surname = ""
    price = 0
    items = {}
    address = ""
    id = 0

    def __init__(self, phone, order_type, name, surname, price, items, address, id):
        self.phone = phone
        self.order_type = order_type
        self.name = name
        self.surname = surname
        self.price = price
        self.items = items
        self.address = address
        self.id = id


class DataService:
    date = ""
    time = ""
    client_name = ""
    client_surname = ""
    client_last_name = ""
    client_phone = ""
    service_name = ""

    def __init__(self, date, time, name, surname, last_name, service_name, phone):
        self.date = date
        self.time = time
        self.client_name = name
        self.client_surname = surname
        self.client_last_name = last_name
        self.service_name = service_name
        self.client_phone = phone


def do_echo_order(bot: Bot, data):
    text = ''
    address = ''
    first = True
    for name in data.items:
        if not first:
            text += ','
        else:
            first = False
        text += ' ' + name + ' - ' + str(data.items[name])
    if data.order_type != 'SAM':
        address = f"Адрес доставки: {data.address}.\n"
    bot.send_message(
        chat_id=chatID,
        text=f"Оформлен новый заказ!\n"
             f"Номер заказа: {data.id}\n"
             f"Номер клиента: 8{data.phone}\n"
             f"Тип заказа: {data.order_type}\n"
             f"Имя и фамилиия клиента: {data.name} {data.surname}\n"
             + address +
             f"Сумма заказа: {data.price} р.\n"
             f"Список товаров: {text}."
    )


def do_echo_service(bot: Bot, data: DataService):
    bot.send_message(
        chat_id=chatID,
        text=f"Клиент хочет записаться на услугу!\n"
             f"ФИО клиента: {data.client_surname} {data.client_name} {data.client_last_name}\n"
             f"Телефон клиента: {data.client_phone}\n"
             f"Услуга: {data.service_name}\n"
             f"Дата и время записи: {data.date} {data.time}\n"
    )


def service(data: DataService):
    bot = Bot(token=token)
    do_echo_service(bot, data)


def main(data: DataOrder):
    bot = Bot(token=token)
    do_echo_order(bot, data)

