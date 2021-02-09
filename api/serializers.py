from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *


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

    class Meta:
        model = Profile
        fields = '__all__'




class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=True)


    class Meta:
        model = User
        fields = '__all__'
