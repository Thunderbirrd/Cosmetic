import json
import threading
import time
from . import bot
from .bot import DataOrder
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from Cosmetic.apps.mainapp.models import Product, ProductCompilation
from Cosmetic.apps.orderapp.models import Order
from Cosmetic.apps.orderapp.models import OrderItem
from django.core.exceptions import ObjectDoesNotExist


@csrf_exempt
def form_basket(request):
    is_correct = True
    lst = []
    request_list = json.load(request)  # Список в корзине
    product_compilations = request_list["product_compilation"]
    basket_list = {}
    try:
        basket_list = request_list["products"]
    except KeyError:
        pass
    product_id = -1
    for com in product_compilations:
        compilation = ProductCompilation.objects.get(id=int(com))
        product_list = Product.objects.filter(is_active=True).all()
        flag = False
        for product in product_list:
            if product.name == compilation.name:
                product_id = product.id
                flag = True
                break
        if not flag:
            product = Product()
            product.name = compilation.name
            product.price = compilation.price
            product.category_id = 131
            product.brand_id = 21
            product.line_id = 51
            product.quantity = compilation.quantity
            product.discount = compilation.discount
            product.save()
            basket_list[product.id] = product_compilations[com]
        else:
            basket_list[product_id] = product_compilations[com]

    if not basket_list:
        return HttpResponse('Error. Empty request.')
    queryset = Product.objects.filter(is_active=True)  # Set из таблицы
    # создание пустого заказа
    new_order = Order()
    new_order.save()
    order_id = new_order.id
    # заполнение заказанных продуктов
    for product_id in basket_list:
        item = OrderItem()
        item.product_id = product_id
        item.order_id = order_id
        item.quantity = basket_list[product_id]
        item.save()

    try:
        for product_basket_id in basket_list:
            product = queryset.values().get(
                id=product_basket_id)  # нахождение товара в базе из списка корзины
            dif = product['quantity'] - basket_list[product_basket_id]

            if dif >= 0 and basket_list[product_basket_id] > 0:  # Расчитывает доступный товар
                product['quantity'] = dif
            else:
                is_correct = False
                basket_list[product_basket_id] = product.get('quantity')

            lst.append(Product(product['id'], product['name'],
                               product['price'], product['description'],
                               product['category_id'], product['brand_id'],
                               product['image'], product['quantity']))

    except ObjectDoesNotExist:
        return HttpResponse(json.dumps('Error. Product not found.'))

    if is_correct:
        for prod in lst:
            prod.save()
        thread = threading.Thread(target=return_products, args=(basket_list, order_id,), daemon=True)
        thread.start()
    else:
        Order.objects.filter(id=order_id).delete()
        order_id = 0
    return HttpResponse(json.dumps({'id': order_id, 'list': basket_list}))


def return_products(product_list, order_id):
    time.sleep(600)
    orders = Order.objects.filter(id=order_id)
    order = orders.get(id=order_id)
    # проверка на наличие заказа
    if order.client_phone == "":
        orders.delete()

        try:
            for product_basket_id in product_list:
                product = Product.objects.values().get(id=product_basket_id)
                product['quantity'] = product.get('quantity') + product_list[product_basket_id]
                x = Product(product['id'], product['name'], product['price'],
                            product['category_id'], product['brand_id'],
                            product['image'], product['quantity'])
                x.save()
        except ObjectDoesNotExist:
            return None


@csrf_exempt
def form_order(request):
    data = json.load(request)
    order_information = data['list']
    try:
        order = Order.objects.get(id=data['id'])
        order.client_phone = order_information['phone']
        order.client_address = order_information['address']
        order.client_name = order_information['name']
        order.client_surname = order_information['surname']
        order.order_type = order_information['order_type']
        order.save()

        price = order.get_total_cost()
        product_list = get_order_items_list(data['id'])
        data = DataOrder(order_information['phone'], order_information['order_type'],
                         order_information['name'], order_information['surname'],
                         price, product_list, order_information['address'], order.id)
        bot.main(data)

    except ObjectDoesNotExist:
        return HttpResponse(json.dumps('Error. Product not found.'))
    return HttpResponse(json.dumps('Success'))


@csrf_exempt
def delete_order(request):  # удаление заказа по id при уходе со страницы офрмления
    data = json.load(request)
    try:
        orders = Order.objects.filter(id=data['id'])
        items = OrderItem.objects.filter(order_id=data['id'])

        for item in items:  # возвращаение товара в бд (возможно if чтобы просто удалять выполненный заказ)
            product = Product.objects.values().get(id=item.product_id)
            product['quantity'] = product.get('quantity') + item.quantity
            x = Product(product['id'], product['name'], product['price'],
                        product['category_id'], product['brand_id'],
                        product['image'], product['quantity'])
            x.save()
        orders.delete()

    except ObjectDoesNotExist:
        return HttpResponse(json.dumps('Error. Product not found.'))
    return HttpResponse(json.dumps('Success'))


def get_order_items_list(order_id):
    items = OrderItem.objects.filter(order_id=order_id).all()
    items_dict = {}
    for item in items:
        items_dict[f"{item.product}"] = item.quantity

    return items_dict
