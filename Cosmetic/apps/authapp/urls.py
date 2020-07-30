from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView

import Cosmetic.apps.authapp.views as authapp
from django.urls import re_path

app_name = 'authapp'

urlpatterns = [
    re_path(r'^password_reset/$', PasswordResetView.as_view(),
            name="password_reset"),
    re_path(r'^password_reset_done/$', PasswordResetDoneView.as_view(), name="password_reset_done "),
    re_path(r'^password_reset_confirm/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    re_path(r'^login/$', authapp.login, name='login'),
    re_path(r'^logout/$', authapp.logout, name='logout'),
    re_path(r'^register/$', authapp.register, name='register'),
    re_path(r'^edit/$', authapp.edit, name='edit'),
]
