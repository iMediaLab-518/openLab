<?php 
	ini_set("display_errors", "On");
	error_reporting(E_ALL);
	//引入数据库连接php
	include ('conn.php');
	//引入功能
	include ('function.php');

	//获取请求数据

	//编写sql语句
	$curPage = $_REQUEST['curPage'];
	$pageCapacity = $_REQUEST['pageCapacity'];
	$pageStart = ($curPage - 1) * $pageCapacity;
	$pageEnd = $curPage * $pageCapacity;
	$sql = " (select * from staff_info where staff_is_use=1 order by staff_id asc limit ".$info[0]." ,".$info[1]." )";
	// echo $sql;
	//执行sql
	$rs = mysqli_query($conn, $sql);
	//将数据存入数组

	while ($row = mysqli_fetch_array($rs)) {
		//获取角色名称
		$staff_role_id = $row['staff_role_id'];
		$sql_role = "SELECT role_name FROM role_info where role_is_use=1 and role_id='$staff_role_id'";
		$rs_role = mysqli_query($conn, $sql_role);
		$row_role = mysqli_fetch_array($rs_role);
		//汇总输出
		$staff_infomation[] = array('staff_name' => $row['staff_name'],  'staff_role_name' => $row_role['role_name'], 'staff_create_time' => $row['staff_create_time'], 'staff_head_image' => $row['staff_head_image']);

	}
		//获取数据库staff_info表总记录条数
	$sql = "select count(staff_id) total from staff_info where staff_is_use=1";
	$row = fetchOne($sql);
		//如果数据不为空,回传数据
	if (!empty($staff_infomation)) {
		
		
		//将数组以json格式传回
		$final[] = array('data'=>$staff_infomation);
		$final[] = array('total' => $row['total']);
		// echo json_encode($staff_infomation);
		echo json_encode($final);
	}
		//如果数据为空回传0
	else {
		echo 0;
	}
		
	//如果为空传回1
?>
