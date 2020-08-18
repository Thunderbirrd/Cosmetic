from django.contrib.auth.decorators import user_passes_test
from django.core.exceptions import ObjectDoesNotExist
from django.forms import model_to_dict
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from Cosmetic.apps.mainapp.models import Visit, Service, ShopUser, ForBot, Months
import json

from Cosmetic.view import show_months


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
        dct['father_name'] = user.father_name
        dct['phone'] = user.phone
        dct['service_name'] = Service.objects.get(id=visit.service_id).name
        dct['status'] = visit.status
        lst.append(dct)

    return HttpResponse(json.dumps(lst, ensure_ascii=False))


@csrf_exempt
@user_passes_test(lambda user: user.is_superuser)
def get_all_services(request):
    service_list = Service.objects.all()
    lst = []
    for service in service_list:
        lst.append(service.name)
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
            "client's_email": client.email,
            'father_name': client.father_name
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
    data = json.loads(request.body)
    new_visit = Visit()
    client = ShopUser.objects.filter(phone=data['phone']).first()
    if client:
        new_visit.client_id = client.id
        service = Service.objects.get(name=data['service'])
        new_visit.service_id = service.id
        new_visit.time = data['time']
        new_visit.date = data['date']
        new_visit.price = service.price
        new_visit.status = 'PAY'
        new_visit.save()
        return HttpResponse('Success')
    else:
        return HttpResponse('Error')


@csrf_exempt
@user_passes_test(lambda user: user.is_superuser)  # поменять chat_id у бота
def change_chat(request):
    new_chat_id = json.loads(request)
    bot_info = ForBot.objects.first()
    bot_info.chat_id = new_chat_id
    bot_info.save()
    return HttpResponse('Success')


@csrf_exempt
@user_passes_test(lambda user: user.is_superuser)  # меняет активность месяца
def change_month(request, pk):                      # admin_app/visits/months/(номер месяца)
    month = Months.objects.get(month_number=pk)
    if month:
        month.is_active = not month.is_active
        month.save()
        return show_months(request)
    else:
        return HttpResponse('Error')


@csrf_exempt
@user_passes_test(lambda user: user.is_superuser)
def calendar(request):
    return render(request, 'calendar/index.html')
