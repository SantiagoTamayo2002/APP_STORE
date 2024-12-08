from flask import Flask
import mariadb
from flask_cors import CORS
'''
si les salen mensajes en la importación de módulos que dice que no se pudo resolver, no se preocupen
es por que no puede leer el entorno virtual pero les ejecuta sin problema.
'''

app = Flask(__name__)

def get_db_connection():
    try:
        conn = mariadb.connect(
            user="santi_user",
            password="SANTIAGO",
            host="localhost",
            port=3306,
            database="app_store_database"
        )
        print("Conexión exitosa a la base de datos.")
        return conn
    except mariadb.Error as e:
        print(f"Error conectando a MariaDB: {e}")
        return None

@app.route('/')
def index():
    return '<h1> Pardo vale arta </h1>'  

if __name__ == "__main__":
    # Verificar conexión a la base de datos
    connection = get_db_connection()
    if connection:
        connection.close()
    app.run(debug=True)


