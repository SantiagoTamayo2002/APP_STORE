from flask import Flask, jsonify, request, session
import mariadb
from flask_cors import CORS
from connect import get_db_connection
from werkzeug.security import generate_password_hash, check_password_hash

# //////////////////////////////////////////////////////////////////////////////////////////
# /////////////////////////////////////////////////////////////////////////////////////////

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])
app.secret_key = 'tu_clave_secreta_super_segura'
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_USE_SIGNER"] = True


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
            dni = user[2]

            # Verificar si la contraseña proporcionada coincide con el hash almacenado
            if check_password_hash(stored_hash, contraseña):
                # Devolver los datos reales del usuario
                return (
                    jsonify(
                        {
                            "success": True,
                            "message": "Inicio de sesión exitoso",
                            "user": {
                                "correo": correo,  # Usar el correo proporcionado
                                "nombre": user[0],  # Nombre del usuario
                                "apellido": user[1],  # Apellido del usuario
                                "dni": user[2],  # DNI del usuario
                            },
                        }
                    ),
                    200,
                )
            else:
                return jsonify({"message": "Credenciales incorrectas"}), 200
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
    callePrimaria = data.get("callePrimaria")
    calleSegundaria = data.get("calleSegundaria")
    referencia = data.get("referencia")
    ciudad = data.get("ciudad")
    nCasa = data.get("nCasa")
    provincia = data.get("provincia")
    codPostal = data.get("codPostal")
    pais = data.get("pais")
    nTarjeta = data.get("nTarjeta")
    tipoTarjeta = data.get("tipoTarjeta")
    cvc = data.get("cvc")
    fechaVenci = data.get("fechaVenci")

    if contraseña != contraseña2:
        return jsonify({"message": "Las contraseñas no coinciden"}), 400

    hashed_password = generate_password_hash(contraseña)

    conn = get_db_connection()
    if not conn:
        return jsonify({"message": "Error al conectar con la base de datos"}), 500

    try:
        cur = conn.cursor()
        # Insertar usuario
        cur.execute(
            "INSERT INTO usuario (dni, nom_nombre, nom_apellido, rol, cuenta_correo, cuenta_contrasena) "
            "VALUES (?, ?, ?, ?, ?, ?)",
            (dni, nombre, apellido, "Cliente", correo, hashed_password),
        )
        # Insertar dirección
        cur.execute(
            "INSERT INTO direccion (dni_usuario, calle_primaria, calle_segundaria, referencia, ciudad, N_casa, provincia, cod_postal, pais) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (
                dni,
                callePrimaria,
                calleSegundaria,
                referencia,
                ciudad,
                nCasa,
                provincia,
                codPostal,
                pais,
            ),
        )
        # Insertar tarjeta
        cur.execute(
            "INSERT INTO tarjeta (N_tarjeta, dni_usuario, tipo, cvc, fecha_venci) "
            "VALUES (?, ?, ?, ?, ?)",
            (nTarjeta, dni, tipoTarjeta, cvc, fechaVenci),
        )
        conn.commit()
        return jsonify({"message": "Usuario registrado con éxito"}), 201
    except mariadb.IntegrityError as e:
        return jsonify({"message": f"Error: de Integrity {str(e)}"}), 400
    except Exception as e:
        return jsonify({"message": f"Error inesperado: {str(e)}"}), 500
    finally:
        conn.close()


@app.route("/perfil/<dni>", methods=["GET"])
def obtener_perfil(dni):
    conn = get_db_connection()
    if not conn:
        return jsonify({"message": "Error al conectar con la base de datos"}), 500

    try:
        cur = conn.cursor(dictionary=True)
        # Obtener datos del usuario
        cur.execute("SELECT * FROM usuario WHERE dni = ?", (dni,))
        usuario = cur.fetchone()

        if not usuario:
            return jsonify({"message": "Usuario no encontrado"}), 404

        # Obtener dirección del usuario
        cur.execute("SELECT * FROM direccion WHERE dni_usuario = ?", (dni,))
        direccion = cur.fetchone()

        # Obtener tarjeta del usuario
        cur.execute("SELECT * FROM tarjeta WHERE dni_usuario = ?", (dni,))
        tarjeta = cur.fetchone()

        return (
            jsonify(
                {
                    "usuario": usuario,
                    "direccion": direccion,
                    "tarjeta": tarjeta,
                }
            ),
            200,
        )
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

#////////////////////////////////////////////////////////////////

@app.route("/articles", methods=["POST"])
def add_article():
    data = request.get_json()
    print(data)
    conn = get_db_connection()
    if not conn:
        return jsonify({"message": "Error al conectar con la base de datos"}), 500
    try:
        cur = conn.cursor()
        cur.execute(
            f"""INSERT INTO articulo (precio, descripcion, marca, modelo, url_img)
                VALUES ({data["precio"]}, 
                       '{data["descripcion"]}', 
                        '{data["marca"]}', 
                        '{data["modelo"]}', 
                        '{data["url_img"]}')"""
        )
        conn.commit()
        return jsonify({"message": "Artículo agregado con éxito"}), 201
    finally:
        conn.close()

#////////////////////////////////////////////////////////////////



@app.route("/add_offer", methods=["POST"])
def add_offer():
    data = request.get_json()
    nombre = data.get("nombre")
    tipo = data.get("tipo")
    valor = data.get("valor")
    fecha_inicio = data.get("fecha_inicio")
    fecha_fin = data.get("fecha_fin")
    articulos = data.get(
        "articulos"
    )  # Lista de códigos de artículos asociados a la oferta

    conn = get_db_connection()
    if not conn:
        return jsonify({"message": "Error al conectar con la base de datos"}), 500

    try:
        cur = conn.cursor()

        # Insertar la oferta
        cur.execute(
            "INSERT INTO oferta (nombre, tipo, valor, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?, ?)",
            (nombre, tipo, valor, fecha_inicio, fecha_fin),
        )
        conn.commit()

        # Obtener el ID de la oferta recién insertada
        cur.execute("SELECT LAST_INSERT_ID()")
        id_oferta = cur.fetchone()[0]

        # Insertar los artículos asociados a la oferta
        for articulo_id in articulos:
            cur.execute(
                "INSERT INTO detalle_oferta (id_oferta, id_articulo) VALUES (?, ?)",
                (id_oferta, articulo_id),
            )

        conn.commit()
        return jsonify({"message": "Oferta creada exitosamente"}), 201

    except Exception as e:
        return jsonify({"message": f"Error inesperado: {str(e)}"}), 500
    finally:
        conn.close()


@app.route("/update_offer/<int:id>", methods=["PUT"])
def update_offer(id):
    data = request.get_json()
    nombre = data.get("nombre")
    tipo = data.get("tipo")
    valor = data.get("valor")
    fecha_inicio = data.get("fecha_inicio")
    fecha_fin = data.get("fecha_fin")
    articulos = data.get(
        "articulos"
    )  # Lista de códigos de artículos asociados a la oferta

    conn = get_db_connection()
    if not conn:
        return jsonify({"message": "Error al conectar con la base de datos"}), 500

    try:
        cur = conn.cursor()

        # Actualizar los datos de la oferta
        cur.execute(
            """UPDATE oferta 
               SET nombre = ?, tipo = ?, valor = ?, fecha_inicio = ?, fecha_fin = ? 
               WHERE id_oferta = ?""",
            (nombre, tipo, valor, fecha_inicio, fecha_fin, id),
        )

        # Eliminar los artículos existentes relacionados con esta oferta
        cur.execute("DELETE FROM detalle_oferta WHERE id_oferta = ?", (id,))

        # Insertar los nuevos artículos asociados a la oferta
        for articulo_id in articulos:
            cur.execute(
                "INSERT INTO detalle_oferta (id_oferta, id_articulo) VALUES (?, ?)",
                (id, articulo_id),
            )

        conn.commit()
        return jsonify({"message": "Oferta actualizada exitosamente"}), 200

    except Exception as e:
        return jsonify({"message": f"Error inesperado: {str(e)}"}), 500
    finally:
        conn.close()


@app.route("/delete_offer/<int:id>", methods=["DELETE"])
def delete_offer(id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"message": "Error al conectar con la base de datos"}), 500

    try:
        cur = conn.cursor()

        # Eliminar los artículos relacionados con esta oferta
        cur.execute("DELETE FROM detalle_oferta WHERE id_oferta = ?", (id,))

        # Eliminar la oferta
        cur.execute("DELETE FROM oferta WHERE id_oferta = ?", (id,))
        conn.commit()

        return jsonify({"message": "Oferta eliminada con éxito"}), 200

    except Exception as e:
        return jsonify({"message": f"Error inesperado: {str(e)}"}), 500
    finally:
        conn.close()


@app.route("/get_offers", methods=["GET"])
def get_offers():
    conn = get_db_connection()
    if not conn:
        return jsonify({"message": "Error al conectar con la base de datos"}), 500

    try:
        cur = conn.cursor()
        # Consulta que trae todas las ofertas con sus artículos relacionados, incluyendo el precio original
        cur.execute(
            """
            SELECT o.id_oferta, o.nombre, o.tipo, o.valor, o.fecha_inicio, o.fecha_fin, 
                   a.codigo_articulo, a.descripcion, a.url_img, a.precio
            FROM oferta o
            JOIN detalle_oferta dof ON o.id_oferta = dof.id_oferta
            JOIN articulo a ON dof.id_articulo = a.codigo_articulo
        """
        )

        offers = cur.fetchall()
        formatted_offers = []
        current_offer = None

        for offer in offers:
            if current_offer is None or current_offer["id_oferta"] != offer[0]:
                if current_offer:
                    formatted_offers.append(current_offer)
                current_offer = {
                    "id_oferta": offer[0],
                    "nombre": offer[1],
                    "tipo": offer[2],
                    "valor": offer[3],
                    "fecha_inicio": offer[4],
                    "fecha_fin": offer[5],
                    "articulos": [],
                }

            original_price = offer[9]
            discount_percentage = round(
                offer[3], 2
            )  # Valor ya representa el porcentaje
            discount_price = original_price - (
                original_price * (discount_percentage / 100)
            )

            current_offer["articulos"].append(
                {
                    "codigo_articulo": offer[6],
                    "descripcion": offer[7],
                    "url_img": offer[8],
                    "precio_original": original_price,
                    "precio_oferta": round(discount_price, 2),
                    "descuento_porcentaje": discount_percentage,
                }
            )

        if current_offer:
            formatted_offers.append(current_offer)

        return jsonify(formatted_offers), 200
    except Exception as e:
        return jsonify({"message": f"Error inesperado: {str(e)}"}), 500
    finally:
        conn.close()


# /////////////////////////////////////////////////////////////////
#                         ADD_TO_CART

@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    codigo_articulo = data.get('codigo_articulo')
    cantidad = data.get('cantidad')
    dni_usuario = session.get('dni')
    print("usuario con dni:" , dni_usuario)

    if not codigo_articulo or not dni_usuario or not cantidad:
        return jsonify({"error": "El código de artículo, la cantidad y el DNI del usuario son requeridos"}), 400

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("SELECT n_factura FROM factura WHERE n_factura IN (SELECT num_factura FROM pedido WHERE dni_usuario = %s)", (dni_usuario,))
        factura = cur.fetchone()
        if factura:
            num_factura = factura[0]
        else:
            cur.execute("INSERT INTO factura (fecha) VALUES (CURDATE())")
            conn.commit()
            num_factura = cur.lastrowid
            print(num_factura)
        cur.execute("SELECT codigo_pago FROM pago WHERE codigo_pago IN (SELECT codigo_pago FROM pedido WHERE dni_usuario = %s)", (dni_usuario,))
        pago = cur.fetchone()

        if pago:
            codigo_pago = pago[0]
        else:
            cur.execute("INSERT INTO pago (metodo_pago, estado) VALUES ('Pendiente', 'En proceso')")
            print("pardo4")
            conn.commit()
            codigo_pago = cur.lastrowid

        cur.execute("SELECT n_pedido FROM pedido WHERE dni_usuario = %s", (dni_usuario,))
        pedido = cur.fetchone()

        if pedido:
            codigo_pedido = pedido[0]
        else:
            cur.execute("INSERT INTO pedido (dni_usuario, codigo_pago, num_factura) VALUES (%s, %s, %s)", 
                        (dni_usuario, codigo_pago, num_factura))
            conn.commit()
            codigo_pedido = cur.lastrowid

        cur.execute("INSERT INTO detalle_pedido (N_articulos, codigo_pedido, codigo_articulo) VALUES (%s, %s, %s)",
                    (cantidad, codigo_pedido, codigo_articulo))
        conn.commit()

        return jsonify({"message": "Artículo agregado al carrito exitosamente", "pedido_id": codigo_pedido}), 201

    except mariadb.Error as e:
        print(f"Error al interactuar con la base de datos: {e}")
        return jsonify({"error": "Ocurrió un error al agregar el artículo"}), 500

    finally:
        if conn:
            conn.close()


# /////////////////////////////////////////////////////////////////////////////////////////
# /////////////////////////////////////////////////////////////////////////////////////////
#                   GET_CART
@app.route('/api/pedido/articulos', methods=['GET'])
def get_articulos_por_pedido():
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"error": "Error al conectar con la base de datos"}), 500

        cur = conn.cursor(dictionary=True)

        dni_usuario = session.get('dni')
        if not dni_usuario:
            return jsonify({"error": "Usuario no autenticado"}), 401

        cur.execute("SELECT n_pedido FROM pedido WHERE dni_usuario = %s ORDER BY n_pedido DESC LIMIT 1", (dni_usuario,))
        pedido = cur.fetchone()

        if not pedido:
            return jsonify({"error": "No se encontró un pedido para este usuario"}), 404

        codigo_pedido = pedido['n_pedido']

        query = """
            SELECT 
                a.codigo_articulo, 
                a.descripcion, 
                a.precio, 
                a.marca, 
                a.modelo, 
                a.url_img, 
                SUM(dp.N_articulos) AS cantidad
            FROM detalle_pedido dp
            JOIN articulo a ON a.codigo_articulo = dp.codigo_articulo
            WHERE dp.codigo_pedido = %s
            GROUP BY a.codigo_articulo, a.descripcion, a.precio, a.marca, a.modelo, a.url_img;
        """
        cur.execute(query, (codigo_pedido,))
        articulos = cur.fetchall()

        cur.close()
        conn.close()

        return jsonify(articulos), 200 if articulos else 404

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Ocurrió un error en el servidor"}), 500

# /////////////////////////////////////////////////////////////////

@app.route('/generate_invoice', methods=['POST'])
def generate_invoice():
    dni = session.get('dni')

    conn = get_db_connection()
    if not conn:
        return jsonify({"message": "Error al conectar con la base de datos"}), 500

    try:
        cur = conn.cursor(dictionary=True)

        # Obtener pedidos del usuario
        cur.execute("SELECT n_pedido FROM pedido WHERE dni_usuario = %s", (dni,))
        pedidos = cur.fetchall()

        if not pedidos:
            return jsonify({"message": "No se encontraron pedidos para este usuario"}), 404

        total_amount = 0
        invoice_details = []

        for pedido in pedidos:
            cur.execute("""
                SELECT a.codigo_articulo, a.descripcion, a.marca, a.modelo, a.precio, dp.N_articulos 
                FROM detalle_pedido dp
                JOIN articulo a ON dp.codigo_articulo = a.codigo_articulo
                WHERE dp.codigo_pedido = %s
            """, (pedido['n_pedido'],))

            detalles = cur.fetchall()

            for detalle in detalles:
                subtotal = detalle['precio'] * detalle['N_articulos']
                total_amount += subtotal
                invoice_details.append({
                    "articulo": {
                        "codigo_articulo": detalle['codigo_articulo'],
                        "descripcion": detalle['descripcion'],
                        "marca": detalle['marca'],
                        "modelo": detalle['modelo'],
                        "precio": detalle['precio']
                    },
                    "cantidad": detalle['N_articulos'],
                    "subtotal": subtotal
                })

        return jsonify({
            "success": True,
            "total_amount": total_amount,
            "invoice_details": invoice_details
        }), 200

    except Exception as e:
        return jsonify({"message": f"Error inesperado: {str(e)}"}), 500

    finally:
        conn.close()



if __name__ == "__main__":
    connection = get_db_connection()
    if connection:
        connection.close()
    app.run(debug=True)
