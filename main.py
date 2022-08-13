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

settings_for_runner = {
    "HTTPCACHE_ENABLED": "False",
    "USER_AGENT": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0"
}

runner = CrawlerRunner(settings_for_runner)
base_url = "https://www.casanissei.com/py/informatica"

@app.route('/', methods=['GET', 'POST'])
def render():
    method = request.method

    if method == 'GET':
        scraper(base_url)

    elif method == 'POST':
        query = request.form['searhing'].replace(" ", "+")
        search_url = f"https://www.casanissei.com/py/catalogsearch/result/?q={query}"

        scraper(search_url)

    return render_template('new_home.html')


@crochet.run_in_reactor
def scraper(url):
    dispatcher.connect(get_data, signal=signals.spider_closed)
    runner.crawl(ScraperSpider, url=url)


socket.on('event')
def get_data(spider):
    data = spider.data
    socket.emit('Response', data)


if __name__ == '__main__':
    socket.run(app, host='0.0.0.0', debug=True)