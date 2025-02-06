

CREATE TABLE usuario (
    dni               VARCHAR(10) PRIMARY KEY,
    nom_nombre        VARCHAR(250) NOT NULL,
    nom_apellido      VARCHAR(250) NOT NULL,
    rol               VARCHAR(20)  NOT NULL,
    cuenta_correo     VARCHAR(250) NOT NULL UNIQUE,
    cuenta_contrasena VARCHAR(20) NOT NULL
);


CREATE TABLE direccion (
    id_direccion     INT(4) PRIMARY KEY AUTO_INCREMENT,
    dni_usuario      VARCHAR(10) NOT NULL,
    calle_primaria   VARCHAR(60) NOT NULL,
    calle_segundaria VARCHAR(60),
    referencia       TEXT        NOT NULL,
    ciudad           VARCHAR(25) NOT NULL,
    N_casa           INT(6),
    provincia        VARCHAR(25) NOT NULL,
    cod_postal       INT(6)      NOT NULL,
    pais             VARCHAR(60) NOT NULL,
    FOREIGN KEY (dni_usuario) REFERENCES usuario(dni)
);


CREATE TABLE tarjeta (
    N_tarjeta    VARCHAR(15) PRIMARY KEY,
    dni_usuario  VARCHAR(10) NOT NULL,
    tipo         VARCHAR(10) NOT NULL,
    cvc          INT(3)      NOT NULL,
    fecha_venci  DATE        NOT NULL,
    FOREIGN KEY (dni_usuario) REFERENCES usuario(dni)
);


CREATE TABLE inventario (
    codigo_inventario INT(9) PRIMARY KEY AUTO_INCREMENT,
    cantidad          INT(6) NOT NULL
);


CREATE TABLE articulo (
    codigo_articulo     INT(9)        PRIMARY KEY AUTO_INCREMENT,
    codigo_inventario   INT(9),
    precio              DECIMAL(9, 2) NOT NULL,
    descripcion         TEXT,
    marca               VARCHAR(60),
    modelo              VARCHAR(60),
    url_img             TEXT,
    FOREIGN KEY (codigo_inventario) REFERENCES inventario(codigo_inventario)
);


CREATE TABLE factura (
    n_factura  INT(9) PRIMARY KEY AUTO_INCREMENT,
    fecha      DATE NOT NULL
);


CREATE TABLE pago (
    codigo_pago  INT(9)      PRIMARY KEY AUTO_INCREMENT,
    metodo_pago  VARCHAR(20) NOT NULL,
    estado       VARCHAR(20) NOT NULL
);


CREATE TABLE pedido (
    n_pedido      INT(9)       PRIMARY KEY AUTO_INCREMENT,
    dni_usuario   VARCHAR(10),
    codigo_pago   INT(9)       NOT NULL,
    num_factura   INT(9)       NOT NULL,
    FOREIGN KEY (dni_usuario)  REFERENCES usuario(dni),
    FOREIGN KEY (codigo_pago)  REFERENCES pago(codigo_pago),
    FOREIGN KEY (num_factura)  REFERENCES factura(n_factura)
);


CREATE TABLE detalle_pedido (
    id_detalle      INT(9) PRIMARY KEY AUTO_INCREMENT,
    N_articulos     INT(5) NOT NULL,
    codigo_pedido   INT(9) NOT NULL,
    codigo_articulo INT(9) NOT NULL,
    FOREIGN KEY (codigo_pedido)   REFERENCES pedido(n_pedido),
    FOREIGN KEY (codigo_articulo) REFERENCES articulo(codigo_articulo)
);


CREATE TABLE oferta (
    id_oferta    INT(9)       PRIMARY KEY,
    nombre       VARCHAR(60)  NOT NULL,
    tipo         VARCHAR(60)  NOT NULL,
    valor        DECIMAL(9,2) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin    DATE NOT NULL
);


CREATE TABLE detalle_oferta (
    id   INT(9) PRIMARY KEY AUTO_INCREMENT,
    id_oferta INT(9),
    id_articulo INT(9),
    FOREIGN KEY (id_oferta) REFERENCES oferta(id_oferta),
    FOREIGN KEY (id_articulo) REFERENCES articulo(codigo_articulo)
);
