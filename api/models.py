from django.db import models
from datetime import datetime
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class Role(models.Model):
    timestamps = models.DateTimeField(blank=True,null=True)
    name = models.CharField(max_length=100)
    value = models.CharField(max_length=100)

    def save(self):
        self.timestamps = datetime.now()
        super(Role, self).save()


class Profile(models.Model):
    timestamps = models.DateTimeField(blank=True,null=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="profile")
    birthday = models.DateTimeField()
    role_id = models.OneToOneField(Role, on_delete=models.CASCADE, related_name="profile", null=True)

    def save(self):
        self.timestamps = datetime.now()
        super(Profile, self).save()


class Avatar(models.Model):
    timestamps = models.DateTimeField(blank=True,null=True)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="avatar")
    image = models.ImageField(upload_to='avatars/')

    def save(self):
        self.timestamps = datetime.now()
        super(Avatar, self).save()







@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
