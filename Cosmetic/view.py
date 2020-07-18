from django.shortcuts import render
from django.core.cache import cache
from .apps.mainapp.models import Product
from .settings import LOW_CACHE


def home(request):
    title = 'Главная'
    if LOW_CACHE:
        key = 'products'
        product_list = cache.get(key)
        if product_list is None:
            product_list = Product.objects.filter(is_active=True)
            cache.set(key, product_list)

        content = {
            'title': title,
            'products': product_list
        }
        return render(request, 'index.html', content)


def contacts(request):
    return render(request, 'contacts.html')


def shipping(request):
    return render(request, 'shipping_and_playment.html')
