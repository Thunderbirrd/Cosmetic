# Generated by Django 3.0.8 on 2020-08-16 12:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0026_auto_20200816_2017'),
    ]

    operations = [
        migrations.CreateModel(
            name='Certificate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=64, unique=True, verbose_name='название сертификата')),
                ('price', models.PositiveIntegerField(default=0, verbose_name='цена')),
                ('image', models.ImageField(blank=True, upload_to='static/product_img/')),
                ('description', models.CharField(default='', max_length=256, verbose_name='описание сетификата')),
                ('quantity', models.PositiveIntegerField(default=0, verbose_name='количество на складе')),
            ],
        ),
    ]
