CREATE DATABASE react_login_express;
USE react_login_express;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE planes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  price INT NOT NULL
);

CREATE TABLE usuarios (
  id VARCHAR(100) PRIMARY KEY,
  username VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(50) NOT NULL,
  password VARCHAR(75) NOT NULL,
  plan_id INT NOT NULL DEFAULT(1),
  FOREIGN KEY (plan_id) REFERENCES planes(id)
);

INSERT INTO planes(name, price) VALUES
  ('basico', 20000),
  ('premium', 30000),
  ('platino', 40000);

INSERT INTO usuarios(id, username, name, password) VALUES 
  ('257dc023-7b52-4530-8449-e437475e8826', 'luissdev', 'Luis Sanchez', '$2b$12$WZ/6XSWwngd/DuqbwVIP9umQ1uht93tSII4yHlTQu1vx2LLgywmBO'),
  ('257dc023-7b52-4530-8449-e437475e5361', 'anderson', 'Anderson Ramirez', '$2b$12$WZ/6XSWwngd/DuqbwVIP9umQ1uht93tSII4yHlTQu1vx2LLgywmBO');

