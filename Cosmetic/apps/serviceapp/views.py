import json

from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from Cosmetic.apps.mainapp import models
from django.contrib.auth.decorators import login_required


# Формирование визита НУЖЕН ДЕБАГ
@csrf_exempt
@login_required  # при проверке закоментить
def form_service(request):
    queryset = json.load(request)
    visit = models.Visit()
    visit.client_id = queryset['user_id']
    visit.date = queryset['date']
    visit.service_id = models.Service.get_id_by_name(queryset['service'])
    visit.price = models.ShopUser.get_sale(visit.client_id) * models.Service.get_price(visit.service_id)

    visit.save()

    return render(request, 'index.html')
    # return HttpResponse("response") # для проверки
