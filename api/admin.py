from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Project)
admin.site.register(ProjectTask)
admin.site.register(ProjectComment)
admin.site.register(ProjectReminder)
admin.site.register(ProjectTaskFile)
admin.site.register(ProjectFile)
admin.site.register(Client)
