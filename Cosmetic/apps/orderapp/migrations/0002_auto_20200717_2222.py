# Generated by Django 3.0.8 on 2020-07-17 13:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orderapp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='client',
        ),
        migrations.AddField(
            model_name='order',
            name='client_address',
            field=models.CharField(default='', max_length=192, verbose_name='адрес клиента'),
        ),
        migrations.AddField(
            model_name='order',
            name='client_name',
            field=models.CharField(default='', max_length=25, verbose_name='имя клиента'),
        ),
        migrations.AddField(
            model_name='order',
            name='client_phone',
            field=models.CharField(db_index=True, default='', max_length=13, verbose_name='номер клиента'),
        ),
        migrations.AddField(
            model_name='order',
            name='client_surname',
            field=models.CharField(default='', max_length=25, verbose_name='фамилия клиента'),
        ),
        migrations.AddField(
            model_name='order',
            name='order_type',
            field=models.CharField(choices=[('YKT', 'По городу'), ('OUT', 'Почтой РФ')], default='', max_length=3, verbose_name='тип доставки'),
        ),
    ]
