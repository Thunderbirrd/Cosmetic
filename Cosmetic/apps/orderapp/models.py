from django.db import models
import Cosmetic.apps.mainapp.models as m


class Order(models.Model):
    PROCEEDED = 'PRD'
    READY = 'RDY'
    ON_WAY = 'ON_W'
    ORDER_STATUS_CHOICES = (
        (PROCEEDED, 'обрабатывается'),
        (READY, 'готов к выдаче'),
        (ON_WAY, 'в пути')
    )

    CITY = "YKT"
    OUT = "OUT"
    SAM = "SAM"
    ORDER_TYPE_CHOICES = (
        (CITY, 'По городу'),
        (OUT, 'Почтой РФ'),
        (SAM, 'Самовывоз')
    )

    client_phone = models.CharField(verbose_name='номер клиента', max_length=13, default="", db_index=True)
    client_name = models.CharField(verbose_name='имя клиента', max_length=25, default="")
    client_surname = models.CharField(verbose_name='фамилия клиента', max_length=25, default="")
    client_address = models.CharField(verbose_name='адрес клиента', max_length=192, default="")
    order_type = models.CharField(verbose_name='тип доставки', max_length=3, choices=ORDER_TYPE_CHOICES, default="")
    created = models.DateTimeField(verbose_name='создан', auto_now_add=True)
    status = models.CharField(verbose_name='статус', max_length=4, choices=ORDER_STATUS_CHOICES, default=PROCEEDED)

    class Meta:
        ordering = ('-created',)
        verbose_name = 'заказ'
        verbose_name_plural = 'заказы'

    def __str__(self):
        return 'Текущий заказ: {}'.format(self.id)

    def get_total_quantity(self):
        items = self.order_items.select_related()
        return sum(list(map(lambda x: x.quantity, items)))

    def get_product_type_quantity(self):
        items = self.order_items.select_related()
        return len(items)

    def get_total_cost(self):
        items = self.order_items.select_related()
        return sum(list(map(lambda x: x.quantity * x.product.price, items)))

    def get_summary(self):
        items = self.order_items.select_related()
        return {
            'total_cost': sum(list(map(lambda x: x.quantity * x.product.price, items))),
            'total_quantity': sum(list(map(lambda x: x.quantity, items)))
        }

        # переопределяем метод, удаляющий объект

    def delete(self, **kwargs):
        for item in self.order_items.select_related():
            item.product.quantity += item.quantity
            item.product.save()

        self.is_active = False
        self.save()


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, db_index=True, related_name="order_items")
    product = models.ForeignKey(m.Product, on_delete=models.CASCADE, verbose_name="продукт")
    quantity = models.PositiveIntegerField(verbose_name="количество", default=0)

    def get_product_cost(self):
        return self.product.price * self.quantity

    @staticmethod
    def get_item(pk):
        return OrderItem.objects.filter(pk=pk).first()
