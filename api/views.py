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


class PutWorkNowView(viewsets.ModelViewSet):
    queryset = WorkNow.objects.all()
    serializer_class = WorkNowSerializer
    perms = ['all']

    def put(self, request):
        instance = WorkNow.objects.get(pk=int(request.data['id']))
        instance.start = request.data.get('start', instance.start)
        instance.finish = request.data.get('finish', instance.finish)
        instance.other = request.data.get('other', instance.other)
        instance.date = request.data.get('date', instance.date)
        instance.save()
        return Response({'message':'Updated', 'type':'success'})


class DeleteWorkNowView(viewsets.ModelViewSet):
    queryset = WorkNow.objects.all()
    serializer_class = WorkNowSerializer
    perms = ['all']

    def delete(self, request):
        instance = WorkNow.objects.get(pk=int(request.data['id']))
        instance.delete()
        return Response({'message':'Work Now has been deleted', 'type':'success'})


class PostWorkNowView(viewsets.ModelViewSet):
    queryset = WorkNow.objects.all()
    serializer_class = WorkNowSerializer
    perms = ['all']

    def post(self, request):
        serializer = WorkNowSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'message': 'Invalid fields', 'type': 'error'})


class GetWorkNowByDateView(viewsets.ModelViewSet):
    queryset = WorkNow.objects.all()
    serializer_class = WorkNowSerializer
    perms = ['all']

    def post(self, request):
        if request.data['action'] == 'user':
            queryset = WorkNow.objects.filter(
                date=request.data['date'],
                user_id=int(request.data['user_id'])
            )
        elif request.data['action'] == 'project':
            queryset = WorkNow.objects.filter(
                date=request.data['date'],
                project_id=int(request.data['project_id'])
            )
        serializer = WorkNowSerializer(queryset, many=True)
        return Response(serializer.data)


class PostNestedTaskFile(viewsets.ModelViewSet):
    queryset = ProjectNestedTaskFile.objects.all()
    serializer_class = ProjectNestedTaskFileSerializer
    perms = ['all']

    def post(self, request):
        for value in request.FILES:
            serializer = ProjectNestedTaskFileSerializer(
                data={'project_nested_task_id': int(request.data['project_nested_task_id']), 'file': request.FILES[value]})
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Files is downloaded'}, status=status.HTTP_201_CREATED)


class DeleteNestedTaskFile(viewsets.ModelViewSet):
    queryset = ProjectNestedTaskFile.objects.all()
    serializer_class = ProjectNestedTaskFileSerializer
    perms = ['all']

    def delete(self, request):
        instance = ProjectNestedTaskFile.objects.get(pk=int(request.data['id']))
        instance.delete()
        return Response({'message': 'File has been deleted', 'type': "success"})



class PostNestedTask(viewsets.ModelViewSet):
    queryset = ProjectNestedTask.objects.all()
    serializer_class = ProjectNestedTaskSerializer
    perms = ['all']

    def post(self, request):
        serializer = ProjectNestedTaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Task has been created', 'type': 'success'})
        return Response({'message': 'Invalid values', 'type': 'error'})


class PutNestedTask(viewsets.ModelViewSet):
    queryset = ProjectNestedTask.objects.all()
    serializer_class = ProjectNestedTaskSerializer
    perms = ['all']

    def put(self, request):
        instance = ProjectNestedTask.objects.get(pk=int(request.data['id']))
        instance.name = request.data.get('name', instance.name)
        instance.description = request.data.get('description', instance.description)
        instance.status = request.data.get('status', instance.status)
        try:
            user_worker = User.objects.get(pk=int(request.data.get('worked_user_id', instance.worked_user_id.id)))
            instance.worked_user_id = user_worker
        except:
           pass
        instance.save()
        return Response({'message': 'Nested task has been updated', 'type': 'success'})



class DeleteNestedTask(viewsets.ModelViewSet):
    queryset = ProjectNestedTask.objects.all()
    serializer_class = ProjectNestedTaskSerializer
    perms = ['all']

    def delete(self, request):
        instance = ProjectNestedTask.objects.get(pk=int(request.data['id']))
        instance.delete()
        return Response({'message': 'Nested task has been deleted', 'type': "success"})


class PostTaskView(viewsets.ModelViewSet):
    queryset = ProjectTask.objects.all()
    serializer_class = ProjectTaskSerializer
    perms = ['all']

    def post(self, request):
        serializer = ProjectTaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Task has been created', 'type':'success'})
        return Response({'message':'Invalid values', 'type':'error'})


class PutTaskView(viewsets.ModelViewSet):
    queryset = ProjectTask.objects.all()
    serializer_class = ProjectTaskSerializer
    perms = ['all']

    def put(self, request):
        instance = ProjectTask.objects.get(pk=int(request.data['id']))
        instance.name = request.data.get('name', instance.name)
        instance.save()
        return Response({'message':'Task has been updated', 'type':'success'})


class DeleteTaskView(viewsets.ModelViewSet):
    queryset = ProjectTask.objects.all()
    serializer_class = ProjectTaskSerializer
    perms = ['all']

    def delete(self, request):
        instance = ProjectTask.objects.get(pk=int(request.data['id']))
        instance.delete()
        return Response({'message':'Task has been deleted', 'type':"success"})


class PostProjectCommentView(viewsets.ModelViewSet):
    queryset = ProjectComment.objects.all()
    serializer_class = ProjectCommentSerializer
    perms = ['all']

    def post(self, request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        serializer = ProjectCommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Comment has been created", "type": "success"})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetNotificationView(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    perms = ['all']

    def post(self, request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        queryset = Notification.objects.filter(pk__in=request.data['ids'])[::-1]
        serializer = NotificationSerializer(queryset, many=True)
        return Response(serializer.data)

class PutNotificationReadView(viewsets.ModelViewSet):
    queryset = NotificationRead.objects.all()
    serializer_class = NotificationReadSerializer
    perms = ['all']

    def put(self, request):
        for id in request.data["ids"]:
            instance = NotificationRead.objects.get(pk=int(id))
            if request.data['action'] == "readed":
                instance.on_read = True
                instance.save()
        return Response({'message': "Notifications has been readed", 'type':"success"})



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
    perms = ['all']

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
    perms = ['all']

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
    perms = ['all']

    def put(self, request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        profile = Profile.objects.get(pk=int(request.data['profile_id']))
        role = Role.objects.get(pk=int(request.data['role_id']))
        profile.role_id = role
        profile.save()
        return Response({'message': "Role has been chenged"})


class GetEventsView(viewsets.ModelViewSet):
    """Get events"""
    # permission_classes = (IsAuthenticated,)
    queryset = Events.objects.all()
    serializer_class = EventsSerializer
    perms = ['all']

    def get(self, request):
        from itertools import chain
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        myself = Events.objects.filter(user_id=token.user.id, for_events="myself")
        creater = Events.objects.filter(user_id=token.user.id)
        all = Events.objects.filter(for_events="all")
        group = Events.objects.filter(for_events=token.user.profile.role_id.value)
        result_list = list(chain(myself, all, group, creater))
        res = []
        [res.append(x) for x in result_list if x not in res]
        serializer = EventsSerializer(res, many=True)
        return Response(serializer.data)

class DeleteEventsView(viewsets.ModelViewSet):
    """Get events"""
    # permission_classes = (IsAuthenticated,)
    queryset = Events.objects.all()
    serializer_class = EventsSerializer
    perms = ['all']

    def delete(self, request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        instance = Events.objects.filter(user_id=token.user.id, pk=int(request.data['id'])).first()
        instance.delete()
        return Response({'message':"Event has been deleted", 'type':"success"})


class PostEventsView(viewsets.ModelViewSet):
    """Get events"""
    # permission_classes = (IsAuthenticated,)
    queryset = Events.objects.all()
    serializer_class = EventsSerializer
    perms = ['all']

    def post(self, request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        serializer = EventsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':"Event has been created", 'type':"success"})
        return Response({'message':"Invalid fields", 'type':"error"})


class PutEventsView(viewsets.ModelViewSet):
    """Get events"""
    # permission_classes = (IsAuthenticated,)
    queryset = Events.objects.all()
    serializer_class = EventsSerializer
    perms = ['all']

    def put(self, request):
        token = get_token(request)
        spc = SystemPermissionsControl(token.user, self.perms)
        if not spc.permission():
            return Response({'message': "You don't have permissions"})
        instance = Events.objects.get(pk=int(request.data['id']))
        instance.title = request.data.get("title", instance.title)
        instance.url = request.data.get("url", instance.url)
        instance.backgroundColor = request.data.get("backgroundColor", instance.backgroundColor)
        instance.for_events = request.data.get("for_events", instance.for_events)
        instance.save()
        return Response({'message': "Event has been updated", 'type':"success"})