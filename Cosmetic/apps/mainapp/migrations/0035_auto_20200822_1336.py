# Generated by Django 3.0.8 on 2020-08-22 10:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0034_auto_20200822_1232'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='description',
            field=models.TextField(default='', max_length=800, verbose_name='описание товара'),
        ),
    ]
