from django.contrib import admin
from .models import ShopUser, Product, Category, Service, Brand, Visit, Stock

admin.site.register(ShopUser)
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Service)
admin.site.register(Brand)
admin.site.register(Visit)
admin.site.register(Stock)
