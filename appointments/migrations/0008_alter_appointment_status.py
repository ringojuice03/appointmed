# Generated by Django 5.1.1 on 2024-11-27 03:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0007_alter_appointment_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='status',
            field=models.CharField(choices=[('scheduled', 'Scheduled'), ('rejected', 'Rejected'), ('pending', 'Pending'), ('canceled', 'Canceled'), ('completed', 'Completed')], max_length=20),
        ),
    ]