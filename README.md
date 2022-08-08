# Gabinete_App

Proyecto donde se realiza una Página web de búsqueda de productos electrónicos

## Requerimientos:

1. Versión de python 3.6 o superior
2. Flask
3. BeautifulSoup

# Instrucciones para levantar el proyecto

<p>1. Clonar el repositorio.</p>

```bash
git clone https://github.com/VictorRodas99/Gabinete_App.git
```

<p>2. Moverte al directorio del repositorio.</p>

```bash
cd Gabinete_App
```

<p>3. Crear el virtualenv.</p>

```bash
python -m virtualenv env
```

## En el caso de no contar con virtualenv

```bash
pip install virtualenv
```

<p>4. Activar el virtualenv.</p>

- Para windows

```bash
cd env
cd Scripts
activate.bat
cd ..
cd ..
```

- Para linux

```bash
source ./env/bin/activate
```

<p>5. Instalar requerimientos.</p>

```bash
pip install -r requirements.txt
```

<p>6. Correr el server.</p>

```bash
export FLASK_APP=main
export FLASK_ENV=development
flask run
```

<p>O sino (en el directorio raíz)</p>
```bash
python main.py
```