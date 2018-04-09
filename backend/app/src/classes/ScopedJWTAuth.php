<?php

use Slim\Http\Response;
use Slim\Http\Request;

/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 08.04.18
 * Time: 15:36
 */

class ScopedJWTAuth
{

    private $scopes;

    public function __construct(array $scopes)
    {
        $this->scopes = $scopes;
    }

    function __invoke(Request $request, Response $response, $next): Response
    {
        if($token = $request->getAttribute("token")){
            if($token->has_scope($this->scopes)){
                return $next($request, $response);
            }
        }
        return $response
            ->withStatus(403)
            ->withJson(["error" => "Token has rights: ".json_encode($token->decoded['scope'])." but needs ".json_encode($this->scopes)]);
    }
}