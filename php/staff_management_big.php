<?php 
	ini_set("display_errors", "On");
	error_reporting(E_ALL);
	//引入数据库连接php
	include ('conn.php');
	//引入功能
	include ('function.php');

	//获取请求数据

	//编写sql语句
	$sql = "select * from"; 

	$sql = " (select * from staff_info where staff_is_use=1 )";


	//执行sql
	$rs = mysqli_query($conn, $sql);
	//将数据存入数组

	while ($row = mysqli_fetch_array($rs)) {
		//获取角色名称
		$staff_role_id = $row['staff_role_id'];
		$sql_role = "SELECT role_name FROM role_info where role_is_use=1 and role_id='$staff_role_id'";
		$rs_role = mysqli_query($conn, $sql_role);
		$row_role = mysqli_fetch_array($rs_role);
		if($row['staff_gender']=="0"){
			$row['staff_gender']="女";
		}
		else{
			$row['staff_gender']="男";
		}
		//汇总输出
		$staff_infomation[] = array('staff_serial_number' => $row['staff_serial_number'], 'staff_name' => $row['staff_name'], 'staff_gender' => $row['staff_gender'], 'staff_phone_num' => $row['staff_phone_num'], 'staff_id_card_no' => $row['staff_id_card_no'], 'staff_role_name' => $row_role['role_name'], 'staff_create_time' => $row['staff_create_time'], 'staff_id' => $row['staff_id']);

	}
		//获取数据库staff_info表总记录条数
	$sql = "select count(staff_id) total from staff_info where staff_is_use=1";
	$row = fetchOne($sql);
		//如果数据不为空,回传数据
	if (!empty($staff_infomation)) {
		
		// $staff_infomation[] = array('total' => $row['total']);
		//将数组以json格式传回
		$tmp[] = array('data'=>$staff_infomation);
		// echo json_encode($staff_infomation);
		echo json_encode($tmp['0']);
	}
		//如果数据为空回传0
	else {
		echo 0;
	}
		
	//如果为空传回1
?>
