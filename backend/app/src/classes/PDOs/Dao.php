<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 18.04.18
 * Time: 23:51
 */

namespace PDOs;


class Dao
{
    /**
     * @var \Database
     */
    protected $db;

    public function __construct(\Database $db)
    {
        $this->db = $db;
    }
}