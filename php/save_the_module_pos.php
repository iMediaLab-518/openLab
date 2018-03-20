<?php
	header("Content-Type:text/html;charset=UTF-8");
	error_reporting(E_ALL);
	//引入数据库连接php
	include ('conn.php');
	//引入功能
	include ('function.php');
	//获取传入的坐标信息
	$info=$_POST['info'];
    $module_x=$info[0];
    $module_y=$info[1];
    $module_width = $info[2];
    $module_height = $info[3];
    $module_id = 0;
    if($info[4]=="staff-info"){
    	$module_id = 1;
    }
    else if($info[4]=="warning-info"){
    	$module_id = 2;
    }
    else if($info[4]=="equipment-info"){
    	$module_id = 3;
    }
	$sql = " UPDATE `module_info` SET `module_x` = '$module_x',`module_y` = '$module_y',`module_width` = '$module_width',`module_height` = '$module_height' WHERE `module_info`.`module_id` = '$module_id';
	";
	echo $sql;
	$res = "wrong";
	if (mysqli_query($conn, $sql) == TRUE)
    {
        $res = "ok";
    	echo json_encode($res);
       
    }
    else{
    	$res = "wrong";
    	echo json_encode($res);
    }
?>