import os
from celery import Celery
from celery.schedules import crontab


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "smartCRM.settings")

app = Celery("smartCRM")
app.config_from_object("django.conf:settings", namespace="CELERY")

app.autodiscover_tasks()

app.conf.beat_schedule = {
    'my-super-sum-every-5-min' : {
                # Регистрируем задачу. Для этого в качестве значения ключа task
                # Указываем полный путь до созданного нами ранее таска(функции)
        'task': 'api.tasks.supper_sum',
                 # Периодичность с которой мы будем запускать нашу задачу
                 # minute='*/5' - говорит о том, что задача должна выполнятся каждые 5 мин.
        'schedule': crontab(minute='*/1'),
                # Аргументы которые будет принимать функция
                # 'args': (5, 8),
    }
}


@app.task(bind=True)
def debug_task(self):
    print("Request: {0!r}".format(self.request))