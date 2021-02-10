from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, viewsets
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import *

# ================================================
class SystemPermissionsControl():

    def __init__(self, user, perms):
        profile = Profile.objects.get(user_id=user.id)
        self.user_role_class = profile.role_id.value
        self.perms = perms

    def _permission(self):
        for item in self.perms:
            if item == 'all':
                return True
            if item == self.user_role_class:
                return True
        return False
# ===============================================


def get_token(request):
    return Token.objects.get(key=request.COOKIES['userToken'])



class UserView(viewsets.ModelViewSet):

    ''' Class get user information for render into dashboard '''

    # permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
    perms = ['D']

    def get(self, request):
        token = get_token(request)
        SPC = SystemPermissionsControl(token.user, self.perms)
        if not SPC._permission():
            return Response({'message': "You don't have permissions"})
        serializer = UserSerializer(token.user)
        return Response(serializer.data)
