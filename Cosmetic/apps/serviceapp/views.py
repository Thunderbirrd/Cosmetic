import json
from django.shortcuts import render

def form_service(request):
    queryset = json.load(request)
    # Оформление услуги для клиента







    # С 9: 30 до 20, 1, 5 часа без перерывов:
    # 9: 30 - 11
    # 11 - 12: 30
    # 12: 30 - 14
    # 14 - 15: 30
    # 15: 30 - 17
    # 17 - 18: 30
    # 18: 30 - 20
    # Выходные: среда, воскресенье
    return None