from django.shortcuts import render
from django.contrib.auth.decorators import user_passes_test
from Cosmetic.apps.mainapp.models import Visit
from django.shortcuts import render, get_object_or_404


@user_passes_test(lambda user: user.is_superuser)
def visits_calendar(request):
    title = "Календарь записи клиентов"
    content = {
        'title': title,
        'visits': Visit.objects.all()
    }
    # render(request, какой-то TEMPLATE, content)


@user_passes_test(lambda user: user.is_superuser)
def current_visit(request, pk):
    title = f"Запись №{pk}"
    visit = get_object_or_404(Visit, pk=pk)
    all_client_visits = Visit.objects.filter(client=visit.client).all()
    content = {
        'title': title,
        'all client visits': all_client_visits
    }
    #return render(request, TEMLATE, content)
