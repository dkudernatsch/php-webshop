<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 18.04.18
 * Time: 23:07
 */

namespace Tests\Functional;


class TokenTests extends BaseTestCase
{
    /**
     * Test
     */
    public function testGetAnonymousToken(){
        $response = $this->runApp("POST", "/token");

        $this->assertEquals(200, $response->getStatusCode());

        $body = json_decode($response->getBody());

        $this->assertTrue($body['token'] != "");
    }

}