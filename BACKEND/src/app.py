from flask import Flask, jsonify, request
import mariadb
from flask_cors import CORS
from connect import get_db_connection
from werkzeug.security import generate_password_hash, check_password_hash

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


def get_article_by_id(id):
    conn = get_db_connection()
    if conn:
        cur = conn.cursor()
        cur.execute("SELECT * FROM articulo WHERE id = ?", (id,))
        article = cur.fetchone()
        conn.close()
        return article
    else:
        print("Artículo no encontrado")
        return None


# /////////////////////////////////////////////////////////////////
# /////////////////RUTAS DEL SERVIDOR//////////////////////////////
@app.route("/")
def index():
    return "<h1> SI HAY SERVER :) </h1>"


@app.route("/add_user")
def agregar_usuarios():
    return "usuario agregado de manera exitosa"


@app.route("/update_data_user")
def actualizar_info_usuarios():
    return "credenciales actualizadas de manera correcta"


@app.route("/articles")
def show_articles():
    articles = get_article_names()
    return jsonify(articles)  # Retorna los nombres de los artículos en formato JSON


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    correo = data.get("correo")
    contraseña = data.get("contraseña")
    conn = get_db_connection()
    if not conn:
        return jsonify({"message": "Error al conectar con la base de datos"}), 500

    try:
        cur = conn.cursor()
        cur.execute(
            "SELECT nom_nombre, nom_apellido, dni, cuenta_contrasena FROM usuario WHERE cuenta_correo = ?",
            (correo,),
        )
        user = cur.fetchone()

        if user:
            stored_hash = user[
                3
            ]  # El hash de la contraseña almacenado en la base de datos

            # Verificar si la contraseña proporcionada coincide con el hash almacenado
            if check_password_hash(stored_hash, contraseña):
                return (
                    jsonify(
                        {
                            "success": True,
                            "message": "Inicio de sesión exitoso",
                            "user": {
                                "correo": "HolaMundo@gmail.com",
                                "nombre": "Usuario de Ejemplo",
                            },
                        }
                    ),
                    200,
                )
            else:
                return jsonify({"message": "Credenciales incorrectas"}), 401
        else:
            return jsonify({"message": "Usuario no encontrado"}), 404

    except Exception as e:
        return jsonify({"message": f"Error inesperado: {str(e)}"}), 500
    finally:
        conn.close()


@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    nombre = data.get("nombre")
    apellido = data.get("apellido")
    dni = data.get("dni")
    correo = data.get("correo")
    contraseña = data.get("contraseña")
    contraseña2 = data.get("contraseña2")
    if contraseña != contraseña2:
        return jsonify({"message": "Las contraseñas no coinciden"}), 400
    # Generar el hash de la contraseña
    hashed_password = generate_password_hash(contraseña)

    conn = get_db_connection()
    if not conn:
        return jsonify({"message": "Error al conectar con la base de datos"}), 500
    try:
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO usuario (dni, nom_nombre, nom_apellido, rol, cuenta_correo, cuenta_contrasena)"
            "VALUES (?, ?, ?, ?, ?, ?)",
            (
                dni,
                nombre,
                apellido,
                "Cliente",
                correo,
                hashed_password,
            ),  # Guardamos el hash
        )
        conn.commit()
        return jsonify({"message": "Usuario registrado con éxito"}), 201
    except mariadb.IntegrityError as e:
        return jsonify({"message": "Error: El correo o DNI ya están registrados"}), 400
    except Exception as e:
        return jsonify({"message": f"Error inesperado: {str(e)}"}), 500
    finally:
        conn.close()


@app.route("/articles/<int:id>", methods=["DELETE"])
def delete_article(id):
    conn = get_db_connection()  # HAY CONEXION CON BD?
    if not conn:
        return jsonify({"message": "Error al conectar con la base de datos"}), 500
    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM articulo WHERE codigo_articulo = ?", (id,))
        conn.commit()
        return jsonify({"message": "Artículo eliminado con éxito"}), 200
    except Exception as e:
        return jsonify({"message": f"Error inesperado: {str(e)}"}), 500
    finally:
        conn.close()


@app.route("/articles/<int:id>", methods=["PUT"])
def update_article(id):
    data = request.get_json()
    conn = get_db_connection()
    if not conn:
        return jsonify({"message": "Error al conectar con la base de datos"}), 500
    try:
        cur = conn.cursor()
        cur.execute(
            f"""UPDATE articulo SET precio =       {data["precio"]}, 
                                    descripcion = '{data["descripcion"]}', 
                                    marca =       '{data["marca"]}', 
                                    modelo =      '{data["modelo"]}', 
                                    url_img =     '{data["url_img"]}' WHERE codigo_articulo = {id}""",
        )
        conn.commit()
        return jsonify({"message": "Artículo actualizado con éxito"}), 200
    finally:
        conn.close()


# /////////////////////////////////////////////////////////////////

if __name__ == "__main__":
    connection = get_db_connection()
    if connection:
        connection.close()
    app.run(debug=True)
