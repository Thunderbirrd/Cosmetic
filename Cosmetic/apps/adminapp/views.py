from django.shortcuts import render
from django.contrib.auth.decorators import user_passes_test
from Cosmetic.apps.mainapp.models import Visit


@user_passes_test(lambda user: user.is_superuser)
def visits_calendar(request):
    pass
