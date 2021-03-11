from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Project)
# admin.site.register(ProjectTask)
admin.site.register(ProjectComment)
admin.site.register(ProjectReminder)
# admin.site.register(ProjectTaskFile)
admin.site.register(ProjectFile)
admin.site.register(Client)
admin.site.register(Profile)
admin.site.register(Role)
admin.site.register(Avatar)
admin.site.register(Children)
admin.site.register(Events)
admin.site.register(Notification)
# admin.site.register(NotificationRead)

admin.site.register(ProjectTask)
admin.site.register(ProjectNestedTask)
admin.site.register(ProjectNestedTaskFile)
admin.site.register(WorkNow)
admin.site.register(CompanyInfo)
