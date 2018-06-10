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

    public function validate(){
        return isset($this->appellation) && strlen($this->appellation) > 2   && strlen($this->appellation) < 20
            && isset($this->first_name) && strlen($this->first_name) > 2    && strlen($this->first_name) < 20
            && isset($this->last_name)  && strlen($this->last_name) > 2     && strlen($this->last_name) < 20
            && isset($this->address)    && strlen($this->address) > 2       && strlen($this->address) < 40
            && isset($this->post_code)  && strlen($this->post_code) > 2     && strlen($this->post_code) < 10
            && isset($this->city)       && strlen($this->city) > 2          && strlen($this->city) < 20
            && isset($this->mail)       && filter_var($this->mail, FILTER_VALIDATE_EMAIL)
            && isset($this->username)   && strlen($this->username) > 2      && strlen($this->username) < 20
            && isset($this->password)   && preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{4,}$/m", $this->password);

    }
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