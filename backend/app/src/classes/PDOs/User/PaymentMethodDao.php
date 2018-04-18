<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 18.04.18
 * Time: 23:47
 */

namespace PDOs\User;


use PDOs\Dao;

class PaymentMethodDao extends Dao
{
    const insert_stub = "INSERT INTO PAYMENT_METHOD(py_method, fk_py_u_user) VALUES (?, ?)";
    const select_stub = "SELECT py_id as id, py_method as method FROM PAYMENT_METHOD";
    const delete_stub = "DELETE FROM PAYMENT_METHOD WHERE py_id = ? AND fk_py_u_user = ?";

    /**
     * @param int $user_id
     * @param PaymentMethod $method
     * @return int
     * @throws \errors\DatabaseException
     */
    public function insertNew(int $user_id, PaymentMethod $method): int{
        $this->db->prepare_and_run($this::insert_stub, [
            ["s" => $method->method],
            ["i" => $user_id]
        ]);
        return $this->db->get_last_auto_inc();
    }

    /**
     * @param int $user_id
     * @return array|null
     * @throws \errors\DatabaseException
     */
    public function getForUser(int $user_id){
        return $this->db->prepare_and_run(
            $this::select_stub." WHERE fk_py_u_user = ?", [
                ["i" => $user_id]
            ], "PDOs\User\PaymentMethod", true);
    }

    /**
     * @param int $payment_id
     * @param int $user_id
     * @throws \errors\DatabaseException
     */
    public function delete(int $user_id, int $payment_id){
        $this->db->prepare_and_run($this::delete_stub, [["i" => $payment_id], ["i" => $user_id]]);
    }
}