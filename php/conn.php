<?php
/*
  Function  :数据库连接
  Author    :whz
  Build_Date:2017-07-04
  Version   :1.0
*/
//数据库连接
$conn = mysqli_connect("localhost", "root", "root", "nursinghome");
if (!$conn) die("db not connected");
$sql = "set names utf8";
mysqli_query($conn, $sql);