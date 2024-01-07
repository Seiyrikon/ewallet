DROP DATABASE IF EXISTS EWALLET_DB;
CREATE DATABASE EWALLET_DB;

USE EWALLET_DB;

DROP TABLE IF EXISTS tbl_user_mst;
CREATE TABLE tbl_user_mst (
	user_id INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    del_flag int(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL
);

DROP TABLE IF EXISTS tbl_personal_info_mst;
CREATE TABLE tbl_personal_info_mst(
	pi_id INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT(9) UNSIGNED NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    middle_name VARCHAR(20) NULL,
    last_name VARCHAR(20) NULL,
    del_flag int(1) NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES tbl_user_mst (user_id)
);

DROP TABLE IF EXISTS tbl_wallet_mst;
CREATE TABLE tbl_wallet_mst(
	wallet_id INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT(9) UNSIGNED NOT NULL,
    wallet_name VARCHAR(50) NOT NULL,
    wallet_desc VARCHAR(255),
    del_flag int(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY(user_id) REFERENCES tbl_user_mst (user_id)
);

DROP TABLE IF EXISTS tbl_withdraw;
CREATE TABLE tbl_withdraw(
	withdraw_id INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT(9) UNSIGNED NOT NULL,
    wallet_id INT(9) UNSIGNED NOT NULL,
    amount DOUBLE NOT NULL,
    withdraw_desc VARCHAR(255),
    del_flag int(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY(user_id) REFERENCES tbl_user_mst (user_id),
    FOREIGN KEY(wallet_id) REFERENCES tbl_wallet_mst(wallet_id)
);

DROP TABLE IF EXISTS tbl_deposit;
CREATE TABLE tbl_deposit(
	deposit_id INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT(9) UNSIGNED NOT NULL,
    wallet_id INT(9) UNSIGNED NOT NULL,
    amount DOUBLE NOT NULL,
    deposit_desc VARCHAR(255),
    del_flag int(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY(user_id) REFERENCES tbl_user_mst (user_id),
    FOREIGN KEY(wallet_id) REFERENCES tbl_wallet_mst(wallet_id)
);

DROP TABLE IF EXISTS tbl_transaction;
CREATE TABLE tbl_transaction(
	transaction_id INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT(9) UNSIGNED NOT NULL,
    wallet_id INT(9) UNSIGNED NOT NULL,
    transaction_type VARCHAR(10) NOT NULL,
    transaction_amount DOUBLE NOT NULL,
    transaction_desc VARCHAR(255),
    del_flag int(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY(user_id) REFERENCES tbl_user_mst (user_id),
    FOREIGN KEY(wallet_id) REFERENCES tbl_wallet_mst(wallet_id)
);