from telegram import Bot, Update
from telegram.ext import Updater, CommandHandler
from .bot_constants import token  # все работает кроме этого говна


class Data:
    phone = ""
    order_type = ""
    name = ""
    surname = ""
    items = {}

    def __init__(self, phone, order_type, name, surname, items):
        self.phone = phone
        self.order_type = order_type
        self.name = name
        self.surname = surname
        self.items = items


def do_start(bot: Bot, update: Update):
    bot.send_message(
        chat_id=update.message.chat_id,
        text="Здравствуйте, Виктория!"
    )


def main(data: Data):
    bot = Bot(
        token=token,
    )
    updater = Updater(bot=bot)

    start_handler = CommandHandler("start", do_start)
    updater.dispatcher.add_handler(start_handler)

    updater.start_polling()
    updater.idle()

'''
if __name__ == '__main__':
    main()
'''