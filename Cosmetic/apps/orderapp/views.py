import json
import threading
import time
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from Cosmetic.apps.mainapp.models import Product
from Cosmetic.apps.orderapp.models import Order
from Cosmetic.apps.orderapp.models import OrderItem



@csrf_exempt  # Почитать что это!
def form_basket(request):
    is_correct = True
    lst = []
    basket_list = json.load(request)  # Список в корзине
    queryset = Product.objects.all()  # Set из таблицы

    # создание пустого заказа
    new_order = Order()
    new_order.save()
    order_id = new_order.id

    for product_basket_id in basket_list:
        product = queryset.values().get(
            id=product_basket_id)  # нахождение товара в базе из списка корзины
        # (скорее всего в финальной версии больше условий когда будут нормальные данные)
        dif = product.get('quantity') - basket_list[product_basket_id]

        if dif >= 0:  # Расчитывает доступный товар
            product['quantity'] = dif
        else:
            is_correct = False
            basket_list[product_basket_id] = product.get('quantity')

        lst.append(Product(product['id'], product['name'], product['price'],
                           product['category_id'], product['brand_id'],
                           product['image'], product['quantity']))

    if is_correct:
        for x in lst:
            x.save()
        thread = threading.Thread(target=return_products, args=(basket_list, False, order_id, ), daemon=True)
        thread.start()

    return HttpResponse(json.dumps({'id': order_id, 'list': basket_list}))


def return_products(product_list, immediately, order_id):
    if not immediately:
        time.sleep(15)
    orders = Order.objects.filter(id=order_id)
    order = orders.get(id=order_id)
    # Проверка на наличие заказа
    if order.client_phone == "":
        orders.delete()
        queryset = Product.objects.all()
        for product_basket_id in product_list:
            product = queryset.values().get(id=product_basket_id)
            product['quantity'] = product.get('quantity') + product_list[product_basket_id]

            x = Product(product['id'], product['name'], product['price'],
                        product['category_id'], product['brand_id'],
                        product['image'], product['quantity'])
            x.save()


@csrf_exempt
def form_order(request):

    data = json.load(request)

    order_information = data['list1']
    order = Order.objects.get(id=data['id'])
    order.client_phone = order_information['phone']
    order.client_address = order_information['address']
    order.client_name = order_information['name']
    order.client_surname = order_information['surname']
    order.order_type = order_information['order_type']
    order.save()

    order_list = data['list2']
    for product_id in order_list:
        item = OrderItem()
        item.product_id = product_id
        item.order_id = data['id']
        item.quantity = order_list[product_id]
        item.save()

    return HttpResponse(json.dumps('Success'))
