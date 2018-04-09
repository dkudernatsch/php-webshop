<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 09.04.18
 * Time: 17:24
 */

namespace errors;



use Slim\Http\Request;
use Slim\Http\Response;

class SlimServerErrorHandler
{
    public function __invoke(Request $request, Response $response, $error)
    {
        if($error instanceof HttpServerException){
            return FailedResponse::fromServerException($error, $response);
        }elseif($error instanceof \Throwable){
            return FailedResponse::fromError(500, $error->getMessage(), $response);
        }else{
            return FailedResponse::fromError(500, json_encode($error), $response);
        }
    }
}