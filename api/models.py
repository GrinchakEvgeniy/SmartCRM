from django.db import models
from datetime import datetime
from django.contrib.auth.models import User


class Role(models.Model):
    timestamps = models.DateTimeField()
    name = models.CharField(max_length=100)
    value = models.CharField()

    def save(self):
        self.timestamps = datetime.now()
        super(Role, self).save()


class Profile(models.Model):
    timestamps = models.DateTimeField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="profile")
    birthday = models.DateTimeField()
    role_id = models.ForeignKey(Role, on_delete=models.CASCADE, related_name="profile")

    def save(self):
        self.timestamps = datetime.now()
        super(Profile, self).save()


class Avatar(models.Model):
    timestamps = models.DateTimeField()
    image = models.Model(Profile, on_delete=models.CASCADE, related_name="avatar")

    def save(self):
        self.timestamps = datetime.now()
        super(Avatar, self).save()