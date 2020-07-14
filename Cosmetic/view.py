from django.shortcuts import render


def home(request):
    return render(request, 'index.html')


def shop(request):
    return render(request, 'index.html')


def contacts(request):
    return render(request, 'contacts.html')


def shipping(request):
    return render(request, 'shipping_and_playment.html')
