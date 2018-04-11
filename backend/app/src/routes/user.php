<?php

use PDOs\User\UserDAO;
use Slim\Http\Request;
use Slim\Http\Response;

$app->get('/user/', function (Request $request, Response $response, array $args) {
    $this->logger->info("GET: all users");
    $repo = new UserDAO($this->db);
    $user = $repo->getAll();
    if($user) {
        return $response
            ->withStatus(200)
            ->withJson(["success" => ["users" => $user]]);
    } else {
        throw new \errors\HttpServerException(404, "Users not found");
    }
})->add(new ScopedJWTAuth(["admin"]));

$app->get('/user/{id}', function (Request $request, Response $response, array $args) {

    $this->logger->info("GET: user with id " . $args['id']);
    $repo = new UserDAO($this->db);
    $user = $repo->byId($args['id']);
    if($user) {
        return $response
            ->withStatus(200)
            ->withJson(["success" => ["user" => $user]]);
    }else{
        throw new \errors\HttpServerException(404, "Users not found");
    }
})->add(new ScopedJWTAuth(["user"]));


$app->post("/user", function (Request $request, Response $response, array $args) {
    $this->logger->info("POST: creating new user...");
    $body = $request->getParsedBody();

    if(!isset($body['user'])) {
        throw new \errors\HttpServerException(400, "Malformed request: Missing field user");
    }

    $newUser = \PDOs\JsonMapper::map("\PDOs\User\NewUser", $body['user']);
    $repo = new \PDOs\User\UserDAO($this->db);
    $userId = $repo->insertNew($newUser);

    return $response
        ->withStatus(200)
        ->withJson(["success" => ["id" => $userId]]);
})->add(new ScopedJWTAuth(["anonymous"]));