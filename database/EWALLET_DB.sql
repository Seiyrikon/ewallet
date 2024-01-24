DROP DATABASE IF EXISTS EWALLET_DB;
CREATE DATABASE EWALLET_DB;

USE EWALLET_DB;

DROP USER 'ewallet'@'localhost';
CREATE USER 'ewallet'@'localhost' IDENTIFIED BY 'ewallet';
GRANT ALL PRIVILEGES ON EWALLET_DB.* TO 'ewallet'@'localhost';

FLUSH PRIVILEGES;

DROP TABLE IF EXISTS tbl_user_mst;
CREATE TABLE tbl_user_mst (
	user_id INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    del_flag INT(1) NOT NULL DEFAULT 0,
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
    del_flag INT(1) NOT NULL DEFAULT 0,
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
    del_flag INT(1) NOT NULL DEFAULT 0,
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
    del_flag INT(1) NOT NULL DEFAULT 0,
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
    del_flag INT(1) NOT NULL DEFAULT 0,
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
    del_flag INT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY(user_id) REFERENCES tbl_user_mst (user_id),
    FOREIGN KEY(wallet_id) REFERENCES tbl_wallet_mst(wallet_id)
);

DROP TABLE IF EXISTS tbl_user_friend_mst;
CREATE TABLE tbl_user_friend_mst(
	ur_id INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT(9) UNSIGNED NOT NULL,
    friend_id INT(9) UNSIGNED NOT NULL,
    block_flag INT(1) NOT NULL DEFAULT 0,
    del_flag INT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY(user_id) REFERENCES tbl_user_mst (user_id),
    FOREIGN KEY(friend_id) REFERENCES tbl_user_mst (user_id)
);

DROP TABLE IF EXISTS tbl_friend_request_mst;
CREATE TABLE tbl_friend_request_mst (
	fr_id INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    requestor_id INT(9) UNSIGNED NOT NULL,
    requestee_id INT(9) UNSIGNED NOT NULL,
    del_flag INT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY(requestor_id) REFERENCES tbl_user_mst (user_id),
    FOREIGN KEY(requestee_id) REFERENCES tbl_user_mst (user_id)
);

DROP TABLE IF EXISTS tbl_confirm_request_mst;
CREATE TABLE tbl_confirm_request_mst (
	cr_id INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    requested_id INT(9) UNSIGNED NOT NULL,
    requesting_id INT(9) UNSIGNED NOT NULL,
    del_flag INT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY(requested_id) REFERENCES tbl_user_mst (user_id),
    FOREIGN KEY(requesting_id) REFERENCES tbl_user_mst (user_id)
);

DROP TABLE IF EXISTS tbl_chat;
CREATE TABLE tbl_chat(
	c_id INT(9) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    sender_id INT(9) UNSIGNED NOT NULL,
    receiver_id INT(9) UNSIGNED NOT NULL,
    message TEXT NOT NULL,
    del_flag INT(1) NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (sender_id) REFERENCES tbl_user_mst(user_id),
    FOREIGN KEY (receiver_id) REFERENCES tbl_user_mst(user_id)
);

DROP TABLE IF EXISTS tbl_chat_history;
CREATE TABLE tbl_chat_history(
	ch_id INT(9) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT(9) UNSIGNED NOT NULL,
    recipient_id INT(9) UNSIGNED NOT NULL,
    del_flag INT(1) NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES tbl_user_mst(user_id),
    FOREIGN KEY (recipient_id) REFERENCES tbl_user_mst(user_id)
);