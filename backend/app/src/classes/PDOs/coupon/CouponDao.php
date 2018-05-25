<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 21.04.18
 * Time: 19:04
 */

namespace PDOs\coupon;


use PDOs\Dao;
use PDOs\User\UserDAO;

class CouponDao extends Dao
{

    const select_stub = "SELECT c_id as id, c_code as `code`, c_value as `value`, fk_c_u_user as user_id FROM COUPON";
    const insert_stub = "INSERT INTO COUPON(c_code, c_value, fk_c_u_user) VALUES (?, ?, ?)";
    const update_stub = "UPDATE COUPON SET c_code = ?, c_value = ?, fk_c_u_user = ? WHERE c_id = (?)";

    /**
     * @param int $id
     * @return null|Coupon
     * @throws \errors\HttpServerException
     */
    public function byId(int $id): ?Coupon
    {
        return $this->db->prepare_and_run($this::select_stub . " WHERE c_id = ?", [["s" => $id]], "\PDOs\coupon\Coupon");
    }

    /**
     * @return array
     * @throws \errors\DatabaseException
     */
    public function getAll(): array
    {
        return $this->db->prepare_and_run($this::select_stub, null, "\PDOs\coupon\Coupon", true);
    }

    /**
     * @param int $coupon_id
     * @param int $user_id
     * @return bool
     * @throws \errors\HttpServerException
     */
    public function addUser(int $coupon_id, int $user_id): bool
    {
        $coupon = $this->byId($coupon_id);
        $user_dao = new UserDAO($this->db);
        $user = $user_dao->byId($user_id);

        if ($user === null) return false;
        if ($coupon->user_id !== null) return false;

        $this->db->prepare_and_run($this::update_stub, [
            ["s" => $coupon->code],
            ["d" => $coupon->value],
            ["i" => $user_id],
            ["i" => $coupon->id]
        ]);
        return true;
    }

    /**
     * @param string $code
     * @return Coupon|null
     * @throws \errors\DatabaseException
     */
    private function getByCode(string $code): ?Coupon
    {
        return $this->db->prepare_and_run($this::select_stub . " WHERE c_code = ?", [
            ["s" => $code],
        ], Coupon::class, false);
    }

    /**
     * @param float $value
     * @return int
     * @throws \errors\DatabaseException
     */
    public function generateNew(float $value): int
    {
        do {
            $code = $this->generateCode();
        } while ($this->getByCode($code) !== null);

        $this->db->prepare_and_run($this::insert_stub, [
            ["s" => $code],
            ["d" => $value],
            ["i"=> null]
        ]);
        return $this->db->get_last_auto_inc();
    }

    /**
     * @return string
     */
    private function generateCode(): string
    {
        $str = "";
        static $alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for ($i = 0; $i < 5; $i++) {
            $str .= $alphabet[rand(0, 62)];
        }
        return $str;
    }

}