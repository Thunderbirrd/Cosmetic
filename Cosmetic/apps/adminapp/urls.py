import Cosmetic.apps.adminapp.views as admin_app
from django.urls import re_path

app_name = "adminapp"

urlpatterns = [
    re_path(r'^visits', admin_app.visits_calendar, name='visits calendar'),
    re_path(r'^visit/(?P<pk>\d+)/$', admin_app.current_visit, name='current visit')
]

