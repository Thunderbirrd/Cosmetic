from django.db import models
from django.contrib.auth.models import AbstractUser


class ShopUser(AbstractUser):
    email = models.EmailField(unique=True, verbose_name="электронная почта")
    is_staff = models.BooleanField(verbose_name="является ли пользователь админом", default=False)
    sale = models.FloatField(verbose_name="скидка пользователя", default=1.0)

    def __str__(self):
        return self.email


class Category(models.Model):
    #id = models.AutoField(primary_key=True, db_index=True)
    name = models.TextField(verbose_name="название категории", unique=True, db_index=True)

    def __str__(self):
        return self.name


class Brand(models.Model):
    #id = models.AutoField(primary_key=True, db_index=True)
    name = models.TextField(verbose_name="название бренда", unique=True, db_index=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    #id = models.AutoField(primary_key=True)
    name = models.TextField(verbose_name="название товара", unique=True, db_index=True, null=False)
    price = models.DecimalField(verbose_name="цена", default=0, max_digits=8, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(verbose_name='количество на складе', default=0)

    def __str__(self):
        return self.name


class Service(models.Model):
    #id = models.AutoField(primary_key=True, db_index=True)
    name = models.TextField(verbose_name="название услуги", unique=True)
    price = models.DecimalField(verbose_name="цена", default=0, max_digits=8, decimal_places=2)

    def __str__(self):
        return self.name


class Visit(models.Model):
    #id = models.AutoField(primary_key=True, db_index=True)
    client = models.ForeignKey(ShopUser, on_delete=models.CASCADE, db_index=True)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    date = models.DateTimeField(verbose_name="время посещения", unique=True, null=False)
    price = models.IntegerField(verbose_name="стоимость посещения", null=False)


class Stock(models.Model):
    #id = models.AutoField(primary_key=True, db_index=True)
    service_list = models.ManyToManyField(Service, verbose_name="список услуг")
    price = models.IntegerField(verbose_name="стоимость акции", null=False)
    datetime_1 = models.DateTimeField(verbose_name="время начала", unique=True, null=False)
    datetime_2 = models.DateTimeField(verbose_name="время конца", unique=True, null=False)
    expires = models.DateField(verbose_name="дата окончания акции")
