from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'


class NotificationReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationRead
        fields = '__all__'


class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = '__all__'


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
    avatar = AvatarSerializer()
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


class ProjectNestedTaskFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectNestedTaskFile
        fields = "__all__"


class ProjectNestedTaskSerializer(serializers.ModelSerializer):
    project_nested_task_file = ProjectNestedTaskFileSerializer(many=True)

    class Meta:
        model = ProjectNestedTask
        fields = "__all__"


class ProjectTaskSerializer(serializers.ModelSerializer):
    project_nested_task = ProjectNestedTaskSerializer(many=True)

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
    notification_read = NotificationReadSerializer(many=True)

    class Meta:
        model = User
        fields = '__all__'


class UserSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user