<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 06.04.18
 * Time: 23:15
 */

namespace PDOs;


class JsonMapper
{
    public static function map(string $className, $json = []){
        $obj = new $className();
        foreach ($json as $key => $value){
            $obj->$key = $value;
        }
        return $obj;
    }
}