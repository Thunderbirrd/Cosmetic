from django.db import models
from django.contrib.auth.models import AbstractUser


class ShopUser(AbstractUser):
    phone = models.CharField(unique=True, verbose_name="номер телефона", max_length=13, default="")
    is_staff = models.BooleanField(verbose_name="является ли пользователь админом", default=False)
    sale = models.FloatField(verbose_name="скидка пользователя", default=1.0)

    def __str__(self):
        return self.email

    @staticmethod
    def get_sale(idx):
        user = ShopUser.objects.filter(id=idx).first()
        return user.sale


class Category(models.Model):
    name = models.CharField(verbose_name="название категории", unique=True, db_index=True, max_length=25)

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField(verbose_name="название бренда", unique=True, db_index=True, max_length=25)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(verbose_name="название товара", unique=True, db_index=True, null=False, max_length=64)
    price = models.PositiveIntegerField(verbose_name="цена", default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="product_img/", blank=True)
    quantity = models.PositiveIntegerField(verbose_name='количество на складе', default=0, null=False)
    is_active = models.BooleanField(verbose_name='активен ли продукт', default=True)

    def __str__(self):
        return self.name


class Service(models.Model):
    name = models.CharField(verbose_name="название услуги", unique=True, max_length=25)
    price = models.PositiveIntegerField(verbose_name="цена", default=0)

    def __str__(self):
        return self.name

    @staticmethod
    def get_price(idx):
        service = Service.objects.filter(id=idx).first()
        return service.price

    @staticmethod
    def get_id_by_name(name):
        service = Service.objects.filter(name=name).first()
        return service.id


class Visit(models.Model):
    PAY = "PAY"
    NO = "NO"
    VISIT_STATUS_CHOICES = (
        (PAY, "Предоплата внесена"),
        (NO, "Предоплата не внесена"),
    )
    client = models.ForeignKey(ShopUser, on_delete=models.CASCADE, db_index=True)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    date = models.CharField(verbose_name="время посещения", unique=True, null=False, default="", max_length=32)
    price = models.PositiveIntegerField(verbose_name="стоимость посещения", null=False, default=0)
    status = models.CharField(verbose_name="статус", max_length=3, choices=VISIT_STATUS_CHOICES, default=NO)


class Stock(models.Model):
    service_list = models.ManyToManyField(Service, verbose_name="список услуг")
    price = models.PositiveIntegerField(verbose_name="стоимость акции", null=False, default=0)
    datetime_1 = models.DateTimeField(verbose_name="время начала", unique=True, null=False)
    datetime_2 = models.DateTimeField(verbose_name="время конца", unique=True, null=False)
    expires = models.DateField(verbose_name="дата окончания акции")
