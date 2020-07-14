from django.urls import path

from . import views

urlpatterns = [
    path('', views.form_basket, name='from_basket')
]
