<?php
// Function  :function
// Author    :ldy
// Build_Date:2017-7-11
// Version   :1.3.0
//*******************************版本介绍***************************************
//修订删除更新函数显示table为空错误
header("Content-type: text/html;charset=utf-8");//防止乱码

//错误跳转类
function page_redirect($info,$url,$mode){
    echo "<script>";
    if(!is_null($info)){
        echo "alert(\"$info\");";
    }
    if(!is_null($url)){
        echo "window.location=\"$url\";";
    }
    else{
        if($mode==1){
            echo "window.history.back(-1);";
        }
    }
    echo "</script>";
    if(!is_null($url) || !is_null($mode)) die();
}

//数据库操作类

//数组传入形式为
/* array(
'username'=>'ldy',
'password'=>'123',
'email'=>'ldy@163.com'
) */
//数据库插入函数，传入形式为数组，分别传入数组及表名, 函数返回最后一个查询中自动生成的 ID（通过 AUTO_INCREMENT 生成）
function insert($array, $table)
{
    include "conn.php";
    if (!is_array($array)) {
        echo "it is not  an array";
    }
    if (is_null($table)) {
        echo "table is null";
    }
    $keys = join(',', array_keys($array));
    $values = "'" . join("','", array_values($array)) . "'";
    $sql = "insert into {$table} ({$keys}) VALUES ({$values})";
    $res = mysqli_query($conn, $sql);
    if ($res) {
        return mysqli_insert_id($conn);
    }
    else {
        return FALSE;
    }
}
//数据库更新函数，分别写入数据（数组），表名及条件,返回影响行数
function update($array, $table, $where = null)
{
    include "conn.php";
    if (!is_array($array)) {
        echo "it is not an array";
    }
    if (is_null($table)) {
        echo "table is null";
    }
    $sets = '';
    foreach ($array as $key => $val) {
        $sets .= $key . "='" . $val . "',";
    }
    $sets = rtrim($sets, ','); //去掉SQL里的最后一个逗号
    $where = $where == null ? '' : ' WHERE ' . $where;
    $sql = "UPDATE {$table} SET {$sets} {$where}";
    $res = mysqli_query($conn, $sql);
    if ($res) {
        return mysqli_affected_rows($conn);
    }
    else {
        return FALSE;
    }
}
//数据库删除函数，分别写入表名及条件
function delete($table, $where = null)
{
    include "conn.php";
    if (is_null($table)) {
        echo "table is null";
    }
    $where = $where == null ? '' : ' WHERE ' . $where;
    $sql = "DELETE FROM {$table}{$where}";
    $res = mysqli_query($conn, $sql);
    if ($res) {
        return mysqli_affected_rows($conn);
    }
    else {
        return false;
    }
}
//查询一条记录
function fetchOne($sql_row)
{
    include "conn.php";
    $result = mysqli_query($conn, $sql_row);
    if ($result) {
        $row = mysqli_fetch_array($result);
        return $row;
    }
    else {
        return false;
    }
}
//得到表中所有数据
function fetchAll($sql_row)
{
    include "conn.php";
    $result = mysqli_query($conn, $sql_row);
    if ($result) {
        while ($row = mysqli_fetch_array($result)) {
            $rows[] = $row;
        }
        return $rows;
    }
    else {
        return false;
    }
}
//取得表中记录条数
function getTotalRows($sql_row)
{
    include "conn.php";
    $result = mysqli_query($conn, $sql_row);
    if ($result) {
        return mysqli_num_rows($result);
    }
    else {
        return false;
    }

}
//关闭数据库连接
function close($link = null)
{
    return mysqli_close($link);
}

//查询函数$array为传入数组，$table为查询表格，$table_connect中请加入多表连接语句，如空则请写null，$where为所需查询条件，$order写入需排序的字段名，$sort为排序方式，如"desc"
//模式0为检验返回函数是否有查询结果，正确返回1，错误返回0
//模式1返回查询结果的json形式
//模式2返回查询结果分割为数组
//模式3返回查询结果的二维数组形式
function select($mode, $array, $table, $table_connect = null, $where = null, $order = null, $sort = null)
{
    include "conn.php";
    if (!is_array($array)) {
        echo "it is not  an array";
    }
    if (is_null($table)) {
        echo "table is null";
    }
    $orderSql = "";
    if ($order && $sort) {
        $orderSql = "order by $order $sort";
    }
    $where = $where == null ? '' : ' WHERE ' . $where;
    $keys = join(',', array_keys($array));
    $sql = "SELECT $keys FROM $table $table_connect $where $orderSql";
    $res = mysqli_query($conn, $sql);
    $res2 = mysqli_query($conn, $sql);
    $users = array();
    $i = 0;

    if ($mode == 0) {
        if (mysqli_num_rows($res) < 1) return false;
        else return true;
    }

    if ($mode != 0) {
        $rowout = mysqli_fetch_array($res2);
        if ($res) {
            while ($row = mysqli_fetch_array($res)) {
                $row['0'] . '->' . $row['1'] . '</br>';
                $users[$i] = $row;
                $i++;
            }
            $json=json_encode(array('dataList'=>$users));

            if ($mode == 1) return $json;
            else if ($mode == 2) return $rowout;
            else if ($mode == 3) return $users;
            else return false;
        }
        else {
            return FALSE;
        }
    }
}