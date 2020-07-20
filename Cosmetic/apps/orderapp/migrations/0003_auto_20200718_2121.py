# Generated by Django 3.0.8 on 2020-07-18 12:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orderapp', '0002_auto_20200717_2222'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_type',
            field=models.CharField(choices=[('YKT', 'По городу'), ('OUT', 'Почтой РФ'), ('SAM', 'Самовывоз')], default='', max_length=3, verbose_name='тип доставки'),
        ),
    ]