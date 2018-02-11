<?php 
	ini_set("display_errors", "On");
	error_reporting(E_ALL);
	//引入数据库连接php
	include ('conn.php');
	//引入功能
	include ('function.php');

	//获取请求数据

	//编写sql语句

	$sql = " (select * from equipment_info )";


	//执行sql
	$rs = mysqli_query($conn, $sql);
	//将数据存入数组

	while ($row = mysqli_fetch_array($rs)) {

		if($row['equipment_status']=="0"){
			$row['equipment_status']="已报废";
		}
		else if($row['equipment_status']=="1"){
			$row['equipment_status']="未绑定";
		}
		else if($row['equipment_status']=="2"){
			$row['equipment_status']=$row['equipment_serial_number'];
		}
		else if($row['equipment_status']=="3"){
			$row['equipment_status']="正常";
		}
		else if($row['equipment_status']=="4"){
			$row['equipment_status']="异常";
		}

		//获取房间信息
		$bed_id = $row['bed_id'];
		$sql_bed_info = "SELECT bed_name, room_id,building_id FROM bed_info where bed_id ='$bed_id'";
		$rs_bed_info = mysqli_query($conn, $sql_bed_info);
		$row_bed_info = mysqli_fetch_array($rs_bed_info);

		$building_id = $row_bed_info['building_id'];
		$sql_building_info = "SELECT building_name FROM building_info where building_id ='$building_id'";
		$rs_building_info = mysqli_query($conn, $sql_building_info);
		$row_building_info = mysqli_fetch_array($rs_building_info);


		//汇总输出
		$equipment_info[] = array('equipment_status' => $row['equipment_status'], 'bed_no' => $row_bed_info['bed_name'], 'room_no' => $row_bed_info['room_id'], 'building_no' => $row_building_info['building_name']);

	}
		//获取数据库equipment_info表总记录条数
	$sql = "select count(bed_info_id) total from equipment_info ";
	$row = fetchOne($sql);
		//如果数据不为空,回传数据
	if (!empty($equipment_info)) {
		
		// $bed_info_id[] = array('total' => $row['total']);
		//将数组以json格式传回
		$tmp[] = array('data'=>$equipment_info);
		// echo json_encode($bed_info_id);
		echo json_encode($tmp['0']);
	}
		//如果数据为空回传0
	else {
		echo 0;
	}
		
	//如果为空传回1
?>
