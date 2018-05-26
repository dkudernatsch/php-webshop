<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 26.05.18
 * Time: 16:33
 */

namespace PDOs\product;


class Product
{
    /**
     * @var integer
     */
    public $id;

    /**
     * @var string
     */
    public $name;

    /**
     * @var float
     */
    public $price;

    /**
     * @var string
     */
    public $imagePath;

    /**
     * @var integer
     */
    public $rating;

    /**
     * @var array [int]
     */
    public $categories;
}