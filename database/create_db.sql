
use webshop;


CREATE TABLE USERS (
  u_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

  u_firstname VARCHAR(25) NOT NULL,
  u_lastname VARCHAR(25) NOT NULL,

  u_adress VARCHAR(25) NOT NULL,
  u_plz VARCHAR(10) NOT NULL,
  u_city VARCHAR(25) NOT NULL,

  u_mail VARCHAR(30) NOT NULL,
  u_username VARCHAR(20) NOT NULL,

  u_password BINARY(64) NOT NULL,
  u_pw_salt CHAR(16) NOT NULL,

  u_isadmin BOOL DEFAULT 0,

  CONSTRAINT UNIQUE u_username_is_unique(u_username)
);

CREATE TABLE CATEGORIES (
  c_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  c_name VARCHAR(20) NOT NULL
);

CREATE TABLE PRODUCTS (
  p_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  p_name VARCHAR(40) NOT NULL,
  p_price DECIMAL(8,2) NOT NULL,
  p_imagepath VARCHAR(100) NOT NULL,

  fk_p_c_id INT NOT NULL,

  CONSTRAINT FOREIGN KEY fk_p_c_product_category(fk_p_c_id) REFERENCES CATEGORIES(c_id),
  INDEX idx_p_name(p_name(10))
);
