from django.shortcuts import render
from django.core.cache import cache
from .apps.mainapp.models import Product, Visit
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
            'products': product_list,
            'occupied_dates': service(),
        }
        return render(request, 'index.html', content)


def service():
    visit_list = Visit.objects.all()
    occupied_dates = []

    for visit in visit_list:
        if visit.status == "PAY":
            occupied_dates.append({'date': visit.date[:10], 'time': visit.date[11:]})

    return occupied_dates
