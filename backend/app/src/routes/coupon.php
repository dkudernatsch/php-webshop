<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 21.04.18
 * Time: 19:38
 */

use PDOs\coupon\CouponDao;
use Slim\Http\Request;
use Slim\Http\Response;

/**
 *
 */
$app->get('/coupon/{id}', function (Request $request, Response $response, array $args) {

    $this->logger->info("GET: coupon with id " . $args['id']);

    $token = $request->getAttribute("token");
    $dao = new CouponDao($this->db);
    $coupon = $dao->byId($args["id"]);

    if(!$coupon) throw new \errors\HttpServerException(404, "Coupon does not exist");

    $is_admin = $token->has_scope(['admin']);
    $user_id = $token->decoded['sub'];


    if((!$is_admin && $user_id !== $coupon->user_id)
     || !$is_admin && $coupon->user_id === null){
        throw new \errors\HttpServerException(403, "Token does not have rights for this resource instance");
    }

    return $response
        ->withStatus(200)
        ->withJson(["success" => $coupon]);

})->add(new ScopedJWTAuth(["user", "admin"]));

/**
 * Generate a new coupon with a value
 * only a admin has rights to this route
 */

$app->post("/coupon/", function (Request $request, Response $response, array $args){
    $this->logger->info("POST: generate new coupon");
    $body = $request->getParsedBody();
    $val = $body['value'];
    if($val && $val = floatval($val)){
        $dao = new CouponDao($this->db);
        $id = $dao->generateNew($val);
        return $response
            ->withStatus(201)
            ->withJson(["success" => ["id" => $id]]);
    }else{
        throw new \errors\HttpServerException(400, "Malformed request: Missing field value");
    }

})->add(new ScopedJWTAuth(["admin"]));

/**
 *
 */

$app->put("/coupon/{cid}/redeem/{uid}", function (Request $request, Response $response, array $args){
    $token = $request->getAttribute('token');

    if(!$token->has_scope(["admin"]) && intval($args['uid']) !== $token->decoded['sub']) {
        throw new \errors\HttpServerException(403, "Token does not have rights for this resource instance");
    } else {

        $dao = new CouponDao($this->db);
        if($dao->addUser($args['cid'], $args['uid'])){
            return $response->withStatus(204);
        }else{
            throw new \errors\HttpServerException(400, "Unable to redeem token");
        }
    }
})->add(new ScopedJWTAuth(["user"]));