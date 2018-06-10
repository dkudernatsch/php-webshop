<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 28.05.18
 * Time: 16:46
 */


use PDOs\order\Order;
use Slim\Http\Request;
use Slim\Http\Response;

$app->post('/order/', function (Request $request, Response $response, array $args) {

    $parsedBody = $request->getParsedBody();
    $order = new Order();

    if(($order->user_id = $parsedBody['user_id'])
    && ($order->payment_id = $parsedBody['payment_id'])
    && ($order->coupon_id = $parsedBody['coupon_id'])
    && ($order->products =
                array_map(function ($entry){
                    return new \PDOs\order\ProductOrder($entry['id'], $entry['count']);
                }, $parsedBody['products'])))
    {
       $orderService = new \PDOs\OrderService(
           new \PDOs\order\InvoiceDao($this->db),
           new \PDOs\product\ProductDao($this->db),
           new PDOs\User\UserDAO($this->db),
           new \PDOs\coupon\CouponDao($this->db),
           new \PDOs\User\PaymentMethodDao($this->db)
       );

       $invoice_id = $orderService->placeOrder($order);
       return $response
           ->withStatus(201)
           ->withJson(["success" => ["id" => $invoice_id]]);
    }else{
        throw new \errors\HttpServerException(400, "Malformed request. Unable to extract order details from request body.");
    }
})->add(new ScopedJWTAuth(["user"]));
