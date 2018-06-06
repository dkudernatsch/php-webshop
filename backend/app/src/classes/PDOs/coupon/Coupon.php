<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 21.04.18
 * Time: 19:01
 */

namespace PDOs\coupon;


class Coupon
{
    /**
     * @var int
     */
    public $id;

    /**
     * @var string
     */
    public $code;

    /**
     * @var string
     */
    public $value;

    /**
     * @var int | null
     */
    public $user_id;

    /**
     * @var string
     */
    public $expiration_date;

}