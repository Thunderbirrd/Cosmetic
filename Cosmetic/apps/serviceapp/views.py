import json

from django.db import IntegrityError
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from Cosmetic.apps.mainapp import models
from django.contrib.auth.decorators import login_required


@csrf_exempt
@login_required(login_url='/auth/login/')
def form_service(request):
    queryset = json.load(request)
    try:
        visit = models.Visit()
        visit.client_id = request.user.id
        data = queryset['date'].split()
        visit.date = data[0]
        visit.time = data[1]
        visit.service_id = models.Service.get_id_by_name(queryset['service_name'])
        visit.price = models.ShopUser.get_sale(visit.client_id) * models.Service.get_price(visit.service_id)
        visit.status = "NO"
        visit.save()

    except IntegrityError:
        return HttpResponse(json.dumps('Error. Something went wrong.'))

    return HttpResponse('Success')
