<?php

use Firebase\JWT\JWT;
use PDOs\User\UserDAO;
use Slim\Http\Request;
use Slim\Http\Response;

$app->post("/token/", function (Request $request, Response $response) {
    $req = $request->getParsedBody();
    $user = null;
    $user_repo = new UserDAO($this->db);

    if (isset($req['username']) && isset($req['password'])) {
        if (!$user = $user_repo->authenticate($req['username'], $req['password'])) {
            throw new \errors\HttpServerException(401, "Wrong credentials provided");
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