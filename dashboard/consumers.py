import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import User
from asgiref.sync import sync_to_async
from api.models import Notification, WorkNow, Profile
import time

@sync_to_async
def get_user(user_id):
    return User.objects.get(pk=int(user_id)).profile.role_id.value

@sync_to_async
def save_new(notification):
    Notification(
        message = notification["message"],
        type_notification = notification["type_notification"],
        from_notification = notification["from_notification"],
        for_notification = notification["for_notification"]
    ).save()

@sync_to_async
def save_last_work(user_id):
    work = WorkNow.objects.filter(user_id=user_id).last()
    if not work.finish:
        work.finish = int(time.time())*1000
        work.save()

@sync_to_async
def set_online_status(user_id, status):
    user_profile = Profile.objects.get(user_id=user_id)
    user_profile.online = status
    user_profile.save()


class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.room_group_name = await get_user(self.user_id)
        self.all_group = "all"

        await set_online_status(self.user_id, True)
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.channel_layer.group_add(
            self.all_group,
            self.channel_name
        )

        await self.channel_layer.group_add(
            str(self.user_id),
            self.channel_name
        )

        await self.accept()

        # await self.channel_layer.group_send(
        #     "all",
        #     {
        #         'type': 'chat_message',
        #         'message': "hello",
        #         'type_notification': "1",
        #         'from_notification': '1',
        #         'for_notification': '1'
        #     }
        # )

    async def disconnect(self, close_code):
        # Leave room group
        await save_last_work(self.user_id)
        await set_online_status(self.user_id, False)

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

        await self.channel_layer.group_discard(
            self.all_group,
            self.channel_name
        )

        await self.channel_layer.group_discard(
            str(self.user_id),
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        type_notification = text_data_json['type_notification']
        from_notification = text_data_json['from_notification']
        for_notification = text_data_json['for_notification']

        await save_new(text_data_json)

        # Send message to room group
        await self.channel_layer.group_send(
            for_notification,
            {
                'type': 'chat_message',
                'message': message,
                'type_notification': type_notification,
                'from_notification': from_notification,
                'for_notification': for_notification
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'type_notification': event['type_notification'],
            'from_notification': event['from_notification'],
            'for_notification': event['for_notification']
        }))