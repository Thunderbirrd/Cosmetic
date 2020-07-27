from django.shortcuts import render
from django.contrib.auth.decorators import user_passes_test
from Cosmetic.apps.mainapp.models import Visit


@user_passes_test(lambda user: user.is_superuser)
def visits_calendar(request):
    title = "Календарь записи клиентов"
    content = {
        'title': title,
        'visits': Visit.objects.all()
    }
    # render(request, какой-то TEMPLATE, content)
