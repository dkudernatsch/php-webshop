<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 01.06.18
 * Time: 17:07
 */

namespace PDOs\order;


use PDOs\Dao;
use PDOs\product\ProductDao;

class InvoiceDao extends Dao
{
    private const select_invoice_stub = "SELECT i_id as id
                                                , fk_i_u_id as user_id
                                                , i_invoice_number as invoiceNumber
                                                , i_sum as sum
                                                , i_timestamp as `timeStamp` 
                                                , fk_i_u_id as user_id
                                        FROM INVOICE";

    private const select_products_stub = "Select op_id as id, op_count as `count`, fk_op_i_id as invoice_id, fk_op_p_id as product_id From ORDER_POSITION";

    private const insert_invoice_stub = "INSERT INTO INVOICE(i_invoice_number, i_sum, i_timestamp, fk_i_u_id) VALUES (?,?,NOW(),?)";

    private const insert_product_stub = "Insert INTO ORDER_POSITION(op_count, fk_op_p_id, fk_op_i_id) VALUES(?,?,?)";


    private const delete_product_stub = "DELETE FROM ORDER_POSITION WHERE op_id = ?";


    /**
     * @param Invoice[] $invoices
     * @param ProductDao $productDao
     * @return array
     * @throws \errors\DatabaseException
     */
    public function getWithProduct(array $invoices, ProductDao $productDao){
        $ret = [];

        foreach ($invoices as $invoice){
            $in_ret = [];
            foreach ($invoice->orderPositions as $orderpos){
                $p = $productDao->getById($orderpos->product_id);
                $in_ret[] = [
                    "product" => $p,
                    "count" => $orderpos->count,
                    "id" => $orderpos->id,
                ];
            }
            $ret[] = [
                "user_id" => $invoice->user_id,
                "id" => $invoice->id,
                "sum" => $invoice->sum,
                "invoiceNumber" => $invoice->invoiceNumber,
                "timeStamp" => $invoice->timeStamp,
                "orderPositions" => $in_ret,
            ];
        }
        return $ret;
    }

    /**
     * @param NewInvoice $invoice
     * @return int
     * @throws \errors\DatabaseException
     */
    public function insertInvoice(NewInvoice $invoice): int {
        $this->db->prepare_and_run($this::insert_invoice_stub,[
            ['s' => $invoice->invoice_number],
            ['d' => $invoice->sum],
            ['i' => $invoice->user_id]
        ]);
        $invoice_id = $this->db->get_last_auto_inc();

        foreach($invoice->order_positions as $oder_pos){
            $this->db->prepare_and_run($this::insert_product_stub, [
                ['i' => $oder_pos->count],
                ['i' => $oder_pos->product_id],
                ['i' => $invoice_id],
            ]);
        }

        return $invoice_id;
    }

    public function byId(int $id): Invoice {
        $invoice = $this->db->prepare_and_run($this::select_invoice_stub." WHERE i_id = ?", [[
            'i' => $id
        ]], Invoice::class);

        $products = $this->db->prepare_and_run($this::select_products_stub." WHERE fk_op_i_id = ?", [[
            'i' => $id
        ]], \stdClass::class, true);

        $invoice->orderPositions = $products;

        return $invoice;
    }

    /**
     * @param int $user_id
     * @return array
     * @throws \errors\DatabaseException
     */
    public function byUser(int $user_id){
        $invoices = $this->db->prepare_and_run("Select i_id as id from INVOICE where fk_i_u_id = ?",
            [["i" => $user_id]], null, true);
        return array_map(function ($id) {
            return $this->byId($id);
        }, $invoices);
    }

    /**
     * @param int $op_id
     * @throws \errors\DatabaseException
     */
    public function removeOrderPosition(int $op_id){
        $this->db->prepare_and_run($this::delete_product_stub, [['i' => $op_id]]);
    }

}