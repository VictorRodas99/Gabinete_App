# Gabinete_App

Proyecto donde se realiza una PWA (Progressive web app)

## Requerimientos:

1. Flask
2. BeautifulSoup

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
source env/bin/activate
```

<p>5. Instalar requerimientos.</p>

```bash
pip install Flask
pip install beautifulsoup4
```

<p>6. Correr el server.</p>

```bash
python main.py
```