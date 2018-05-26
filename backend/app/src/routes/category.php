<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 25.05.18
 * Time: 20:36
 */

use PDOs\category\CategoryDao;
use Slim\Http\Request;
use Slim\Http\Response;

$app->get("/category/", function (Request $request, Response $response, array $args){
    $dao = new CategoryDao($this->db);
    $categories = $dao->getAll();

    return $response
        ->withStatus(200)
        ->withJson(["success" => $categories]);

})->add(new ScopedJWTAuth(["anonymous"]));

$app->post("/category/", function (Request $request, Response $response, array $args){

    $body = $request->getParsedBody();

    if(($name = $body['name']) && ($slug = $body['slug']))
    {

        $dao = new CategoryDao($this->db);
        $id = $dao->insertNew($name, $slug);
        return $response
            ->withStatus(201)
            ->withJson(["success" =>
                ["id" => $id]
            ]);
    } else {
        throw new \errors\HttpServerException(400, "Malformed request: Required fields [name, slug]");
    }
});
