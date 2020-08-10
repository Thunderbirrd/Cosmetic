import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from Cosmetic.apps.mainapp.models import Article


@csrf_exempt
def all_articles(request):
    articles = Article.objects.all()
    articles_list = list(articles)
    return HttpResponse(articles_list)


@csrf_exempt
def open_article(request):
    title = json.load(request)
    article = Article.objects.get(title=title)  # in progress
    return HttpResponse(article)