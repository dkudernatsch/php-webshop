<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 01.06.18
 * Time: 17:10
 */

namespace PDOs\order;


class NewInvoice
{
    public $invoice_number;
    public $sum;
    public $time_stamp;
    public $order_positions = array();
    public $user_id;
}