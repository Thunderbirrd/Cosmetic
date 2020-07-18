from django.urls import path

from . import views
app_name = "orderapp"

urlpatterns = [
    path('', views.form_basket, name='from_basket'),
    path('form_order/', views.form_order, name='form_order'),
    path('delete_order/', views.delete_order, name='delete_order')
]
