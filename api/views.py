from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, viewsets
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import *


# ================================================
class SystemPermissionsControl:

    def __init__(self, user, perms):
        self.profile_founded = False
        try:
            profile = Profile.objects.get(user_id=user.id)
            self.user_role_class = profile.role_id.value
            self.perms = perms
            self.profile_founded = True
        except:
            pass

    def permission(self):
        if self.profile_founded:
            for item in self.perms:
                if item == 'all':
                    return True
                if item == self.user_role_class:
                    return True
        return False
# ===============================================


def get_token(request):
    return Token.objects.get(key=request.COOKIES['userToken'])

# ==============================================


class PutAvatarView(viewsets.ModelViewSet):
    queryset = Avatar.objects.all()
    serializer_class = AvatarSerializer
    perms = ['all']

    def put(self, request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        instance = Avatar.objects.get(pk=int(request.data['id']))
        instance.image = request.FILES.get('image', instance.image)
        instance.save()
        return Response({'message': "Avatar has been updated"})


class PostRolesView(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    perms = ['S']

    def post(self,request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        serializer = RoleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':"Role has been created"})


class GetRolesView(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    perms = ['S']

    def get(self, request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        queryset = Role.objects.all()
        serializer = RoleSerializer(queryset, many=True)
        return Response(serializer.data)


class PostFilesProjectView(viewsets.ModelViewSet):
    queryset = ProjectFile.objects.all()
    serializer_class = ProjectFileSerializer
    perms = ['all']

    def post(self, request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        for value in request.FILES:
            serializer = ProjectFileSerializer(
                data={'project_id': int(request.data['project_id']), 'file': request.FILES[value]})
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Files is downloaded'}, status=status.HTTP_201_CREATED)


class DeleteFilesProjectView(viewsets.ModelViewSet):
    queryset = ProjectFile.objects.all()
    serializer_class = ProjectFileSerializer
    perms = ['all']

    def delete(self, request, format=None):
        for id in request.data['ids']:
            ProjectFile.objects.get(pk=int(id)).delete()
        return Response({'message': 'Files is deleted'}, status=status.HTTP_201_CREATED)




class DeleteClientView(viewsets.ModelViewSet):
    """Update client"""
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    perms = ['all']

    def delete(self, request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        for i in request.data["id"]:
            instance = Client.objects.get(pk=int(i))
            instance.delete()
        serializer = ClientSerializer(Client.objects.all()[::-1], many=True)
        return Response(serializer.data)


class PutClientsView(viewsets.ModelViewSet):
    """Update client"""
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    perms = ['all']

    def put(self, request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        instance = Client.objects.get(pk=int(request.data['id']))
        instance.name = request.data.get('name', instance.name)
        instance.contact_data = request.data.get('contact_data', instance.contact_data)
        instance.save()
        serializer = ClientSerializer(instance)
        return Response(serializer.data)


class PostClientsView(viewsets.ModelViewSet):
    """Created client"""
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    perms = ['all']

    def post(self, request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            queryset = Client.objects.all()[::-1]
            serializer = ClientSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response({'message': "Error, not valid fields"})


class GetClientsView(viewsets.ModelViewSet):
    """Get list clients"""
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    perms = ['all']

    def get(self, request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        queryset = Client.objects.all()[::-1]
        serializer = ClientSerializer(queryset, many=True)
        return Response(serializer.data)


class GetClientView(viewsets.ModelViewSet):
    """Get one client"""
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    perms = ['all']

    def get(self, request, pk):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        instance = Client.objects.get(pk=pk)
        serializer = ClientSerializer(instance)
        return Response(serializer.data)


class PostProjectsSimpleView(viewsets.ModelViewSet):
    """Created projects without full information"""
    queryset = Project.objects.all()
    serializer_class = ProjectSimpleSerializer
    perms = ['PM', 'S']

    def post(self, request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        serializer = ProjectSimpleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            queryset = Project.objects.all()[::-1]
            serializer_ = ProjectSimpleSerializer(queryset, many=True)
            return Response(serializer_.data)
        return Response({'message': "Error, not valid fields"})


class DeleteProjectsSimpleView(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSimpleSerializer
    perms = ['PM', 'S']

    def delete(self, request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        instance = Project.objects.get(pk=int(request.data['id']))
        instance.delete()
        return Response({'message': "Project has been delete"})


class PutProjectsSimpleView(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSimpleSerializer
    perms = ['PM', 'S']

    def put(self, request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        instance = Project.objects.get(pk=int(request.data['id']))
        instance.users_list = request.data.get('users_list', instance.users_list)
        instance.name = request.data.get('name', instance.name)
        instance.description = request.data.get('description', instance.description)
        instance.accesses = request.data.get('accesses', instance.accesses)
        instance.status = request.data.get('status', instance.status)
        instance.save()
        serializer = ProjectSimpleSerializer(instance)
        return Response(serializer.data)


class GetProjectsSimpleView(viewsets.ModelViewSet):
    """Get projects without full information"""
    queryset = Project.objects.all()
    serializer_class = ProjectSimpleSerializer
    perms = ['all']

    def get(self, request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        queryset = Project.objects.all()[::-1]
        serializer = ProjectSimpleSerializer(queryset, many=True)
        return Response(serializer.data)

class GetProjectSimpleView(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSimpleSerializer
    perms = ['PM', 'D', 'S', 'L']

    def get(self, request, pk):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        instance = Project.objects.get(pk=pk)
        serializer = ProjectSimpleSerializer(instance)
        return Response(serializer.data)


class GetProjectView(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    perms = ['PM', 'D', 'S', 'L']

    def get(self, request, pk):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        instance = Project.objects.get(pk=pk)
        serializer = ProjectSerializer(instance)
        return Response(serializer.data)


class GetUserView(viewsets.ModelViewSet):
    """ Class get user information for render into dashboard """
    # permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
    perms = ['all']

    def get(self, request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        serializer = UserSerializer(token.user)
        return Response(serializer.data)


class GetUsersView(viewsets.ModelViewSet):
    """ Class get users """
    # permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
    perms = ['all']

    def get(self, request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)


class PutUserView(viewsets.ModelViewSet):
    """Update user data"""
    # permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
    perms = ['all']

    def put(self, request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        user_instance = User.objects.get(pk=int(request.data["id"]))
        user_instance.first_name = request.data.get("first_name", user_instance.first_name)
        user_instance.last_name = request.data.get("last_name", user_instance.last_name)
        user_instance.email = request.data.get("email", user_instance.email)
        user_instance.save()

        profile_instance = Profile.objects.get(pk=int(request.data["profile"]['id']))
        profile_instance.birthday = request.data["profile"].get("birthday",  profile_instance.birthday)
        profile_instance.tel_1 = request.data["profile"].get("tel_1",  profile_instance.tel_1)
        profile_instance.tel_2 = request.data["profile"].get("tel_2",  profile_instance.tel_2)
        profile_instance.linkedin = request.data["profile"].get("linkedin",  profile_instance.linkedin)
        profile_instance.github = request.data["profile"].get("github",  profile_instance.github)
        profile_instance.position = request.data["profile"].get("position",  profile_instance.position)
        profile_instance.experience = request.data["profile"].get("experience",  profile_instance.experience)
        profile_instance.save()

        child_keys = []
        for child in request.data["profile"]["children"]:
            if 'id' in child:
                children_instance = Children.objects.get(pk=int(child["id"]))
                children_instance.name = child.get("name", children_instance.name)
                children_instance.birthday = child.get("birthday", children_instance.birthday)
                children_instance.save()
                child_keys.append(children_instance.id)
            else:
                new_child = Children(name=child["name"], birthday=child["birthday"], profile=profile_instance)
                new_child.save()
                child_keys.append(new_child.id)

        children_all = Children.objects.filter(profile=profile_instance.id)
        for item_child in children_all:
            founded = False
            for id in child_keys:
                if id == item_child.id:
                    founded = True
                    break
            if not founded:
                item_child.delete()

        new_instance = User.objects.get(pk=int(request.data["id"]))
        serializer = UserSerializer(new_instance)
        return Response(serializer.data)


class PostUserView(viewsets.ModelViewSet):
    """Create user"""
    # permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSimpleSerializer
    perms = ['S']

    def post(self, request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions", "type": "warning"})
        serializer = UserSimpleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': "User has been created", "type": "success"})
        return Response({'message': "Error, not valid fields", "type": "error"})


class DeleteUsersView(viewsets.ModelViewSet):
    """ Delete user """
    # permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSimpleSerializer
    perms = ['S']

    def delete(self, request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        instance = User.objects.get(pk=int(request.data['id']))
        instance.delete()
        return Response({'message': "User has been deleted"})


class ChangeUserRoleView(viewsets.ModelViewSet):
    """ Change Role user """
    # permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSimpleSerializer
    perms = ['S']

    def put(self, request):
        # token = get_token(request)
        # spc = SystemPermissionsControl(token.user, self.perms)
        # if not spc.permission():
        #     return Response({'message': "You don't have permissions"})
        profile = Profile.objects.get(pk=int(request.data['profile_id']))
        role = Role.objects.get(pk=int(request.data['role_id']))
        profile.role_id = role
        profile.save()
        return Response({'message': "Role has been chenged"})