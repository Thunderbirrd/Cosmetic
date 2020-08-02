from telegram import Bot
from Cosmetic.apps.mainapp.models import ForBot

bot_info = ForBot.objects.first()
chatID = bot_info.chat_id
token = bot_info.token


class Data:
    phone = ""
    order_type = ""
    name = ""
    surname = ""
    price = 0
    items = {}

    def __init__(self, phone, order_type, name, surname, price, items):
        self.phone = phone
        self.order_type = order_type
        self.name = name
        self.surname = surname
        self.price = price
        self.items = items


def do_echo(bot: Bot, data):
    text = ''
    first = True
    for name in data.items:
        if not first:
            text += ','
        else:
            first = False
        text += ' ' + name + ' - ' + str(data.items[name])
    bot.send_message(
        chat_id=chatID,
        text=f"Оформлен новый заказ!\n"
             f"Номер клиента: 8{data.phone}\n"
             f"Тип заказа: {data.order_type}\n"
             f"Имя и фамилиия клиента: {data.name} {data.surname}\n"
             f"Сумма заказа: {data.price} р.\n"
             f"Список товаров:"+text
    )


def main(data: Data):
    bot = Bot(token=token)
    do_echo(bot, data)
