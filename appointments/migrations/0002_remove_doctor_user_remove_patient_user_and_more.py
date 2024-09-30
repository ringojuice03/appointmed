# Generated by Django 5.1.1 on 2024-09-30 06:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='doctor',
            name='user',
        ),
        migrations.RemoveField(
            model_name='patient',
            name='user',
        ),
        migrations.AddField(
            model_name='doctor',
            name='doctor_name',
            field=models.CharField(default='Dr. Placeholder', max_length=200),
        ),
        migrations.AddField(
            model_name='patient',
            name='patient_name',
            field=models.CharField(default='Patient placeholder', max_length=200),
        ),
    ]
