<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 01.06.18
 * Time: 17:05
 */

namespace PDOs;


use PDOs\coupon\CouponDao;
use PDOs\order\Invoice;
use PDOs\order\InvoiceDao;
use PDOs\order\NewInvoice;
use PDOs\order\Order;
use PDOs\order\ProductOrder;
use PDOs\product\Product;
use PDOs\product\ProductDao;
use PDOs\User\PaymentMethodDao;
use PDOs\User\User;
use PDOs\User\UserDAO;

class OrderService
{
    private $productDao;
    private $userDao;
    private $couponDao;
    private $paymentMethodDao;
    private $invoiceDao;

    function __construct(
        InvoiceDao $invoiceDao
        , ProductDao $productDao
        , UserDao $userDao
        , CouponDao $couponDao
        , PaymentMethodDao $paymentMethodDao
    )
    {
        $this->invoiceDao = $invoiceDao;
        $this->productDao = $productDao;
        $this->userDao = $userDao;
        $this->couponDao = $couponDao;
        $this->paymentMethodDao = $paymentMethodDao;
    }

    /**
     * @param Order $order
     * @return int
     * @throws \errors\HttpServerException
     */

    public function placeOrder(Order $order): int {

        $user = $this->userDao->byId($order->user_id);
        $coupon = null;
        if($order->coupon_id) {
            $coupon = $this->couponDao->byId($order->coupon_id);
        }
        $payment_method = $this->paymentMethodDao->byId($order->payment_id);

        $products = [];
        foreach ($order->products as $productOrder){
            $products[] = ['count' => $productOrder->count, 'product' => $this->productDao->getById($productOrder->product_id)];
        }

        $sum = array_reduce($products,  function ($acc, $product_entry){
            return $acc + $product_entry['product']->price * $product_entry['count'];
        }, 0.0);

        $coupon_val = $coupon
            ? floatval($coupon->value)
            : 0;

        if($coupon_val < $sum) {
            $sum -= $coupon_val;
            $coupon_val = 0;
        }else{
            $coupon_val -= $sum;
            $sum = 0;
        }

        $invoice = new NewInvoice();

        $invoice->invoice_number= $this->createGUID();
        $invoice->user_id = $user->id;

        $invoice->order_positions = array_map(function($entry){
            return new ProductOrder(0, $entry['product']->id, $entry['count']);
        }, $products);

        $invoice->sum = $sum;
        $invoice->time_stamp = time();

        if($coupon) {
            $coupon->value = strval($coupon_val);
            $this->couponDao->update($coupon);
        }

        return $this->invoiceDao->insertInvoice($invoice);
    }

    private function createGUID() {

        // Create a token
        $token      = $_SERVER['HTTP_HOST'];
        $token     .= $_SERVER['REQUEST_URI'];
        $token     .= uniqid(rand(), true);

        // GUID is 128-bit hex
        $hash        = strtoupper(md5($token));

        // Create formatted GUID
        $guid        = '';

        // GUID format is XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX for readability
        $guid .= substr($hash,  0,  8) .
            '-' .
            substr($hash,  8,  4) .
            '-' .
            substr($hash, 12,  4) .
            '-' .
            substr($hash, 16,  4) .
            '-' .
            substr($hash, 20, 12);

        return $guid;

    }

}