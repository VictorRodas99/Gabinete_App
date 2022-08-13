from scraper.core.spiders.scraper import ScraperSpider
from flask import Flask, render_template, request
from scrapy.signalmanager import dispatcher
from scrapy.crawler import CrawlerRunner
from flask_socketio import SocketIO
from scrapy import signals
import crochet

crochet.setup()

app = Flask(__name__)
socket = SocketIO(app)
runner = CrawlerRunner(settings=None)
base_url = "https://www.casanissei.com/py/informatica"
#search_url = "https://www.casanissei.com/py/catalogsearch/result/?q="+busqueda

@app.route('/')
def render():
    scraper(base_url)
    return render_template('new_home.html')


@crochet.run_in_reactor
def scraper(url):
    dispatcher.connect(get_data, signal=signals.spider_closed)
    runner.crawl(ScraperSpider, url=url)


socket.on('event')
def get_data(spider):
    data = spider.data
    print(data[0]['name'], end="\n\n") #Debug

    socket.emit('Response', data)


if __name__ == '__main__':
    socket.run(app, host='0.0.0.0', debug=True)