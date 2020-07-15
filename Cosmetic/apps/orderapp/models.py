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
    client = models.ForeignKey(m.ShopUser, on_delete=models.CASCADE)
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
