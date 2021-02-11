from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class ChildrenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Children
        fields = '__all__'


class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avatar
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'



class ProfileSerializer(serializers.ModelSerializer):
    avatar = AvatarSerializer(many=True)
    role_id = RoleSerializer()
    children = ChildrenSerializer(many=True)

    class Meta:
        model = Profile
        fields = '__all__'


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"


class ProjectReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectReminder
        fields = "__all__"


class ProjectCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectComment
        fields = "__all__"


class ProjectFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectFile
        fields = "__all__"


class ProjectTaskFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectTaskFile
        fields = "__all__"


class ProjectTaskSerializer(serializers.ModelSerializer):
    project_task_file = ProjectTaskFileSerializer(many=True)

    class Meta:
        model = ProjectTask
        fields = "__all__"


class ProjectSerializer(serializers.ModelSerializer):
    """for the list projects full information"""
    project_file = ProjectFileSerializer(many=True)
    project_reminder = ProjectReminderSerializer(many=True)
    project_comment = ProjectCommentSerializer(many=True)
    project_task = ProjectTaskSerializer(many=True)

    class Meta:
        model = Project
        fields = "__all__"


class ProjectSimpleSerializer(serializers.ModelSerializer):
    """for the list projects without full information"""
    class Meta:
        model = Project
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = '__all__'
