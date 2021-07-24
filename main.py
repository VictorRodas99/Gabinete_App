from flask import Flask
from flask import render_template
import scrapper as scpr


app = Flask(__name__)

@app.route('/', methods=["POST", "GET"])
def render():
    
    return render_template("home.html")



if __name__=="__main__":
    app.run(debug=True)