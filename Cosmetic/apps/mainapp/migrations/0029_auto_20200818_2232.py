# Generated by Django 3.0.8 on 2020-08-18 13:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0028_auto_20200818_2222'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='line',
            field=models.ForeignKey(default="", on_delete=django.db.models.deletion.CASCADE, to='mainapp.Line'),
            preserve_default=False,
        ),
    ]
