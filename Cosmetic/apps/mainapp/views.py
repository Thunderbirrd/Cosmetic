import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from Cosmetic.apps.mainapp.models import Article, ImageForArticle


@csrf_exempt
def all_articles(request):
    articles_list = []
    articles = Article.objects.all()
    for article in articles:
        images_list = []
        images = ImageForArticle.objects.filter(article_id=article.id)

        for image in images:
            images_list.append(image.main_image)

        articles_list.append({'id': article.id, 'title': article.title, 'images': images})
    return HttpResponse(json.dumps(articles_list, ensure_ascii=False))


@csrf_exempt
def open_article(request, pk):
    article_dict = {}
    article = Article.objects.get(id=pk)
    article_dict['title'] = article.title
    article_dict['text'] = article.text

    return HttpResponse(json.dumps(article_dict, ensure_ascii=False))
