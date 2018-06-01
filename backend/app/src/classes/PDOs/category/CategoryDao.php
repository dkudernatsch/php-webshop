<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 25.05.18
 * Time: 20:29
 */

namespace PDOs\category;


use PDOs\Dao;

class CategoryDao extends Dao
{
    const select_stub = "SELECT c_id as id, c_name as name, c_slug as slug FROM CATEGORIES";
    const insert_stub = "INSERT into CATEGORIES(c_name, c_slug ) values (?, ?)";

    /**
     * @return array
     * @throws \errors\DatabaseException
     */
    public function getAll(): array {
        return $this->db->prepare_and_run($this::select_stub, [], Category::class, true);
    }

    /**
     * @param string $name
     * @param string $slug
     * @return int
     * @throws \errors\DatabaseException
     */
    public function insertNew(string $name, string $slug){
        $this->db->prepare_and_run($this::insert_stub, [
            ["s" => $name],
            ["s" => $slug]
        ]);
        return $this->db->get_last_auto_inc();
    }
}