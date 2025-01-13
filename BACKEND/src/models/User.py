from flask_login import UserMixin
from connect import (
    get_db_connection,
)


class User(UserMixin):
    def __init__(self, dni, nombre, apellido, correo, rol):
        self.dni = dni  # Usamos la cédula (dni) como el identificador
        self.nombre = nombre
        self.apellido = apellido
        self.correo = correo
        self.rol = rol

    @staticmethod
    def get(dni):
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "SELECT dni, nom_nombre, nom_apellido, cuenta_correo, rol FROM usuario WHERE dni = ?",
            (dni,),
        )
        user_data = cur.fetchone()
        conn.close()

        if user_data:
            return User(
                *user_data
            )  # Devuelve una instancia de la clase User con los datos recuperados.
        return None

    def get_id(self):
        return str(self.dni)  # Usamos la cédula (dni) como el id del usuario
