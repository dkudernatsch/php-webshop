<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 04.04.18
 * Time: 23:12
 */

namespace PDOs\User;

use PDOs\Dao;

class UserDAO extends Dao
{

    const select_stub =
        /** @lang MySQL */
        "SELECT u_id as id,
            u_appellation as appellation,
            u_firstname as first_name,
            u_lastname as last_name,
            u_address as address,
            u_plz as post_code,
            u_city as city,
            u_mail as mail,
            u_username as username,
            u_isActive as is_active,
            u_isadmin as is_admin
        FROM USERS";

    const insert_stub =
        "INSERT INTO USERS 
            ( u_password
            , u_username
            , u_mail
            , u_appellation
            , u_firstname
            , u_lastname
            , u_address
            , u_plz
            , u_city
            , u_isadmin
            , u_isActive) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const update_stub =
        "UPDATE USERS SET
            u_appellation = ?,
            u_firstname = ?,
            u_lastname = ?,
            u_address = ?,
            u_plz = ?,
            u_city = ?,
            u_mail = ?,
            u_username = ?
        WHERE u_id = ?";

    /**
     * @return array
     * @throws \errors\HttpServerException
     */
    public function getAll(): array
    {
        return $this->db->prepare_and_run($this::select_stub, [], User::class, true);
    }

    /**
     * @param int $id
     * @return null|User
     * @throws \errors\HttpServerException
     */
    public function byId(int $id): ?User
    {
        /** @noinspection PhpIncompatibleReturnTypeInspection */
        return $this->db->prepare_and_run($this::select_stub . " WHERE u_id = ?", [['i' => $id]], "PDOs\User\User");
    }

    /**
     * @param NewUser $user
     * @return mixed
     * @throws \errors\HttpServerException
     */
    public function insertNew(NewUser $user) {
        $this->db->prepare_and_run($this::insert_stub, [
            ['s' => password_hash($user->password, PASSWORD_DEFAULT)],
            ['s' => $user->username],
            ['s' => $user->mail],
            ['s' => $user->appellation],
            ['s' => $user->first_name],
            ['s' => $user->last_name],
            ['s' => $user->address],
            ['s' => $user->post_code],
            ['s' => $user->city],
            ['i' => 0],
            ['i' => 0]
        ]);
        return $this->db->get_last_auto_inc();
    }

    /**
     * @param UpdateUser $user
     * @throws \errors\HttpServerException
     */
    public function updateUser(UpdateUser $user) {
        $this->db->prepare_and_run($this::update_stub, [
           ["s" => $user->appellation],
           ["s" => $user->first_name],
           ["s" => $user->last_name],
           ["s" => $user->address],
           ["s" => $user->post_code],
           ["s" => $user->city],
           ["s" => $user->mail],
           ["s" => $user->username],
           ["i" => $user->id],
        ]);
    }

    /**
     * @param string $username
     * @param string $password
     * @return null|User
     * @throws \errors\HttpServerException
     */
    public function authenticate(string $username, string $password): ?User {
        $id_and_hash = $this->db->prepare_and_run(/** @lang MySQL */
            "SELECT u_id as id, u_password as `password` FROM USERS WHERE (u_isActive = true || u_isAdmin = true) && u_username = (?)", [['s' => $username]]);

        if(password_verify($password, $id_and_hash['password'])){
            return $this->byId($id_and_hash['id']);
        }else{
            return null;
        }
    }

    /**
     * @param int $id
     * @throws \errors\DatabaseException
     */
    public function activate(int $id){
        $this->db->prepare_and_run("UPDATE USERS SET u_isActive = TRUE where u_id = ?", [
            ["i" => $id]
        ]);
    }

    /**
     * @param int $id
     * @throws \errors\DatabaseException
     */
    public function deactivate(int $id){
        $this->db->prepare_and_run("UPDATE USERS SET u_isActive = FALSE where u_id = ?", [
            ["i" => $id]
        ]);
    }

}