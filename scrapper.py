from bs4 import BeautifulSoup
import requests
import json

def data(url_base, pibot):
    page = requests.get(url_base)
    soup = BeautifulSoup(page.content, "html.parser")
    main = soup.find_all("main", class_="page-main")
    
    try:
        container = main[0].find_all("div", class_="main-container")
        grid = container[0].find_all("div", class_="products-grid")
        li = grid[0].find_all("li", class_="product-item")
    except IndexError:
        print("Sin resultados")
        return [],[],[]

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

        h1 = main[0].find("h1", class_="page-title")
        name = h1.find("span", class_="base").string

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
            
            detalles = {k.replace(":", ""): v.replace('"', "'") for k, v in detalles.items()}

            precio = info_product[0].find("span", class_="price").text
            detalles['Precio'] = precio

            nombre_producto.append(name)

            for i in range(len(nombre_producto)):
                string = ""
                for j in nombre_producto[i]:
                    if j != '"':
                        string = string+j
                    else:
                        string = string+"'"

                nombre_producto[i] = string

            datos.append(detalles)
        except (AttributeError, IndexError) as e:
            continue

    if len(datos) == 0:
        return [],[],[]
    else:
        return datos, nombre_producto, list_img_link