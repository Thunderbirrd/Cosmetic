from django.http import HttpResponse
from django.shortcuts import render
from django.core.cache import cache
from django.views.decorators.csrf import csrf_exempt

from .apps.mainapp.models import Product, Visit, Service
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

        content = {
            'title': title,
            'products': product_list,
            'occupied_dates': visits(),
            'service_names': services(),
        }
        return render(request, 'index.html', content)


def visits():
    visit_list = Visit.objects.all()
    occupied_dates = []

    for visit in visit_list:
        occupied_dates.append({'date': visit.date, 'time': visit.time})
    return occupied_dates


@csrf_exempt
def refresh(request):
    visit_list = Visit.objects.all()
    occupied_dates = []

    for visit in visit_list:
        occupied_dates.append({'date': visit.date, 'time': visit.time})
    return occupied_dates


def services():
    return Service.objects.all()


def calendar(request):
    return render(request, 'calendar/index.html')
