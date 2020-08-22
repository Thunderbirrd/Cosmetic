from django.contrib import admin
from .models import ShopUser, Product, Category, Service, Brand, Visit,\
    ForBot, Article, ImageForArticle, Line, ProductCompilation

admin.site.register(ShopUser)
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Service)
admin.site.register(Brand)
admin.site.register(Line)
admin.site.register(Visit)
admin.site.register(ForBot)
admin.site.register(Article)
admin.site.register(ImageForArticle)
admin.site.register(ProductCompilation)
