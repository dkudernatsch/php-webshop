<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 01.06.18
 * Time: 17:07
 */

namespace PDOs\order;


class Invoice
{
    public $id;
    public $invoiceNumber;
    public $sum;
    public $timeStamp;
    public $user_id;
    /**
     * @var [ProductOrder]
     */
    public $orderPositions = array();
}