<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 28.05.18
 * Time: 16:32
 */

namespace PDOs\order;


class ProductOrder
{

    public $id;
    public $product_id;
    public $count;

    /**
     * ProductOrder constructor.
     * @param int $id
     * @param int $product_id
     * @param int $count
     */



    public function __construct($id = 0, $product_id = 0, $count = 0)
    {
        $this->product_id = $product_id;
        $this->count = $count;
    }
}