<?php 
	ini_set("display_errors", "On");
	error_reporting(E_ALL);
	//引入数据库连接php
	include ('conn.php');
	//引入功能
	include ('function.php');

	//获取请求数据

	//编写sql语句

	$sql = " (select * from bed_info_for_lab )";


	//执行sql
	$rs = mysqli_query($conn, $sql);
	//将数据存入数组

	while ($row = mysqli_fetch_array($rs)) {
		//汇总输出
		$bed_info_id[] = array('patient_name' => $row['patient_name'], 'room_pos' => $row['room_pos'], 'symptom_info' => $row['symptom_info'], 'patient_status' => $row['patient_status']);

	}
		//获取数据库bed_info_id表总记录条数
	$sql = "select count(bed_info_id) total from bed_info ";
	$row = fetchOne($sql);
		//如果数据不为空,回传数据
	if (!empty($bed_info_id)) {
		
		// $bed_info_id[] = array('total' => $row['total']);
		//将数组以json格式传回
		$tmp[] = array('data'=>$bed_info_id);
		// echo json_encode($bed_info_id);
		echo json_encode($tmp['0']);
	}
		//如果数据为空回传0
	else {
		echo 0;
	}
		
	//如果为空传回1
?>
