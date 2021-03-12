import os
from celery import Celery
from celery.schedules import crontab


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "smartCRM.settings")

app = Celery("smartCRM")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.conf.update(result_expires=3600,
                enable_utc=True,
                timezone='Europe/Kiev', )



app.conf.beat_schedule = {
    'my-super-sum-every-5-min': {
        'task': 'api.tasks.supper_sum',
        'schedule': crontab(hour='6, 18',
                            minute=0,),
                # Аргументы которые будет принимать функция
                # 'args': (5, 8),
    }
}
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print("Request: {0!r}".format(self.request))