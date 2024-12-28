# -*- coding: utf-8 -*-

from flask import Flask, jsonify
import mariadb
from flask_cors import CORS
from connect import get_db_connection

# //////////////////////////////////////////////////////////////////////////////////////////
# /////////////////////////////////////////////////////////////////////////////////////////

app = Flask(__name__)
CORS(app)


def get_article_names():
    conn = get_db_connection()
    if conn:
        cur = conn.cursor()
        cur.execute("SELECT * FROM articulo")
        articles = cur.fetchall()
        conn.close()
        return articles
    else:
        print("sin elementos encontrados")
        return []


@app.route("/")
def index():
    return "<h1> APP </h1>"


@app.route("/add_user")
def agregar_usuarios():
    return "usuario agregado de manera exitosa"


@app.route("/login")
def login():
    return "usuario existente"


@app.route("/update_data_user")
def actualizar_info_usuarios():
    return "credenciales actualizadas de manera correcta"


@app.route("/articles")
def show_articles():
    articles = get_article_names()
    return jsonify(articles)  # Retorna los nombres de los artículos en formato JSON


if __name__ == "__main__":
    # Verificar conexión a la base de datos.
    connection = get_db_connection()
    if connection:
        connection.close()
    app.run(debug=True)
