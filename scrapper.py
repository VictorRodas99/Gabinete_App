from bs4 import BeautifulSoup
import requests
import json

def data(url_base, pibot):
    page = requests.get(url_base)
    soup = BeautifulSoup(page.content, "html.parser")
    main = soup.find_all("main", class_="page-main")

    container = main[0].find_all("div", class_="main-container")
    try:
        grid = container[0].find_all("div", class_="products-grid")
        li = grid[0].find_all("li", class_="product-item")
    except IndexError:
        d = []
        print("Sin resultados")
        return d

    longitud = len(li)
    list_link = []
    for i in range(longitud):
        data = li[i]
        link_product = data.find_all("a",  class_="product-item-link")
        list_link.append(link_product[0].attrs['href'])

    url_base = pibot
    nombre_producto = []
    datos = []
    list_img_link = []
    contador = 0
    for link in list_link:
        contador = contador +1
        print(contador)
        detalles = {}
        url_final = url_base+link
        page = requests.get(url_final)
        soup = BeautifulSoup(page.content, "html.parser")
        main = soup.find_all("main", class_="page-main")

        name = main[0].find("h1", class_="page-title").text

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
            

            script = product[0].find("script", type="text/x-magento-init").string
            dic_org = json.loads(script)
            dic_2 = dic_org['[data-gallery-role=gallery-placeholder]']
            dic_3 = dic_2['mage/gallery/gallery']
            dic = dic_3['data']
            dic = dic[0]
            img_src = dic['img']
            list_img_link.append(img_src)
            
            for keys in detalles: #por alguna razón las values tenían "\xa0" como primer elemento... entonces lo quitamos aquí
                    values = detalles[keys]
                    detalles[keys] = values[1:]

            precio = info_product[0].find("span", class_="price").text
            detalles['Precio'] = precio

            nombre_producto.append(name)
            datos.append(detalles)
        except AttributeError:
            continue
    
    return datos, nombre_producto, list_img_link

#---------------------Para página principal-------------------------
url_base = "https://www.casanissei.com/py/informatica"
url_pibot = "https://www.casanissei.com/py/" #Para el for
#--------------------------------------------------------------------

#----------------------Para búsqueda--------------------------------
busqueda = "Valor sacado del input del html" #input("Ingrese lo que quiere buscar: ")
busqueda = busqueda.replace(" ", "+")
url_base_search = "https://www.casanissei.com/py/catalogsearch/result/?q="+busqueda
url_pibot_search = "https://www.casanissei.com"
#-------------------------------------------------------------------

#data(url_base_search, url_pibot_search)