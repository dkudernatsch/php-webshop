<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 09.04.18
 * Time: 17:24
 */

namespace errors;



use Monolog\Logger;
use Slim\Http\Request;
use Slim\Http\Response;

class SlimServerErrorHandler
{
    private $logger;

    public function __construct(Logger $logger)
    {
        $this->logger = $logger;
    }

    public function __invoke(Request $request, Response $response, $error)
    {
        if($error instanceof HttpServerException) {
            if($error->getLog()) $this->logger->error($error->getLog());

            return FailedResponse::fromServerException($error, $response);
        }elseif($error instanceof \Throwable){
            $this->logger->error($error->getMessage());
            return FailedResponse::fromError(500, $error->getMessage(), $response);
        }else{
            $this->logger->error($error);
            return FailedResponse::fromError(500, json_encode($error), $response);
        }
    }
}