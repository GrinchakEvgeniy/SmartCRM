# import logging
from celery import shared_task
from smartCRM.celery import app
import requests
from loguru import logger
# logger.debug('Error')
# logger.info('Information message')
# logger.warning('Warning')

# logger = logging.getLogger()


@app.task
def events():
    res = requests.get("http://api.icndb.com/jokes/random").json()
    joke = res["value"]["joke"]
    logger.add('logs/logs2.log', format="{time} {level} - {message}")
    logger.info(joke)

@shared_task
def get_random_joke():
    res = requests.get("http://api.icndb.com/jokes/random").json()
    joke = res["value"]["joke"]
    logger.info(joke)
    return joke