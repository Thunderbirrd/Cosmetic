import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from Cosmetic.apps.mainapp.models import Article, ImageForArticle


@csrf_exempt
def all_articles(request):
    articles_list = []
    articles = Article.objects.all()
    for article in articles:
        articles_list.append({'id': article.id, 'title': article.title, 'text': article.text[0:80],
                              'image': str(ImageForArticle.objects
                                           .get(article=article.id, number_in_article=1).main_image)})
    return HttpResponse(json.dumps(articles_list, ensure_ascii=False))


@csrf_exempt
def open_article(request, pk):
    article_dict = {}
    images_list = []
    article = Article.objects.get(id=pk)
    article_dict['title'] = article.title
    article_dict['text'] = article.text
    images = ImageForArticle.objects.filter(article_id=pk).order_by('number_in_article')
    for image in images:
        images_list.append(str(image.main_image))
    article_dict['images'] = images_list

    return HttpResponse(json.dumps(article_dict, ensure_ascii=False))
