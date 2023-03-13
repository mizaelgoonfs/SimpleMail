CREATE DATABASE IF NOT EXISTS api;

USE api;

CREATE TABLE users (
	username VARCHAR(255) PRIMARY KEY
);

CREATE TABLE messages (
	id INT AUTO_INCREMENT PRIMARY KEY,
	sender VARCHAR(255),
	receiver VARCHAR(255),
	subject VARCHAR(255),
	body TEXT,
	reply INT,
	FOREIGN KEY (sender) REFERENCES users(username),
	FOREIGN KEY (receiver) REFERENCES users(username)
);


INSERT INTO `users` (`username`) VALUES ('mizaelgoon');
INSERT INTO `users` (`username`) VALUES ('cerol123');

INSERT INTO `messages` (`id`, `sender`, `receiver`, `subject`, `body`) VALUES (NULL, 'mizaelgoon', 'cerol123', 'Assunto Teste', 'Corpo teste...');
INSERT INTO `messages` (`id`, `sender`, `receiver`, `subject`, `body`) VALUES (NULL, 'cerol123', 'mizaelgoon', 'Assunto Teste 2', 'Corpo teste 2!');