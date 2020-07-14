import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from Cosmetic.apps.mainapp.models import Product


@csrf_exempt # Почитать что это!
def form_basket(request):
    basket_list = json.load(request) # Список в корзине
    queryset = Product.objects.all() # Set из таблицы

    for product_basket in basket_list:
        product = queryset.values().get(name=product_basket) # нахождение товара в базе из списка корзины (скорее всего в финальной версии больше условий когда будут нормальные данные)
        dif = product.get('quantity') - basket_list[product_basket]
        if dif >= 0: # Если товар есть на складе резервирует его
            product['quantity'] = dif
            x = Product(product['id'], product['name'], product['price'], product['category_id'], product['brand_id'],
                        product['image'], product['quantity'])
            x.save()

    # Пока не доделано

    return HttpResponse(dif)
