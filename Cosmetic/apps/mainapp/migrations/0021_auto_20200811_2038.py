# Generated by Django 3.0.8 on 2020-08-11 17:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0020_auto_20200811_1823'),
    ]

    operations = [
        migrations.CreateModel(
            name='Months',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=12, unique=True, verbose_name='название месяца')),
                ('is_active', models.BooleanField(default=False, verbose_name='активен ли месяц')),
            ],
        ),

    ]
