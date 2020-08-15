import Cosmetic.apps.adminapp.views as admin_app
from django.urls import re_path

app_name = "adminapp"

urlpatterns = [
    re_path(r'^visits/get_services/$', admin_app.get_all_services, name="get services"),
    re_path(r'^visits/months/(?P<pk>\d+)/$', admin_app.change_month, name='change month'),
    re_path(r'^visits/$', admin_app.visits_calendar, name='visits calendar'),
    re_path(r'^visit/delete/(?P<pk>\d+)/$', admin_app.delete_visit, name='delete visit'),
    re_path(r'^visit/change/(?P<pk>\d+)/$', admin_app.change_status, name='change status'),
    re_path(r'^visit/(?P<pk>\d+)/$', admin_app.current_visit, name='current visit'),
    re_path(r'^visit/create/$', admin_app.create_visit, name='create visit'),
    re_path(r'^calendar/', admin_app.calendar, name='calendar'),
]
