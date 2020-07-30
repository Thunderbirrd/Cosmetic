"""Cosmetic URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView
from django.urls import path, re_path, include

from Cosmetic import view


urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^password_reset/$', PasswordResetView.as_view(template_name="forget_password/email.html"),
            name="password_reset"),
    re_path(r'^password_reset/done/', PasswordResetDoneView.as_view(
        template_name="forget_password/done.html"), name="password_reset_done"),
    re_path(r'^password_reset/confirm/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$',
            PasswordResetConfirmView.as_view(template_name="forget_password/change_password.html"),
            name='password_reset_confirm'),
    re_path(r'^form_basket/', include('Cosmetic.apps.orderapp.urls')),
    re_path(r'^form_service/', include('Cosmetic.apps.serviceapp.urls')),
    re_path(r'^auth/', include('Cosmetic.apps.authapp.urls', namespace='auth')),
    re_path(r'^calendar/', view.calendar, name='calendar'),
    re_path(r'^admin_app/', include('Cosmetic.apps.adminapp.urls', namespace='admin')),
    re_path(r'^', view.home, name='home'),
]
