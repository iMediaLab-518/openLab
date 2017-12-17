<?php 
	ini_set("display_errors", "On");
	error_reporting(E_ALL);
	//引入数据库连接php
	include ('conn.php');
	//引入功能
	include ('function.php');

	//获取请求数据

	//编写sql语句

	$sql = " SELECT module_x ,module_y,module_width,module_height FROM module_info 
	where module_id = 1 and is_used = 1;
	";


	//执行sql
	$rs = mysqli_query($conn, $sql);
	//将数据存入数组

	while ($row = mysqli_fetch_array($rs)) {
		//汇总输出
		$module_info[] = array('module_x' => $row['module_x'], 'module_y' => $row['module_y'], 'module_width' => $row['module_width'], 'module_height' => $row['module_height']);

	}
	//返回数据
	if (!empty($module_info)) {
		
		echo json_encode($module_info['0']);
	}
	//如果数据为空回传0
	else {
		echo 0;
	}
		
?>
