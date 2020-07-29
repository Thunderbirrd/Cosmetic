from django.contrib.auth.decorators import user_passes_test
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
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
        dct['time'] = visit.time
        dct['first_name'] = user.first_name
        dct['last_name'] = user.last_name
        dct['phone'] = user.phone
        dct['service_name'] = Service.objects.get(id=visit.service_id).name
        lst.append(dct)

    return HttpResponse(json.dumps(lst, ensure_ascii=False))


@csrf_exempt
@user_passes_test(lambda user: user.is_superuser)
def current_visit(request, pk):
    title = f"Запись №{pk}"
    visit = get_object_or_404(Visit, pk=pk)
    all_client_visits = Visit.objects.filter(client=visit.client).all()
    client = ShopUser.objects.get(id=visit.client)
    for visit in all_client_visits:
        visit.service = Service.objects.filter(id=visit.service).first()

    content = {
        'title': title,
        'all client visits': all_client_visits,
        "client's phone": client.phone,
        "client's sale": (client.sale - 1) * 100,
        "client's name": client.first_name,
        "client's surname": client.last_name,
        "client's email": client.email
    }
    # return render(request, TEMLATE, content)
