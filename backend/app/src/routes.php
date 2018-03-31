<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

$app->get('/hello[/[{name}]]', function (Request $request, Response $response, array $args){
    $this->logger->info("Hello World 'hello' route");
    $hello["world"] = "hello ".$args['name'];
    return $response->withJson($hello);
});
