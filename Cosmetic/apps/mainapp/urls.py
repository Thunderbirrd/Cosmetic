from django.urls import path

from . import views
app_name = "mainapp"

urlpatterns = [
    path('(?P<pk>\d+)/$', views.open_article, name='open_article'),
    path('', views.all_articles, name='all_articles')
]
