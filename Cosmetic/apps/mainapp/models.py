from django.db import models
from django.contrib.auth.models import AbstractUser


class ShopUser(AbstractUser):
    phone = models.CharField(unique=True, verbose_name="номер телефона", max_length=13, default="")
    is_staff = models.BooleanField(verbose_name="является ли пользователь админом", default=False)
    sale = models.FloatField(verbose_name="скидка пользователя", default=1.0)
    father_name = models.CharField(verbose_name="отчество", default="", max_length=64)

    def __str__(self):
        return self.email

    @staticmethod
    def get_sale(idx):
        user = ShopUser.objects.filter(id=idx).first()
        return user.sale


class Category(models.Model):
    name = models.CharField(verbose_name="название категории", unique=True, db_index=True, max_length=64)

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField(verbose_name="название бренда", unique=True, db_index=True, max_length=25)

    def __str__(self):
        return self.name


class Line(models.Model):
    name = models.CharField(verbose_name="название линейки", max_length=64, default="")
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)


class Product(models.Model):
    name = models.CharField(verbose_name="название товара", unique=True, db_index=True, null=False, max_length=64)
    price = models.PositiveIntegerField(verbose_name="цена", default=0)
    description = models.CharField(verbose_name="описание товара", max_length=256, default="")
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="static/product_img/", blank=True)
    quantity = models.PositiveIntegerField(verbose_name='количество на складе', default=0, null=False)
    is_active = models.BooleanField(verbose_name='активен ли продукт', default=True)
    line = models.ForeignKey(Line, on_delete=models.CASCADE, null=True)
    discount = models.PositiveIntegerField(verbose_name='скидка на товар в процентах', default=0)

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
    date = models.CharField(verbose_name="дата посещения", unique=False, null=False, default="", max_length=32)
    time = models.CharField(verbose_name="время посещения", unique=False, null=False, default="", max_length=32)
    price = models.PositiveIntegerField(verbose_name="стоимость посещения", null=False, default=0)
    status = models.CharField(verbose_name="статус", max_length=3, choices=VISIT_STATUS_CHOICES, default=NO)

    class Meta:
        unique_together = (('date', 'time'),)

    def __str__(self):
        return self.date+' '+self.time


class ForBot(models.Model):
    token = models.CharField(verbose_name="bot_token", null=False, max_length=60)
    chat_id = models.CharField(verbose_name="chat_id", null=False, max_length=20)


class Article(models.Model):
    title = models.CharField(verbose_name="Заголовок", max_length=64, default="", unique=True)
    text = models.TextField(verbose_name="Текст статьи", default="", max_length=100000)

    def __str__(self):
        return self.title


class ImageForArticle(models.Model):
    main_image = models.ImageField(upload_to="static/article_img/", blank=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    number_in_article = models.PositiveIntegerField(verbose_name="порядковый номер в статье", null=False, default=1)

    def __str__(self):
        return self.main_image


class ProductCompilation(models.Model):
    name = models.CharField(verbose_name="название товара", unique=True, db_index=True, null=False, max_length=64)
    description = models.CharField(verbose_name="описание товара", max_length=256, default="")
    image = models.ImageField(upload_to="static/compilation_img/", blank=True)
    quantity = models.PositiveIntegerField(verbose_name='количество на складе', default=0, null=False)
    discount = models.PositiveIntegerField(verbose_name='скидка на товар в процентах', default=0)
    is_active = models.BooleanField(verbose_name='активен ли продукт', default=True)
    product_list = models.ManyToManyField(Product, related_name="compilation_items")

    def __str__(self):
        return self.name


class Months(models.Model):
    month_number = models.IntegerField(verbose_name="номер месяца", unique=True, db_index=True, null=False, default=0)
    is_active = models.BooleanField(verbose_name='активен ли месяц', default=False)


class Certificate(models.Model):
    name = models.CharField(verbose_name="название сертификата", unique=True, db_index=True, null=False, max_length=64)
    price = models.PositiveIntegerField(verbose_name="цена", default=0)
    image = models.ImageField(upload_to="static/product_img/", blank=True)
    description = models.CharField(verbose_name="описание сетификата", max_length=256, default="")
    quantity = models.PositiveIntegerField(verbose_name='количество на складе', default=0, null=False)
