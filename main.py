from flask import Flask, render_template, request, send_from_directory
from tools.scraper.core.spiders.scraper import ScraperSpider
from tools.excel_writer import create_excel_file
from scrapy.signalmanager import dispatcher
from scrapy.crawler import CrawlerRunner
from flask_socketio import SocketIO
from scrapy import signals
import requests
import crochet

crochet.setup()

app = Flask(__name__)
socket = SocketIO(app)

settings_for_runner = {
    "HTTPCACHE_ENABLED": "False",
    "USER_AGENT": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0"
}

runner = CrawlerRunner(settings_for_runner)
base_url = "http://www.casanissei.com/py/informatica"
excel_path = "data/productos.xlsx"

def page_status():
    try:
        code = requests.get(base_url).status_code
    except requests.exceptions.ConnectionError:
        code = 503
    
    return code

@app.route('/', methods=['GET', 'POST'])
def render():
    method = request.method

    if method == 'GET':
        code = page_status()
        if code < 400:
            scraper(base_url)
        else:
            socket.emit('Response', {})
            return render_template("temporal_debug.html", code=code)

    elif method == 'POST':
        query = request.form['searhing'].replace(" ", "+")
        search_url = f"https://www.casanissei.com/py/catalogsearch/result/?q={query}"

        if page_status() < 400:
            scraper(search_url)
        else:
            socket.emit('Response', {})

    return render_template('new-home.html')


@app.route('/product', methods=['GET', 'POST'])
def render_product():
    return render_template('product.html')


@app.route('/file', methods=['GET'])
def send_file():
    try:
        abs_path, filename = excel_path.split('/')
        return send_from_directory(f'{abs_path}/', filename)
    except FileNotFoundError:
        return render_template('error.html'), 404


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

    for product in carrito:
        del product['total']

    headers = ['Nombre', 'Precio']

    create_excel_file(excel_path, headers, carrito)
    socket.emit('carrito', { 'url': 'file' })


if __name__ == '__main__':
    socket.run(app, host='0.0.0.0', debug=True)