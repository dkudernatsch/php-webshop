<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 21.04.18
 * Time: 19:06
 */

namespace errors;


class DatabaseException extends HttpServerException
{
    public function __construct(\mysqli $con)
    {
        parent::__construct(500, "Unable to connect to database", "Database exception: code( ".$con->errno." ), ".$con->error);
    }
}