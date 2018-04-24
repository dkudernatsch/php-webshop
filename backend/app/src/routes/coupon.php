<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 21.04.18
 * Time: 19:38
 */

use PDOs\User\UserDAO;
use Slim\Http\Request;
use Slim\Http\Response;

$app->get('/coupon/{id}', function (Request $request, Response $response, array $args) {

    $this->logger->info("GET: coupon with id " . $args['id']);

})->add(new ScopedJWTAuth(["user"]));