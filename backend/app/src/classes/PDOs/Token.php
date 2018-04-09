<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 08.04.18
 * Time: 00:58
 */

namespace PDOs;


class Token
{
    public $decoded;

    public function populate($token){
        $this->decoded = $token;
    }

    public function has_scope(array $scopes): bool {
        return array_intersect($scopes, $this->decoded['scope']) === $scopes;
    }
}