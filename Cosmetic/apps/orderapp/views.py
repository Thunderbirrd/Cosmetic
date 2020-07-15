import json
import threading
import time
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from Cosmetic.apps.mainapp.models import Product


@csrf_exempt  # Почитать что это!
def form_basket(request):
    is_correct = True
    lst = []
    basket_list = json.load(request)  # Список в корзине
    queryset = Product.objects.all()  # Set из таблицы

    for product_basket in basket_list:
        product = queryset.values().get(
            name=product_basket)  # нахождение товара в базе из списка корзины
        # (скорее всего в финальной версии больше условий когда будут нормальные данные)
        dif = product.get('quantity') - basket_list[product_basket]

        if dif >= 0:  # Расчитывает доступный товар
            product['quantity'] = dif
        else:
            is_correct = False
            basket_list[product_basket] = product.get('quantity')

        lst.append(Product(product['id'], product['name'], product['price'],
                           product['category_id'], product['brand_id'],
                           product['image'], product['quantity']))

    if is_correct:
        for x in lst:
            x.save()

        thread = threading.Thread(target=return_products, args=(basket_list, False,), daemon=True)
        thread.start()

    return HttpResponse(json.dumps(basket_list))


def return_products(product_list, immediately):
    if not immediately:
        time.sleep(10)
    # проверка заказа
    # Если заказа нет, выполнить
    queryset = Product.objects.all()
    for product_basket in product_list:
        product = queryset.values().get(name=product_basket)
        product['quantity'] = product.get('quantity') + product_list[product_basket]

        x = Product(product['id'], product['name'], product['price'],
                    product['category_id'], product['brand_id'],
                    product['image'], product['quantity'])
        x.save()


def form_order(request):
    # Определиться с полями
    # Добавить заказ в таблицу
    # Нужно узнать id и имя клиента!
    return None
