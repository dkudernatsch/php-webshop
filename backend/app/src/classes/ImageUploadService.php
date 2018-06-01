<?php

use errors\HttpServerException;

/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 26.05.18
 * Time: 17:04
 */

class ImageUploadService
{
    private const image_path = __DIR__."/../../public/images/";
    private const allowed_image_types = ["jpg", "png", "jpeg"];


    private function generateImagePath($image_id, $image_type) {
        return $this::image_path.$image_id.".".$image_type;
    }

    /**
     * @param string $imgData
     * @return string url to image
     * @throws HttpServerException
     */
    function upload(string $imgData): string {
        $imgData = $this->extractData($imgData);
        if($this->verifyImageData($imgData)){
            do {
                $id = $this->getRandomString(10);
            } while (is_file($this->generateImagePath($id, $imgData['type'])));

            if(file_put_contents($this->generateImagePath($id, $imgData['type']), $imgData['data'])) {
                return "https://".$_SERVER['HTTP_HOST']."/images/".$id.".".$imgData['type'];
            }else {
                throw new HttpServerException(500, "Unable to save image as file");
            }
        }
        throw new HttpServerException(500, "Unable to process image");
    }


    /**
     * @param $imgData
     * @return array
     * @throws HttpServerException
     */
    private function extractData($imgData){
        if (preg_match('/^data:image\/(\w+);base64,/', $imgData, $type)) {
            $data = substr($imgData, strpos($imgData, ',') + 1);

            $type = strtolower($type[1]);

            $data = base64_decode($data);

            if($data){
                return ["data" => $data, "type" => $type];
            }else{
                throw new HttpServerException(400,'Image payload is not Base64');
            }
        }else
            throw new HttpServerException(400, "Sent Image is not correctly formatted");

    }

    private function getRandomString(int $length){
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        $str = "";
        for($i = 0; $i < $length; ++$i){
            $str .= $chars[rand(0, strlen($chars) -1 )];
        }
        return $str;
    }

    /**
     * @param $imgData
     * @return bool
     * @throws HttpServerException
     */
    private function verifyImageData($imgData): bool
    {
        if(!in_array($imgData['type'], $this::allowed_image_types)){
            throw new HttpServerException(400, "Not supported image extension. Must be one of: "
                . array_reduce($this::allowed_image_types, function($t, $t2) {return $t.", ".$t2; }));
        }

        if (!@is_array(getimagesizefromstring($imgData['data']))){
            throw new HttpServerException(400, "Sent file is not a image file. Supported file formats: "
                . array_reduce($this::allowed_image_types, function($t, $t2) {return $t.", ".$t2; }));
        }

        return true;
    }
}