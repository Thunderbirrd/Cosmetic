import json
from django.shortcuts import render
from Cosmetic.apps.mainapp import models
from django.contrib.auth.decorators import login_required


# Формирование визита НУЖЕН ДЕБАГ
@login_required
def form_service(request):
    queryset = json.load(request)
    queryset = queryset['list']
    visit = models.Visit()
    visit.client = request.user.id
    visit.date = queryset['date']
    visit.service = models.Service.get_id_by_name(queryset['service'])
    visit.price = models.ShopUser.get_sale(visit.client) * models.Service.get_price(visit.service)

    visit.save()

    return render(request, 'index.html')
