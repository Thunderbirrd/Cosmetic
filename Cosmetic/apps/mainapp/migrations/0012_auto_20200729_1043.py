# Generated by Django 3.0.8 on 2020-07-29 07:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0011_auto_20200729_1418'),
    ]

    operations = [
        migrations.AlterField(
            model_name='visit',
            name='date',
            field=models.CharField(default='', max_length=32, verbose_name='дата посещения'),
        ),
    ]