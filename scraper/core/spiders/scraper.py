import scrapy


class ScraperSpider(scrapy.Spider):
    name = 'scraper'
    allowed_domains = ['nissei.com']
    base_URL = ''
    start_urls = []
    data = []

    def __init__(self, url='', **kwargs):
        self.base_URL = url
        self.start_urls.append(self.base_URL)
        super().__init__(**kwargs)

    def parse(self, response):
        products = response.css('ol.product-items li')
        products_links = products.css('a.product-item-link::attr(href)').getall()

        max_long = 8
        long_p_links = len(products_links)
        
        if long_p_links < max_long: max_long = long_p_links

        x = 0
        while x < max_long:
            yield scrapy.Request(products_links[x], callback=self.parse_second)
            x+=1
        
    def parse_second(self, response):
        main_container = response.css('div.columns.row')

        name = main_container.css('h1.page-title span.base::text').get()
        price = main_container.css('div.price-box span.price::text').get()
        details = main_container.css('div.value ul li')
        img_link = main_container.css('div.gallery-placeholder__image img::attr(src)').get()

        info = {}
        for d in details:
            key = d.css('::text').get().replace(':', '')
            value = d.css('li::text').get()
            info[key] = value

        data = {
            'name': name,
            'price': price,
            'imgLink': img_link,
            'info': info
        }

        self.data.append(data)

        yield data