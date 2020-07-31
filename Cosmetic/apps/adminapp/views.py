from django.contrib.auth.decorators import user_passes_test
from django.core.exceptions import ObjectDoesNotExist
from django.forms import model_to_dict
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from Cosmetic.apps.mainapp.models import Visit, Service, ShopUser
import json


@csrf_exempt
@user_passes_test(lambda user: user.is_superuser)
def visits_calendar(request):
    date = json.load(request)['date']
    queryset = Visit.objects.filter(date=date)
    lst = []
    for visit in queryset:
        dct = {}
        user = ShopUser.objects.get(id=visit.client_id)
        dct['visit_id'] = visit.id
        dct['time'] = visit.time
        dct['first_name'] = user.first_name
        dct['last_name'] = user.last_name
        dct['phone'] = user.phone
        dct['service_name'] = Service.objects.get(id=visit.service_id).name
        dct['status'] = visit.status
        lst.append(dct)

    return HttpResponse(json.dumps(lst, ensure_ascii=False))


@csrf_exempt
@user_passes_test(lambda user: user.is_superuser)
def current_visit(request, pk):
    try:
        title = f"Запись №{pk}"
        visit = Visit.objects.get(id=pk)
        all_client_visits = Visit.objects.filter(client=visit.client_id).all()
        client = ShopUser.objects.get(id=visit.client_id)
        all_client_visits_list = []
        for vst in all_client_visits:
            vst = model_to_dict(vst)
            vst['service_id'] = Service.objects.filter(id=visit.service_id).first().name
            all_client_visits_list.append(vst)
        service = Service.objects.get(id=visit.service_id)
        content = {
            'title': title,
            'visit_time': visit.time,
            'visit_date': visit.date,
            'service_name': service.name,
            'visit_price': visit.price,
            'all_client_visits': all_client_visits_list,
            "client's_phone": client.phone,
            "client's_sale": (client.sale - 1) * 100,
            "client's_name": client.first_name,
            "client's_surname": client.last_name,
            "client's_email": client.email
        }
        return HttpResponse(json.dumps(content, ensure_ascii=False))
    except ObjectDoesNotExist:
        return HttpResponse('Error')


@csrf_exempt
@user_passes_test(lambda user: user.is_superuser)
def delete_visit(request, pk):
    try:
        visit = Visit.objects.filter(id=pk)
        visit.delete()
    except ObjectDoesNotExist:
        return HttpResponse('Error')
    return HttpResponse('Success')


@csrf_exempt
@user_passes_test(lambda user: user.is_superuser)
def change_status(request, pk):
    try:
        visit = Visit.objects.get(id=pk)
        visit.status = 'PAY'
        visit.save()
    except ObjectDoesNotExist:
        return HttpResponse('Error')
    return HttpResponse('Success')


'''
    request = {
        "name": имя клиента,
        "surname": фамилия клиента,
        "phone": номер телефона клиента,
        "date": дата,
        "time": время,
        "service": услуга,
    }
'''


@csrf_exempt
@user_passes_test(lambda user: user.is_superuser)
def create_visit(request):
    data = json.loads(request)
    new_visit = Visit()
    client = ShopUser.objects.filter(first_name=data["name"], last_name=data["surname"], phone=data["phone"]).first()
    if client:
        new_visit.client = client.id
    else:
        new_visit.client = 0

    new_visit.service = Service.objects.get(name=data["service"])
    new_visit.time = data["time"]
    new_visit.date = data["date"]
    new_visit.status = "PAY"
    new_visit.save()
    return HttpResponse("Success")
