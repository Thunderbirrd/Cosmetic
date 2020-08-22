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


def quantity_check(object_list, object_model, object_id, order_id, is_correct):
    item = OrderItem()
    my_object = object_model.objects.filter(is_active=True).values().get(
        id=object_id)

    if object_model == ProductCompilation:
        try:
            product = Product.objects.get(name=my_object['name'])
            item.product_id = product.id
        except ObjectDoesNotExist:
            product = Product()
            product.name = my_object['name']
            product.price = my_object['price']
            product.quantity = 0
            product.brand_id = 21
            product.category_id = 131
            product.image = my_object['image']
            product.is_active = my_object['is_active']
            product.description = my_object['description']
            product.discount = my_object['discount']
            product.line_id = 51
            product.save()
            item.product_id = product.id
    else:
        item.product_id = object_id
    item.order_id = order_id
    item.quantity = object_list[object_id]
    item.save()

    # нахождение товара в базе из списка корзины
    dif = my_object['quantity'] - object_list[object_id]

    if dif >= 0 and object_list[object_id] > 0:  # Расчитывает доступный товар
        my_object['quantity'] = dif
    else:
        is_correct = False
        object_list[object_id] = my_object['quantity']
    return my_object, is_correct


def return_products_switch(object_list, object_type):
    for object_id in object_list:

        my_object = object_type.objects.values().get(id=object_id)
        my_object['quantity'] = my_object['quantity'] + object_list[object_id]

        if object_type == Product:
            x = object_type(my_object['id'], my_object['name'],
                            my_object['price'], my_object['description'],
                            my_object['category_id'], my_object['brand_id'],
                            my_object['image'], my_object['quantity'], my_object['is_active'],
                            my_object['line_id'], my_object['discount'])
        else:
            x = object_type(my_object['id'], my_object['name'],
                            my_object['description'], my_object['image'],
                            my_object['quantity'], my_object['discount'],
                            my_object['is_active'], my_object['price'])
        x.save()


@csrf_exempt
def form_basket(request):
    is_correct = True
    lst1 = []
    lst2 = []
    request_list = json.load(request)  # Список в корзине
    product_compilations = request_list["product_compilation"]
    basket_list = request_list["products"]

    # создание пустого заказа
    new_order = Order()
    new_order.save()
    order_id = new_order.id

    # заполнение заказанных продуктов
    try:
        for comp_id in product_compilations:
            compilation, is_correct = quantity_check(product_compilations,
                                                     ProductCompilation, comp_id, order_id, is_correct)

            lst2.append(ProductCompilation(compilation['id'], compilation['name'],
                                           compilation['description'], compilation['image'],
                                           compilation['quantity'], compilation['discount'],
                                           compilation['is_active'], compilation['price']))

        for product_id in basket_list:
            product, is_correct = quantity_check(basket_list,
                                                 Product, product_id, order_id, is_correct)

            lst1.append(Product(product['id'], product['name'],
                                product['price'], product['description'],
                                product['category_id'], product['brand_id'],
                                product['image'], product['quantity'], product['is_active'],
                                product['line_id'], product['discount']))

    except ObjectDoesNotExist:
        return HttpResponse(json.dumps('Error. Product not found.'))

    if is_correct:
        for prod in lst1:
            prod.save()
        for comp in lst2:
            comp.save()
        thread = threading.Thread(target=return_products,
                                  args=(basket_list, product_compilations, order_id,), daemon=True)
        thread.start()
    else:
        Order.objects.filter(id=order_id).delete()
        order_id = 0

    return HttpResponse(json.dumps({'id': order_id, 'list': {'product': basket_list,
                                                             'product_compilation': product_compilations}}))


def return_products(product_list, compilation_list, order_id):
    time.sleep(600)
    orders = Order.objects.filter(id=order_id)
    order = orders.get(id=order_id)
    # проверка на наличие заказа
    if order.client_phone == "":
        orders.delete()

    try:
        return_products_switch(product_list, Product)
        return_products_switch(compilation_list, ProductCompilation)
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
