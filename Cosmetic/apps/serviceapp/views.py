import json
from django.db import IntegrityError
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from Cosmetic.apps.mainapp import models
from django.contrib.auth.decorators import login_required
from Cosmetic.apps.orderapp import bot
from Cosmetic.apps.orderapp.bot import DataService


@csrf_exempt
@login_required(login_url='/auth/login/')
def form_service(request):
    queryset = json.load(request)
    try:

        data = queryset['date'].split()
        client = models.ShopUser.objects.get(id=request.user.id)
        service = models.Service.objects.get(id=models.Service.get_id_by_name(queryset['service_name']).service_id)

        data = DataService(data[0], data[1], client.first_name, client.last_name, client.father_name,
                           service.name, client.phone)
        bot.service(data)

    except IntegrityError:
        return HttpResponse('Error')

    return HttpResponse('Success')
