from django.contrib.auth.decorators import user_passes_test
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from Cosmetic.apps.mainapp.models import Visit, Service
from Cosmetic.apps.mainapp.models import ShopUser
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
    content = {
        'title': title,
        'all client visits': all_client_visits
    }
    # return render(request, TEMLATE, content)
