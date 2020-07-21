from django.urls import path
from django.urls import re_path

from . import views

app_name = "serviceapp"

urlpatterns = [
    path('', views.form_service, name='form_service')
]
