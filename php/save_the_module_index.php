<?php
	header("Content-Type:text/html;charset=UTF-8");
	error_reporting(E_ALL);
	//引入数据库连接php
	include ('conn.php');
	//引入功能
	include ('function.php');
	//获取传入的坐标信息
	$info=$_POST['info'];

    for($i = 0; $i<count($info)/2; $i++){
        $module_id = 0;

        if($info[$i*2]=="staff-info"){
            $module_id = 1;
        }
        else if($info[$i*2]=="warning-info"){
            $module_id = 2;
        }
        else if($info[$i*2]=="equipment-info"){
            $module_id = 3;
        }
        // echo json_encode($info);
        // echo json_encode($module_id);
        $zindex = $info[$i*2+1];
        // echo json_encode($zindex);
        $sql = " UPDATE `module_info` SET `zindex` = '$zindex' WHERE `module_info`.`module_id` = '$module_id';
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
    }
    
?>