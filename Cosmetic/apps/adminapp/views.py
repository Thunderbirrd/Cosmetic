from django.contrib.auth.decorators import user_passes_test
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from Cosmetic.apps.mainapp.models import Visit
import json


@csrf_exempt
@user_passes_test(lambda user: user.is_superuser)
def visits_calendar(request):
    date = json.loads(request)
    queryset = Visit.objects.filter(date=date)

    return HttpResponse(json.dumps(queryset))


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



