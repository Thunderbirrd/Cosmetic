from django.urls import path

from . import views
app_name = "orderapp"

urlpatterns = [
    path('', views.form_basket, name='from_basket')
]
