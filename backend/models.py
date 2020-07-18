import uuid
import datetime

from django.db import models
from django.contrib.auth.models import User
from imagekit.models import ProcessedImageField


class UserNotes(models.Model):
    name = models.CharField(max_length=256, verbose_name="nombre")
    note = models.CharField(max_length=256, verbose_name="note")
    image = ProcessedImageField(upload_to="images",
                                format='JPEG',
                                options={'quality': 50},
                                null=True,
                                blank=True,
                                verbose_name="imagen")
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="usuario", null=True, blank=True)
