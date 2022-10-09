from scraper.core.spiders.scraper import ScraperSpider
from flask import Flask, render_template, request
from scrapy.signalmanager import dispatcher
from scrapy.crawler import CrawlerRunner
from flask_socketio import SocketIO
from scrapy import signals
import crochet
import json

crochet.setup()

app = Flask(__name__)
socket = SocketIO(app)

settings_for_runner = {
    "HTTPCACHE_ENABLED": "False",
    "USER_AGENT": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0"
}

runner = CrawlerRunner(settings_for_runner)
base_url = "https://www.casanissei.com/py/informatica"

def get_saved_data():
    data = {}
    try:
        with open('data.json', 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        pass
    
    return data
    

@app.route('/', methods=['GET', 'POST'])
def render():
    method = request.method

    if method == 'GET':
        scraper(base_url)
        return render_template('home.html', method=method)

    elif method == 'POST':
        query = request.form['searhing'].replace(" ", "+")
        search_url = f"https://www.casanissei.com/py/catalogsearch/result/?q={query}"

        scraper(search_url)

        data = get_saved_data()
        return render_template('home.html', data=data, method=method)


@crochet.run_in_reactor
def scraper(url):
    dispatcher.connect(get_data, signal=signals.spider_closed)
    runner.crawl(ScraperSpider, url=url)


def get_data(spider):
    data = spider.data
    socket.emit('Response', data)


@socket.on('carrito')
def get_carrito(data): 
    carrito = data['carrito']

    with open('data.json', 'w') as f:
        json.dump(carrito, f, indent=4)

if __name__ == '__main__':
    socket.run(app, host='0.0.0.0', debug=True)