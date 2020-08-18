from django.urls import re_path

from . import views
app_name = "mainapp"

urlpatterns = [
    re_path(r'^(?P<pk>\d+)/$', views.open_article, name='open_article'),
    re_path(r'^', views.all_articles, name='all_articles')
]
