<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 06.04.18
 * Time: 19:41
 */

namespace PDOs\User;



class NewUser
{
    /* @var string */
    public $appellation;
    /* @var string */
    public $first_name;
    /* @var string */
    public $last_name;
    /* @var string */
    public $address;
    /* @var string */
    public $post_code;
    /* @var string */
    public $city;
    /* @var string */
    public $mail;
    /* @var string */
    public $username;
    /* @var string */
    public $password;
}

/*
 * Eg.:
 * {
 *   "user": {
 *      "appellation": "Herr",
 *      "username": "if17b094",
 *      "password": "hellokitty",
 *      "mail": "abc@gmail.com",
 *      "first_name": "Daniel",
 *      "last_name": "Kudernastch",
 *      "address": "Burggasse 1",
 *      "post_code": "1200"
 *      "city": "Wien",
 *   },
 *   "auth": "XXXXXXXXXX.XXXXXXXXXXXXXXXXXXXX.XXXXXXXXXX"
 * }
*/