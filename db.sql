CREATE DATABASE react_login_express;
USE react_login_express;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id VARCHAR(100) PRIMARY KEY,
  username VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(50) NOT NULL,
  password VARCHAR(75) NOT NULL
);

INSERT INTO usuarios(id, username, name, password) VALUES 
  (1, 'luissdev', 'Luis Sanchez', '1234'),
  (2, 'anderson', 'Anderson Ramirez', '1234');