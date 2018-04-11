<?php
// Application middleware


use Tuupola\Middleware\JwtAuthentication;

$container = $app->getContainer();

$container["token"] = function ($container){
    return new \PDOs\Token;
};

$container["JwtAuthentication"] = function ($container) {
    return new JwtAuthentication([
        "path" => "/",
        "ignore" => ["/token"],
        "secret" => getenv("JWT_SECRET"),
        "logger" => $container["logger"],
        "attribute" => false,
        "relaxed" => ["api.webshop.at"],
        "error" => function (\Slim\Http\Response $response, $arguments) {
            return $response->withStatus(401);
        },
        "before" => function ($request, $arguments) use ($container) {
            $container["token"]->populate($arguments["decoded"]);
            return $request->withAttribute('token', $container['token']);
        }
    ]);
};

$app->add("JwtAuthentication");