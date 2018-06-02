-- use webshop;

CREATE TABLE IF NOT EXISTS USERS (
  u_id INT  AUTO_INCREMENT PRIMARY KEY,

  u_appellation VARCHAR(10)  NOT NULL,
  u_firstname  VARCHAR(25)  NOT NULL,
  u_lastname   VARCHAR(25)  NOT NULL,

  u_address     VARCHAR(25)  NOT NULL,
  u_plz        VARCHAR(10)  NOT NULL,
  u_city       VARCHAR(25)  NOT NULL,

  u_mail       VARCHAR(30)  NOT NULL,
  u_username   VARCHAR(20)  NOT NULL,

  u_password   VARCHAR(255) NOT NULL,

  u_isActive   BOOL DEFAULT 1,
  u_isadmin    BOOL DEFAULT 0,

  CONSTRAINT UNIQUE u_username_is_unique(u_username)
);

CREATE TABLE IF NOT EXISTS PAYMENT_METHOD (
  py_id        INT AUTO_INCREMENT PRIMARY KEY,
  py_method    TEXT NOT NULL,
  fk_py_u_user INT  NOT NULL,
  CONSTRAINT FOREIGN KEY fk_py_u_pays_with(fk_py_u_user) REFERENCES USERS (u_id)
);

CREATE TABLE IF NOT EXISTS COUPON (
  c_id        INT PRIMARY KEY AUTO_INCREMENT,
  c_code      char(5) NOT NULL,
  c_value     DECIMAL(8, 2)   DEFAULT 0,
  fk_c_u_user INT             DEFAULT NULL,
  CONSTRAINT FOREIGN KEY fk_c_u_hasCoupon(fk_c_u_user) REFERENCES USERS (u_id)
);


CREATE TABLE IF NOT EXISTS CATEGORIES (
  c_id   INT AUTO_INCREMENT PRIMARY KEY,
  c_slug VARCHAR(10) NOT NULL,
  c_name VARCHAR(20) NOT NULL
);


CREATE TABLE IF NOT EXISTS PRODUCTS (
  p_id        INT AUTO_INCREMENT PRIMARY KEY,
  p_name      VARCHAR(40)    NOT NULL,
  p_price     DECIMAL(10, 2) NOT NULL,
  p_imagepath VARCHAR(100)   NOT NULL,
  p_rating    INT DEFAULT 0,
  fk_p_c_id   INT DEFAULT NULL,
  INDEX idx_p_name(p_name(10))
);

CREATE TABLE IF NOT EXISTS PRODUCT_TO_CATEGORY (
  p_id INT NOT NULL,
  c_id INT NOT NULL,
  CONSTRAINT PRIMARY KEY (p_id, c_id),
  CONSTRAINT FOREIGN KEY fk_p_id(p_id) REFERENCES PRODUCTS (p_id),
  CONSTRAINT FOREIGN KEY fk_c_id(c_id) REFERENCES CATEGORIES (c_id)
);

CREATE TABLE IF NOT EXISTS INVOICE (
  i_id             INT AUTO_INCREMENT PRIMARY KEY,
  i_invoice_number LONG           NOT NULL,
  i_sum            DECIMAL(10, 2) NOT NULL,
  i_timestamp      TIMESTAMP      NOT NULL,
  fk_i_u_id        INT            NOT NULL,
  CONSTRAINT FOREIGN KEY fk_i_c_ordered_by(fk_i_u_id) REFERENCES USERS (u_id)
);

CREATE TABLE IF NOT EXISTS ORDER_POSITION (
  op_id      INT AUTO_INCREMENT PRIMARY KEY,
  op_count   INT NOT NULL,
  fk_op_p_id INT NOT NULL,
  fk_op_i_id INT NOT NULL,
  CONSTRAINT FOREIGN KEY fk_op_p_ordered_product(fk_op_p_id) REFERENCES PRODUCTS (p_id),
  CONSTRAINT FOREIGN KEY fk_op_i_from_invoice(fk_op_i_id) REFERENCES INVOICE (i_id)
);
