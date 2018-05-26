<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 04.04.18
 * Time: 22:13
 */

class Database
{
    private $conn = null;

    function __construct(mysqli $conn)
    {
        assert($conn == true);
        $this->conn = $conn;
    }

    /**
     * @param string $query
     * @param array $args
     * @param string | null $obj
     * @param bool $as_list
     * @return array | object | array[object] | null
     * @throws \errors\DatabaseException
     */
    public function prepare_and_run(string $query, array $args, string $obj = null, $as_list = false)
    {
        $stmt = $this->conn->prepare($query);
        $types = "";
        $vals = array();
        foreach ($args as $_ => $arr) {
            foreach ($arr as $key => $val){
                $types .= $key;
                $vals[] = $val;
            }
        }
        if($types) {
            $stmt->bind_param($types, ...$vals);
        }

        if ($stmt->execute() && !$this->conn->error_list) {
            $result = $stmt->get_result();
            if($result) {
                if ($obj && $as_list) {
                    $ret_arr = [];
                    while ($i = $result->fetch_object($obj)){
                        if($i) $ret_arr[] = $i;
                    };

                    return $ret_arr;
                } elseif ($obj) {
                    return $result->fetch_object($obj);
                } elseif($as_list) {
                    $ret_arr = [];
                    while ($i = $result->fetch_row()[0]){
                            if($i) $ret_arr[] = $i;
                    };
                    return $ret_arr;
                } else {
                    return $result->fetch_assoc();
                }
            }else{
                return null;
            }
        }else {
            throw new \errors\DatabaseException($this->conn);
        }
    }


    public function get_last_auto_inc()
    {
        return $this->conn->insert_id;
    }

}