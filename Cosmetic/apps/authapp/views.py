from django.shortcuts import render
from django.contrib import auth
from django.urls import reverse
from django.core.mail import send_mail
from django.conf import settings
from .forms import ShopUserLoginForm, ShopUserRegisterForm, ShopUserEditForm
from Cosmetic.apps.mainapp.models import ShopUser


def login(request):
    title = 'вход'

    login_form = ShopUserLoginForm(data=request.POST or None)

    if request.method == 'POST' and login_form.is_valid():
        username = request.POST['username']
        password = request.POST['password']
