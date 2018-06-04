<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 26.05.18
 * Time: 16:35
 */

namespace PDOs\product;


use ImageUploadService;
use PDOs\Dao;

class ProductDao extends Dao
{

    const select_stub = "SELECT PRODUCTS.p_id as id, p_name as `name`, p_price as price, p_imagepath as imagePath , p_rating as rating FROM PRODUCTS";

    const insert_stub = "INSERT INTO PRODUCTS(p_name, p_price, p_imagepath, p_rating) VALUES (?, ?, ?, ?)";

    const update_stub = "UPDATE PRODUCTS SET p_name = ?, p_price = ?, p_imagepath = ?, p_rating = ? WHERE p_id = ?";

    const delete_stub = "DELETE FROM PRODUCTS WHERE p_id = ?";


    /**
     * @param int $pid
     * @param NewProduct $product
     * @return bool
     * @throws \errors\HttpServerException
     */
    public function update(int $pid, NewProduct $product){

        $old = $this->getById($pid);

        $imgPath = "";
        if($product->imageData){
            $upload = new ImageUploadService();
            $imgPath = $upload->upload($product->imageData);
        }else{
            $imgPath = $old->imagePath;
        }

        if($product->categories) {
            $this->removeProductCategoryRelation($pid);
            foreach($product->categories as $c_id){
                $this->insertProductCategoryRelation($pid, intval($c_id));
            }
        }

        $this->db->prepare_and_run($this::update_stub, [
            ["s" => $product->name],
            ["d" => $product->price],
            ["s" => $imgPath],
            ["i" => $product->rating],
            ["i" => $pid]
        ]);

        return true;
    }

    /**
     * @return array
     * @throws \errors\DatabaseException
     */
    public function getAll(): array {
        $products = $this->db->prepare_and_run($this::select_stub, [], Product::class, true);
        foreach ($products as $product){
            $product->categories = $this->getCategoryArray($product->id);
        }
        return $products;
    }


    /**
     * @param int $product_id
     * @return null|Product
     * @throws \errors\DatabaseException
     */
    public function getById(int $product_id): ?Product {
        $product =  $this->db->prepare_and_run($this::select_stub." WHERE p_id = (?)", [["i" => $product_id]], Product::class, false);
        $product->categories = $this->getCategoryArray($product_id);
        return $product;
    }

    /**
     * @param int $cat_id
     * @param string $search
     * @return array
     * @throws \errors\DatabaseException
     */
    public function getByCategory(int $cat_id, string $search = null): array {

        $without_search = $this::select_stub." INNER JOIN PRODUCT_TO_CATEGORY ON PRODUCTS.p_id = PRODUCT_TO_CATEGORY.p_id WHERE c_id = ?";
        $with_search = $this::select_stub." INNER JOIN PRODUCT_TO_CATEGORY ON PRODUCTS.p_id = PRODUCT_TO_CATEGORY.p_id WHERE c_id = ? && (LOWER(p_name) LIKE '%'|| ? ||'%')";

        $products = [];
        if($search){
            $products = $products = $this->db->prepare_and_run($with_search, [
                    ["i" => intval($cat_id)],
                    ["s" => $search]
                ], Product::class, true);
        }else{
            $products = $this->db->prepare_and_run($without_search,
                [["i" => intval($cat_id)]],
                Product::class, true);
        }

        foreach ($products as $product){
            $product->categories = $this->getCategoryArray($product->id);
        }
        return $products;
    }


    /**
     * @param NewProduct $newProduct
     * @return int
     * @throws \errors\HttpServerException
     */
    public function insertNewProduct(NewProduct $newProduct){
        $imgUpload = new ImageUploadService();
        $imgurl = $imgUpload->upload($newProduct->imageData);
        $product_id = $this->insertProduct($newProduct->name, $newProduct->price, $imgurl, $newProduct->rating);

        foreach ($newProduct->categories as $c_id){
            $this->insertProductCategoryRelation($product_id, $c_id);
        }
        return $product_id;
    }

    /**
     * @param $name
     * @param $price
     * @param $imageUrl
     * @param $rating
     * @return int
     * @throws \errors\DatabaseException
     */
    private function insertProduct($name, $price, $imageUrl, $rating): int {
        $this->db->prepare_and_run($this::insert_stub, [
            ["s" => $name],
            ["d" => floatval($price)],
            ["s" => $imageUrl],
            ["i" => intval($rating)],
        ]);
        return $this->db->get_last_auto_inc();
    }

    /**
     * @param $pid
     * @throws \errors\DatabaseException
     */
    public function deleteProduct($pid){
        $this->removeProductCategoryRelation($pid);
        $this->db->prepare_and_run($this::delete_stub,[["i" => $pid]]);
    }

    /**
     * @param $pid
     * @return array
     * @throws \errors\DatabaseException
     */
    private function getCategoryArray($pid): array {
        return $this->db->prepare_and_run(
            "SELECT c_id FROM PRODUCT_TO_CATEGORY WHERE p_id = ?",
            [["i" => intval($pid)]],
            null,
            true
        );
    }

    /**
     * @param int $p_id
     * @param int $c_id
     * @throws \errors\DatabaseException
     */
    private function insertProductCategoryRelation(int $p_id, int $c_id){
        $this->db->prepare_and_run(
            "INSERT INTO PRODUCT_TO_CATEGORY(p_id, c_id) VALUES (?, ?)", [
                ["i" => $p_id],
                ["i" => $c_id]
            ]
        );
    }

    /**
     * @param int $p_id
     * @param int $c_id
     * @throws \errors\DatabaseException
     */
    private function removeProductCategoryRelation(int $p_id) {
        $this->db->prepare_and_run(
            "DELETE FROM PRODUCT_TO_CATEGORY WHERE p_id = ?", [
                ["i" => $p_id],
            ]
        );
    }

}