from bs4 import BeautifulSoup
import requests
import json


def search(org_url):
    page = requests.get("https://www.casanissei.com/py/catalogsearch/result/?q="+org_url)
    soup = BeautifulSoup(page.content, "html.parser")
    main = soup.find_all("main", class_="page-main")

    container = main[0].find_all("div", class_="main-container")
    grid = container[0].find_all("div", class_="products-grid")
    li = grid[0].find_all("li", class_="product-item")


    longitud = len(li)
    list_link = []
    for i in range(longitud):
        data = li[i]
        link_product = data.find_all("a",  class_="product-item-link")
        list_link.append(link_product[0].attrs['href'])

    url_base = "https://www.casanissei.com"
    datos = []
    contador = 0
    for link in list_link:
        contador = contador +1
        print(contador)
        detalles = {}
        url_final = url_base+link
        page = requests.get(url_final)
        soup = BeautifulSoup(page.content, "html.parser")
        main = soup.find_all("main", class_="page-main")

        product = main[0].find_all("div", class_="product media")
        info_product = main[0].find_all("div", class_="product-info-price")

        try:
            detalles_product = info_product[0].find("ul")
            li = detalles_product.find_all("li")    

            c = 0
            for i in li:
                key = li[c].strong.text
                c = c+1
                value = i.text.replace(key, "")
                detalles[key]=value
            

            list_img_link = []
            script = product[0].find("script", type="text/x-magento-init").string
            dic_org = json.loads(script)
            dic_2 = dic_org['[data-gallery-role=gallery-placeholder]']
            dic_3 = dic_2['mage/gallery/gallery']
            dic = dic_3['data']
            dic = dic[0]
            img_src = dic['img']
            list_img_link.append(img_src)
            
            for keys in detalles:
                    values = detalles[keys]
                    detalles[keys] = values[1:]

            precio = info_product[0].find("span", class_="price").text
            detalles['Precio'] = precio

            datos.append(detalles)
        except AttributeError:
            continue



    print(datos)
    #print(list_img_link)


value = input("Ingrese lo que quiere buscar: ")
value = value.replace(" ", "+")

search(value)