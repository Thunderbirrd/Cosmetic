import json
from django.shortcuts import render

def form_service(request):
    queryset = json.load(request)
    # Оформление услуги для клиента
    return None