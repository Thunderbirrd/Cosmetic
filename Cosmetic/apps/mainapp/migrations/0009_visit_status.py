# Generated by Django 3.0.8 on 2020-07-23 08:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0008_auto_20200721_2137'),
    ]

    operations = [
        migrations.AddField(
            model_name='visit',
            name='status',
            field=models.CharField(choices=[('PAY', 'Предоплата внесена'), ('NO', 'Предоплата не внесена')], default='NO', max_length=3, verbose_name='статус'),
        ),
    ]