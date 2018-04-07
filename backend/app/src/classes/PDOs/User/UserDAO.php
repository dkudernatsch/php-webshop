<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 04.04.18
 * Time: 23:12
 */

namespace PDOs\User;

class UserDAO
{
    /**
     * @var \Database
     */
    private $db;

    private $select_stub =
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
            u_isadmin as is_admin
        FROM USERS";

    private $insert_stub =
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

    /**
     * UserDAO constructor.
     * @param \Database $db
     */
    public function __construct(\Database $db)
    {
        $this->db = $db;
    }

    public function getAll(): array
    {
        return $this->db->prepare_and_run($this->select_stub, [], "PDOs\User\User", true);
    }

    public function byId(int $id): ?User
    {
        /** @noinspection PhpIncompatibleReturnTypeInspection */
        return $this->db->prepare_and_run($this->select_stub . " WHERE u_id = ?", [['i' => $id]], "PDOs\User\User");
    }

    public function insertNew(NewUser $user) {
        $this->db->prepare_and_run($this->insert_stub, [
            ['s' => password_hash($user->password, PASSWORD_DEFAULT)],
            ['s' => $user->username],
            ['s' => $user->mail],
            ['s' => $user->appellation],
            ['s' => $user->first_name],
            ['s' => $user->last_name],
            ['s' => $user->address],
            ['s' => $user->post_code],
            ['s' => $user->city],
            ['b' => false],
            ['b' => false]
        ]);
        return $this->db->get_last_auto_inc();
    }
}