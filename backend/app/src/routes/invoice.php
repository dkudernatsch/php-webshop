<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 01.06.18
 * Time: 21:39
 */

use Slim\Http\Request;
use Slim\Http\Response;

$app->get('/invoice/{id}', function (Request $request, Response $response, array $args) {

    $token = $request->getAttribute("token");
    $is_admin = $token->has_scope(['admin']);
    $user_id = $token->decoded['sub'];

    $invoiceDao = new \PDOs\order\InvoiceDao($this->db);
    $invoice = $invoiceDao->byId(intval($args['id']));

    if(!$is_admin && $invoice->user_id !== intval($user_id)){
        throw new \errors\HttpServerException(403, "Token has no rights for this resource");
    } else {
        return $response
            ->withStatus(200)
            ->withJson(['success' => $invoice]);
    }
})->add(new ScopedJWTAuth(['user']));

$app->delete('/invoice/{i_id}/position/{p_id}', function (Request $request, Response $response, array $args) {

    $token = $request->getAttribute("token");
    $is_admin = $token->has_scope(['admin']);
    $user_id = $token->decoded['sub'];

    $invoiceDao = new \PDOs\order\InvoiceDao($this->db);
    $invoice = $invoiceDao->byId(intval($args['i_id']));

    if(!$is_admin && $invoice->user_id !== intval($user_id)){
        throw new \errors\HttpServerException(403, "Token has no rights for this resource");
    } else {

        $invoiceDao->removeOrderPosition(intval($args['p_id']));
        return $response
            ->withStatus(204);
    }
})->add(new ScopedJWTAuth(['user']));

