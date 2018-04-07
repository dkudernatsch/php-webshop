<?php

use PDOs\User\UserDAO;
use Slim\Http\Request;
use Slim\Http\Response;

// Routes

$app->get('/hello[/[{name}]]', function (Request $request, Response $response, array $args) {
    $this->logger->info("Hello World 'hello' route");
    $hello["world"] = "hello " . $args['name'];
    return $response->withJson($hello);
});

$app->get('/user/', function (Request $request, Response $response, array $args) {
    $this->logger->info("GET: all users");
    $repo = new UserDAO($this->db);
    $user = $repo->getAll();
    if($user) {
        return $response
            ->withStatus(200)
            ->withJson(["success" => ["users" => $user]]);
    }else{
        return $response
            ->withStatus(404)
            ->withJson(["error" => "User not found"]);
    }
});

$app->get('/user/{id}', function (Request $request, Response $response, array $args) {
    $this->logger->info("GET: user with id " . $args['id']);
    $repo = new UserDAO($this->db);
    $user = $repo->byId($args['id']);
    if($user) {
        return $response
            ->withStatus(200)
            ->withJson(["success" => ["user" => $user]]);
    }else{
        return $response
            ->withStatus(404)
            ->withJson(["error" => "User not found"]);
    }
});


$app->post("/user", function (Request $request, Response $response, array $args) {
    $this->logger->info("POST: creating new user...");
    $body = $request->getParsedBody();

    if(!isset($body['user'])) {
        return $response
            ->withStatus(400)
            ->withJson(["error" => "Malformed request: Missing field user"]);
    }
    $newUser = \PDOs\JsonMapper::map("\PDOs\NewUser", $body['user']);
    $repo = new \PDOs\UserDAO($this->db);
    $userId = $repo->insertNew($newUser);

    return $response
        ->withStatus(200)
        ->withJson(["success" => ["id" => $userId]]);
});