CREATE DATABASE database_agua;

USE database_agua;


/* usuarios */
CREATE TABLE users(
    id INT (11) NOT NULL,
    username VARCHAR (50) NOT NULL,
    password VARCHAR (50) NOT NULL,
    fullname VARCHAR (50) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);


ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users;


/* pedidos */
CREATE TABLE pedidos(
    id INT(11) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    Pedido VARCHAR(50) NOT NULL,
    Direccion VARCHAR(50) NOT NULL,
    Numero VARCHAR(50) NOT NULL,
    Sector VARCHAR(100) NOT NULL,
    Punto VARCHAR (100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE pedidos
  ADD PRIMARY KEY (id);

ALTER TABLE pedidos
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;