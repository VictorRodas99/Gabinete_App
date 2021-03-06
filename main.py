from flask import Flask
from flask import render_template, request
import json
import scrapper as scpr


app = Flask(__name__)

@app.route('/home', methods=["POST", "GET"])
def render():
    if request.method == "POST":
        busqueda = request.form['busqueda']
        busqueda = busqueda.replace(" ", "+")

        url_base_search = "https://www.casanissei.com/py/catalogsearch/result/?q="+busqueda
        url_pibot_search = "https://www.casanissei.com"

        with open("./data.json", "r") as f:
            carrito = json.load(f)
        
        print("_-_-_-_-_-Enviados: ",carrito)

        datos, nombre_producto, img_link = scpr.data(url_base_search, url_pibot_search)
        return render_template("home.html", carrito=carrito, datos=datos, nombre=nombre_producto, img_link=img_link)
    else:
        with open("./data.json", "w") as f:
            f.write("[]")
        
        url_base = "https://www.casanissei.com/py/informatica"
        url_pibot = "https://www.casanissei.com/py/"

        carrito = []
        datos, nombre_producto, img_link = scpr.data(url_base, url_pibot)
        
        return render_template("home.html", carrito=carrito, datos=datos, nombre=nombre_producto, img_link=img_link)


@app.route('/', methods=["POST", "GET"])
def select():
    if request.method == "POST":
        sel = request.json
        
        with open('data.json', 'w') as data:
            json.dump(sel, data)

        print("-------------------------------",sel,"-----------------------------")
        return render_template('sel.html', sel=sel)
    else:
        return render_template('sel.html')      


if __name__=="__main__":    
    app.run(debug=True)