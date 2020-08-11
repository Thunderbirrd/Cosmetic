import datetime
from django.http import HttpResponse
from django.shortcuts import render
from django.core.cache import cache
from django.views.decorators.csrf import csrf_exempt
from .apps.mainapp.models import Product, Visit, Service, ProductCompilation
from .settings import LOW_CACHE
import json


def home(request):
    title = 'Главная'
    if LOW_CACHE:
        key = 'products'
        product_list = cache.get(key)
        if product_list is None:
            product_list = Product.objects.filter(is_active=True)
            cache.set(key, product_list)
        key = "compilations"
        product_compilation_list = cache.get(key)
        if product_compilation_list is None:
            product_compilation_list = ProductCompilation.objects.filter(is_active=True)
            cache.set(key, product_compilation_list)
            
        content = {
            'title': title,
            'products': product_list,
            'occupied_dates': visits(datetime.date.today()),
            'service_names': services(),
            'product_compilation_list': product_compilation_list
        }
        return render(request, 'index.html', content)


def visits(date):
    date
    visit_list = Visit.objects.filter(date=date)
    occupied_dates = []

    for visit in visit_list:
        occupied_dates.append(visit.time)

    # проверка на открытость месяца
    return occupied_dates


@csrf_exempt
def refresh(request):
    date = json.loads(request.body)["date"]
    return HttpResponse(json.dumps(visits(date)))


def services():
    return Service.objects.all()


def calendar(request):
    return render(request, 'calendar/index.html')
