<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 04.04.18
 * Time: 22:37
 */

namespace PDOs\User;

class User
{
    public $id;
    public $username;
    public $mail;

    public $appellation;
    public $first_name;
    public $last_name;

    public $address;
    public $post_code;
    public $city;

    public $is_admin;

    function get_scopes(){
        return $this->is_admin
            ? ["user", "admin", "anonymous"]
            : ["user", "anonymous"];
    }
}