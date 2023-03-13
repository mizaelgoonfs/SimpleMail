<?php

header('Access-Control-Allow-Origin: *'); //Permitir requisições a partir de qualquer Host
header('Content-type: application/json'); 
header('Access-Control-Allow-Methods: *'); //Permitir requisições de qualquer tipo
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');

date_default_timezone_set("America/Sao_Paulo");

$method = $_SERVER['REQUEST_METHOD'];

//Faz o include das serviços da API
include_once "api/users/users.class.php";
include_once "api/messages/messages.class.php";

//Faz o include de todos os arquivos do diretório classes.
include_once "classes/autoload.class.php";
new Autoload();

# Rotas

$route = new Routes();
//$route->add('GET', '/messages/list', 'Messages::listAll');
$route->add('GET', '/received-messages/list/[PARAM]', 'Messages::listReceivedMessages');
$route->add('GET', '/sent-messages/list/[PARAM]', 'Messages::listSentMessages');
$route->add('GET', '/messages/list/[PARAM]', 'Messages::listUnique');
$route->add('POST', '/messages/send', 'Messages::send');
//$route->add('PUT', '/messages/update/[PARAM]', 'Messages::update');
$route->add('DELETE', '/messages/delete/[PARAM]', 'Messages::delete');
$route->add('POST', '/users/login', 'Users::login');
$route->add('POST', '/users/register', 'Users::register');
// $route->add('PUT', '/users/update/[PARAM]', 'Users::update');
// $route->add('DELETE', '/users/delete/[PARAM]', 'Users::delete');
$route->go($_GET['path']);

?>