<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 28.05.18
 * Time: 16:31
 */

namespace PDOs\order;


class Order
{
    public $user_id;
    public $payment_id;
    public $coupon_id;
    public $products = array();
}