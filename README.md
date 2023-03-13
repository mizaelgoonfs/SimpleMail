# Simple Mail

Esta é uma aplicação de serviço de e-mail simplificado, feita com ReactJS e consumindo uma API desenvolvida utilizando a linguagem PHP. Para lidar com as requisições ao servidor, foram utilizados os métodos http padrões do PHP.

### Pré-requisitos

Obs.: É necessário antes de executar este projeto, ter instalado e executando as seguintes ferramentas: 

* [O gerenciador de pacotes npm](https://www.npmjs.com/);
* [NodeJS v18.12.0](https://nodejs.org/dist/v18.12.0/);
* [PHP 7.4 (7.4.33) VC15 Thread Safe](https://windows.php.net/download#php-7.4);
-> [Tutorial para instalação](https://www.youtube.com/watch?v=WPPaJienSN0).
* [XAMPP para Windows com suporte para o PHP 7.4.33](https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/7.4.33/);
-> [Tutorial para instalação](https://www.youtube.com/watch?v=rTtb1hkHNBI).
* [Banco de dados - MySQL](https://www.mysql.com/downloads/).

Para excutar o projeto, é necessário colar o pasta do projeto (`SimpleMail`) dentro da pasta `htdocs` no diretório onde o Xampp foi instalado: `xampp/htdocs`.

### Configurando o Banco de Dados

Para iniciar a database, use o `PHPMyAdmin` e execute o script contido no arquivo `api-database.sql`. Esse código cria uma base de dados chamada `api`; cria as tabelas e insere alguns dados de exemplo.

Após isso, verifique se suas credenciais estão corretas no arquivo `db.class.php` no seguinte diretório: `server/classes/db.class.php`

### Iniciando o Servidor

Para iniciar o servidor da aplicação, certifique-se de ter o módulo Apache rodando na porta 80 e o MySQL excutando na porta padrão. Execute estas operações através da acão `Start` em cada opção dentro do programa XAMPP, instalado anteriomente.

### Iniciando o Sliente

Primeiramente, acesse a pasta do cliente:
```sh
cd SimpleMail\client
```

Logo após, instale as dependências do projeto:

```
npm install
```

Em seguida, inicie o cliente da aplicação:

```
npm start
```

Depois disso, seu navegador irá abrir no seguinte endereço: http://localhost:3000
```sh
http://localhost:3000
```

## Rotas disponibilizadas pela API REST

### GET /received-messages/list/:username
Retorna uma lista de mensagens enviadas para o usuário com nome de usuário igual a :username passado por parâmetro.

### GET /sent-messages/list/:username
Retorna uma lista de mensagens que foram enviadas pelo usuário com nome de usuário igual a :username.

#### GET messages/list/:id
Retorna a mensagem com id igual ao passado como parâmetro na URL.

#### POST /messages/send
Permite enviar uma mensagem.

Dados que podem ser enviados na requisição:
- sender: username de quem está enviando a mensagem;
- receiver: username do destinatário da mensagem;
- subject: assunto da mensagem;
- body: conteúdo da mensagem em texto.

```
{
	"sender": "mizaelgoon",
	"receiver": "cerol123",
	"subject": "Trabalho de WebServices",
	"body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
	 do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
	 minim veniam."
}
```

#### DELETE /messages/delete/:id
Realiza a exclusão da mensagem com o id passado por parâmetro.

#### POST /users/login
Permite realizar o login de um usuário.

Dado que pode ser enviado na requisição:
- username: um nome de usuário único;
```
{
	"username": "mizaelgoon"
}
```

#### POST /users/register
Permite realizar o cadastro de um usuário.

Dado que pode ser enviado na requisição:
- username: um nome de usuário único;
```
{
	"username": "mizaelgoonfs"
}
```