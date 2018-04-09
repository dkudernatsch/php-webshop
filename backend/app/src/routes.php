<?php

use Firebase\JWT\JWT;
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
})->add(new ScopedJWTAuth(["admin", "user"]));

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
    $newUser = \PDOs\JsonMapper::map("\PDOs\User\NewUser", $body['user']);
    $repo = new \PDOs\User\UserDAO($this->db);
    $userId = $repo->insertNew($newUser);

    return $response
        ->withStatus(200)
        ->withJson(["success" => ["id" => $userId]]);
});

$app->post("/token", function (Request $request, Response $response){
    $req = $request->getParsedBody();
    $user = null;
    $user_repo = new UserDAO($this->db);

    if(isset($req['username']) && isset($req['password'])) {
        if (!$user = $user_repo->authenticate($req['username'], $req['password'])) {
            return $response
                ->withJson(["error" => "Wrong Credentials provided"])
                ->withStatus(403);
        }
    }

    $now = new DateTime();
    $future = new DateTime("now +1 day");

    $jti = base64_encode(random_bytes(16));

    $payload = [
        "iat" => $now->getTimeStamp(),
        "exp" => $future->getTimeStamp(),
        "jti" => $jti,
        "sub" => $user ? $user->id : null,
        "scope" => $user ? $user->get_scopes() : ['anonymous']
    ];

    $secret = getenv("JWT_SECRET");

    $token = JWT::encode($payload, $secret, "HS256");

    $data["token"] = $token;
    $data["expires"] = $future->getTimeStamp();

    return $response->withStatus(201)
        ->withJson($data);
});