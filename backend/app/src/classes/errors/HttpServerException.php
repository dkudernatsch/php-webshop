<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 09.04.18
 * Time: 17:15
 */

namespace errors;


use Throwable;

class HttpServerException extends \Exception
{

    private $http_error_code;
    private $server_error_msg;
    private $log;

    public function __construct(int $http_code, string $err_msg, $log = '')
    {
        parent::__construct();
        $this->http_error_code = $http_code;
        $this->server_error_msg = $err_msg;
    }

    /**
     * @return int
     */
    public function getHttpErrorCode(): int
    {
        return $this->http_error_code;
    }

    /**
     * @return string
     */
    public function getServerErrorMsg(): string
    {
        return $this->server_error_msg;
    }

    public function getLog(){
        return $this->log;
    }

}