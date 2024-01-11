# Generated by Django 4.2.6 on 2024-01-11 00:50

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0011_merge_20240110_0351'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='property',
            name='is_active',
        ),
        migrations.AddField(
            model_name='property',
            name='is_rentable',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='property',
            name='status',
            field=models.IntegerField(default=0, validators=[django.core.validators.MaxValueValidator(2), django.core.validators.MinValueValidator(0)]),
        ),
        migrations.AlterField(
            model_name='rentalrequest',
            name='property',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rental_requests', to='base.property'),
        ),
        migrations.AlterField(
            model_name='rentalrequest',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rental_requests', to=settings.AUTH_USER_MODEL),
        ),
    ]