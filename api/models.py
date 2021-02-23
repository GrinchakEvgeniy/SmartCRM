from django.db import models
from datetime import datetime
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class Role(models.Model):
    timestamps = models.CharField(blank=True, null=True, max_length=100)
    name = models.CharField(max_length=100)
    value = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        self.timestamps = datetime.now()
        super(Role, self).save(*args, **kwargs)


class Profile(models.Model):
    timestamps = models.CharField(blank=True,null=True, max_length=100)
    user_id = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile",blank=True,null=True)
    birthday = models.CharField(blank=True,null=True, max_length=100)
    tel_1 = models.CharField(blank=True,null=True, max_length=100)
    tel_2 = models.CharField(blank=True,null=True, max_length=100)
    linkedin = models.CharField(blank=True,null=True, max_length=100)
    github = models.CharField(blank=True,null=True, max_length=100)
    position = models.CharField(blank=True,null=True, max_length=100)
    experience = models.CharField(blank=True,null=True, max_length=100)
    role_id = models.ForeignKey(Role, on_delete=models.CASCADE, related_name="profile", blank=True, null=True)

    def save(self, *args, **kwargs):
        self.timestamps = datetime.now()
        super(Profile, self).save(*args, **kwargs)


class Avatar(models.Model):
    timestamps = models.CharField(blank=True, null=True, max_length=100)
    profile_id = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name="avatar", blank=True, null=True)
    image = models.ImageField(upload_to='avatars/', blank=True, null=True)

    def save(self, *args, **kwargs):
        self.timestamps = datetime.now()
        super(Avatar, self).save(*args, **kwargs)


class Children(models.Model):
    timestamps = models.CharField(blank=True, null=True, max_length=100)
    name = models.CharField(blank=True, null=True, max_length=100)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="children", blank=True, null=True)
    birthday = models.CharField(blank=True, null=True, max_length=100)

    def save(self, *args, **kwargs):
        self.timestamps = datetime.now()
        super(Children, self).save(*args, **kwargs)


class Client(models.Model):
    timestamps = models.CharField(blank=True, null=True, max_length=100)
    name = models.CharField(max_length=100)
    contact_data = models.CharField(max_length=1000)

    def save(self, *args, **kwargs):
        self.timestamps = datetime.now()
        super(Client, self).save(*args, **kwargs)

# =================================PROJECT================================================
class Project(models.Model):
    timestamps = models.CharField(blank=True, null=True, max_length=100)
    users_list = models.CharField(blank=True, null=True, max_length=1000)
    name = models.CharField(max_length=100)
    description = models.TextField()
    accesses = models.CharField(max_length=1000, blank=True, null=True)
    client_id = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='project', blank=True, null=True)
    status = models.CharField(blank=True, null=True, max_length=100)

    def save(self, *args, **kwargs):
        self.timestamps = datetime.now()
        super(Project, self).save(*args, **kwargs)


class ProjectFile(models.Model):
    timestamps = models.CharField(blank=True, null=True, max_length=100)
    file = models.FileField(upload_to='files/', blank=True, null=True)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="project_file")

    def save(self, *args, **kwargs):
        self.timestamps = datetime.now()
        super(ProjectFile, self).save(*args, **kwargs)


class ProjectReminder(models.Model):
    timestamps = models.CharField(blank=True, null=True, max_length=100)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="project_reminder")
    description = models.CharField(max_length=1000)

    def save(self, *args, **kwargs):
        self.timestamps = datetime.now()
        super(ProjectReminder, self).save(*args, **kwargs)


class ProjectComment(models.Model):
    timestamps = models.CharField(blank=True, null=True, max_length=100)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="project_comment")
    description = models.CharField(max_length=1000)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="project_comment")

    def save(self, *args, **kwargs):
        self.timestamps = datetime.now()
        super(ProjectComment, self).save(*args, **kwargs)


class ProjectTask(models.Model):
    timestamps = models.CharField(blank=True, null=True, max_length=100)
    name = models.CharField(blank=True, null=True, max_length=500)
    description = models.CharField(max_length=1000)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="project_task")
    user_work = models.ForeignKey(User, on_delete=models.CASCADE, related_name="project_task")

    def save(self, *args, **kwargs):
        self.timestamps = datetime.now()
        super(ProjectTask, self).save(*args, **kwargs)



class ProjectTaskFile(models.Model):
    timestamps = models.CharField(blank=True, null=True, max_length=100)
    project_task_id = models.ForeignKey(ProjectTask, on_delete=models.CASCADE, related_name="project_task_file")
    file = models.FileField(upload_to='tasks_files/')

    def save(self, *args, **kwargs):
        self.timestamps = datetime.now()
        super(ProjectTaskFile, self).save(*args, **kwargs)

# ================================PROJECT END========================================


class Events(models.Model):
    timestamps = models.CharField(blank=True, null=True, max_length=100)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="events")
    title = models.CharField(blank=True, null=True, max_length=100)
    url = models.CharField(blank=True, null=True, max_length=300)
    start = models.CharField(blank=True, null=True, max_length=300)
    end = models.CharField(blank=True, null=True, max_length=300)
    backgroundColor = models.CharField(blank=True, null=True, max_length=10)
    for_events = models.CharField(blank=True, null=True, max_length=20)

    def save(self, *args, **kwargs):
        self.timestamps = datetime.now()
        super(Events, self).save(*args, **kwargs)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, *args, **kwargs):
    if created:
        role = Role.objects.get(value="G")
        profile = Profile.objects.create(user_id=instance, role_id=role, position="Guest")
        Avatar.objects.create(profile_id=profile)
        instance.first_name = "New User"
        instance.save()
    instance.profile.save()