<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 26.05.18
 * Time: 17:51
 */

use PDOs\JsonMapper;
use PDOs\product\NewProduct;
use PDOs\product\ProductDao;
use Slim\Http\Request;
use Slim\Http\Response;

$app->post('/product/', function (Request $request, Response $response, array $args) {

    $newProduct = JsonMapper::map(NewProduct::class, $request->getParsedBody());
    if(!$newProduct) throw new \errors\HttpServerException(400, "Malformed request. Unable to extract product from body.");

    $dao = new ProductDao($this->db);
    $product_id = $dao->insertNewProduct($newProduct);

    return $response
        ->withStatus(201)
        ->withJson(["success" => ["id" => $product_id]]);
})->add(new ScopedJWTAuth(["admin"]));

/**
 *
 */

$app->put('/product/{id}', function (Request $request, Response $response, array $args) {

    $newProduct = JsonMapper::map(NewProduct::class, $request->getParsedBody());

    if(!$newProduct) throw new \errors\HttpServerException(400, "Malformed request. Unable to extract product from body.");

    $id = intval($args['id']);

    $dao = new ProductDao($this->db);
    $dao->update($id, $newProduct);

    return $response
        ->withStatus(204);

})->add(new ScopedJWTAuth(["admin"]));


/**
 * DELETE a product from the database
 */

$app->delete("/product/{id}",  function (Request $request, Response $response, array $args) {
    $dao = new ProductDao($this->db);
    $dao->deleteProduct(intval($args['id']));
    return $response
        ->withStatus(204);
})->add(new ScopedJWTAuth(["admin"]));

/**
 *
 */
$app->get("/product/{id}",  function (Request $request, Response $response, array $args) {

    $dao = new ProductDao($this->db);

    if($product = $dao->getById(intval($args['id']))) {

        return $response
            ->withStatus(200)
            ->withJson(["success" => $product]);
    }else{
        throw new \errors\HttpServerException(404, "Product not found");
    }
})->add(new ScopedJWTAuth(["anonymous"]));

/**
 *
 */

$app->get("/product/category/{id}",  function (Request $request, Response $response, array $args) {

    $dao = new ProductDao($this->db);

    if($product = $dao->getByCategory(intval($args['id']), $_GET['search'])) {

        return $response
            ->withStatus(200)
            ->withJson(["success" => $product]);
    }else{
        throw new \errors\HttpServerException(404, "Product not found");
    }
})->add(new ScopedJWTAuth(["anonymous"]));