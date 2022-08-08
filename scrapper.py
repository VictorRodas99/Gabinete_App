from bs4 import BeautifulSoup
import requests

def get_products_links(container) -> list:
    list_links = []
    len_container = len(container)
    max = 8

    if len_container < 8: max = len_container

    x = 0
    while x < max: #MAX LONG 8
        link = container[x].find("a", class_="product-item-link")
        list_links.append(link.attrs['href'])
        x+=1

    return list_links

def get_product_data(link:str) -> tuple:
    page = requests.get(link)
    soup = BeautifulSoup(page.content, "html.parser")
    
    main = soup.find("div", class_="column")
    main_info = main.find("div", class_="product-info-price")
    container_details = main_info.find("div", class_="value").find("ul")

    name = main.find("h1", class_="page-title").find("span", class_="base").string
    price = main_info.find("span", class_="price").string
    info = container_details.find_all("li")
    img_link = main.find("div", class_="gallery-placeholder__image").find("img").attrs['src']

    name.replace('"', "'")

    return name, price, info, img_link

def transform_data(info:list) -> dict:
    data = {}

    i = 0
    while i < len(info): 
        key = info[i].strong.text.replace(":", "")
        value = info[i].text.replace(key, "")

        if value[0] == " ":
            value = value[2::]
        
        data[key] = value
        i+=1
    
    return data


def data(url_base:str):
    page = requests.get(url_base)
    soup = BeautifulSoup(page.content, "html.parser")
    main = soup.find("div", class_="column")
    grid = main.find("div", class_="products-grid")

    try:
        products_list = grid.find_all("li", class_="product-item")
    except AttributeError:
        print("Sin resultados")
        return [], [], []

    list_links = get_products_links(products_list)

    products_name = []
    data = []
    img_links = []

    iter_links = iter(list_links)
    while True:
        try:
            link = next(iter_links)
            name, price, info, img_link = get_product_data(link)
            
            info_dict = transform_data(info)
            info_dict['Precio'] = price

            products_name.append(name)
            data.append(info_dict)
            img_links.append(img_link)

        except StopIteration: break
    
    if len(data) == 0:
        return [], [], []
    else:
        return data, products_name, img_links