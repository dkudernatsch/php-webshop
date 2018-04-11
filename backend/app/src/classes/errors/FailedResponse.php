<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 09.04.18
 * Time: 17:10
 */

namespace errors;

use Slim\Http\Response;

class FailedResponse extends Response
{
    public static function fromServerException(HttpServerException $error, Response $response): Response
    {
        return $response
            ->withStatus($error->getHttpErrorCode())
            ->withJson([
                "error" => [
                    "errorStatus" => $error->getHttpErrorCode(),
                    "errorMsg" => $error->getServerErrorMsg()
                ]
            ]);
    }

    public static function fromError(int $status_code, string $error_msg, Response $response): Response
    {
        return $response
            ->withStatus($status_code)
            ->withJson([
                "error" => [
                    "errorStatus" => $status_code,
                    "errorMsg" => $error_msg
                ]
            ]);
    }
}