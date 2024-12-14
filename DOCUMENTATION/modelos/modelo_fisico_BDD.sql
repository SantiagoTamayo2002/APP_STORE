CREATE TABLE articulo (
    codigo      INT(4) NOT NULL AUTO_INCREMENT,
    tipo        VARCHAR(70),
    marca       VARCHAR(150),
    modelo      VARCHAR(150),
    descripcion VARCHAR(500),
    url_img     TEXT,
    precio      DECIMAL(9, 2) NOT NULL,
    inventario_inventario_id INT NOT NULL,
    inventario_id INT(4) NOT NULL,
    PRIMARY KEY (codigo)
);

CREATE TABLE detalle_oferta (
    id              INT(6) NOT NULL,
    descripcion     VARCHAR(250),
    articulo_codigo INT(4) NOT NULL,
    oferta_id       INT(4) NOT NULL,
    PRIMARY KEY (id, articulo_codigo, oferta_id)
);

CREATE TABLE detalle_pedido (
    codigo          INT(9),
    N_articulos     INT(5),
    pedido_codigo   VARCHAR(50) NOT NULL,
    articulo_codigo INT(4) NOT NULL
);

CREATE TABLE direccion (
    id INT(9)        NOT NULL,
    calle_primaria   VARCHAR(50) NOT NULL,
    calle_segundaria VARCHAR(50) NOT NULL,
    ciudad           VARCHAR(50) NOT NULL,
    provincia        VARCHAR(50) NOT NULL,
    cod_postal       INT NOT NULL,
    barrio           VARCHAR(150) NOT NULL,
    N_casa           INT(5),
    usuario_dni      INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE factura (
    n_factura      INT(5) NOT NULL,
    pedido_codigo  VARCHAR(50) NOT NULL,
    PRIMARY KEY (n_factura),
    UNIQUE INDEX factura_idx (pedido_codigo)
);

CREATE TABLE inventario (
    cantidad INT(4) NOT NULL,
    id INT(4) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE oferta (
    id INT(4) NOT NULL,
    tipo VARCHAR(150) NOT NULL,
    valor VARCHAR(50) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE pago (
    id_pago INT(9) NOT NULL,
    metodo_pago VARCHAR(50),
    estado VARCHAR(50),
    id_pedido VARCHAR(50),
    pedido_codigo VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_pago),
    UNIQUE INDEX pago_idx (pedido_codigo)
);

CREATE TABLE pedido (
    codigo VARCHAR(50) NOT NULL,
    numero_pedido DECIMAL(100) NOT NULL,
    fecha_pedido DATE NOT NULL,
    usuario_dni INT NOT NULL,
    PRIMARY KEY (codigo)
);

CREATE TABLE tarjeta (
    N_tarjeta BIGINT NOT NULL,
    cvc INT(3) NOT NULL,
    fecha_venci DATE NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    usuario_dni INT NOT NULL,
    PRIMARY KEY (N_tarjeta)
);

CREATE TABLE usuario (
    dni INT NOT NULL,
    nom_nombre VARCHAR(250) NOT NULL,
    nom_apellido VARCHAR(250) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    cuenta_correo VARCHAR(250) NOT NULL,
    cuenta_contrasena VARCHAR(250) NOT NULL,
    PRIMARY KEY (dni)
);

ALTER TABLE articulo
    ADD CONSTRAINT articulo_inventario_fk FOREIGN KEY (inventario_id)
    REFERENCES inventario (id);

ALTER TABLE detalle_oferta
    ADD CONSTRAINT detalle_oferta_articulo_fk FOREIGN KEY (articulo_codigo)
    REFERENCES articulo (codigo);

ALTER TABLE detalle_oferta
    ADD CONSTRAINT detalle_oferta_oferta_fk FOREIGN KEY (oferta_id)
    REFERENCES oferta (id);

ALTER TABLE detalle_pedido
    ADD CONSTRAINT detalle_pedido_articulo_fk FOREIGN KEY (articulo_codigo)
    REFERENCES articulo (codigo);

ALTER TABLE detalle_pedido
    ADD CONSTRAINT detalle_pedido_pedido_fk FOREIGN KEY (pedido_codigo)
    REFERENCES pedido (codigo);

ALTER TABLE direccion
    ADD CONSTRAINT direccion_usuario_fk FOREIGN KEY (usuario_dni)
    REFERENCES usuario (dni);

ALTER TABLE factura
    ADD CONSTRAINT factura_pedido_fk FOREIGN KEY (pedido_codigo)
    REFERENCES pedido (codigo);

ALTER TABLE pago
    ADD CONSTRAINT pago_pedido_fk FOREIGN KEY (pedido_codigo)
    REFERENCES pedido (codigo);

ALTER TABLE pedido
    ADD CONSTRAINT pedido_usuario_fk FOREIGN KEY (usuario_dni)
    REFERENCES usuario (dni);

ALTER TABLE tarjeta
    ADD CONSTRAINT tarjeta_usuario_fk FOREIGN KEY (usuario_dni)
    REFERENCES usuario (dni);
