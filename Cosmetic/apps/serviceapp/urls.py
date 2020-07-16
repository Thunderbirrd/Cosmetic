from django.urls import path

from . import views

urlpatterns = [
    path('', views.form_service, name='from_service')
]
