-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2018-04-07 14:20:52
-- 服务器版本： 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nursinghome`
--

-- --------------------------------------------------------

--
-- 表的结构 `bed_info`
--

CREATE TABLE `bed_info` (
  `bed_id` int(11) NOT NULL,
  `bed_name` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '床位名',
  `room_id` int(11) NOT NULL COMMENT '房间id',
  `bed_status` int(11) NOT NULL COMMENT '床位状态（0为无设备，1为正常，2为异常）',
  `bed_create_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '床位创建时间',
  `bed_info_update_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '床位修改时间',
  `bed_is_use` int(11) NOT NULL DEFAULT '1' COMMENT '床位信息软删除，1为有，0为无',
  `building_id` int(11) NOT NULL COMMENT '所属楼id'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `bed_info`
--

INSERT INTO `bed_info` (`bed_id`, `bed_name`, `room_id`, `bed_status`, `bed_create_time`, `bed_info_update_time`, `bed_is_use`, `building_id`) VALUES
(110101, '1号床', 1101, 1, '2015-05-25', '2017-11-16', 1, 1),
(110102, '2号床', 1101, 2, '2015-05-25', '2017-11-16', 1, 1),
(110105, '1号床', 1102, 2, '2015-05-25', '2017-11-16', 1, 1),
(110103, '3号床', 1101, 1, '2015-05-25', '2017-11-16', 1, 1),
(110104, '4号床', 1101, 0, '2015-05-25', '2017-11-16', 1, 1),
(110106, '2号床', 1102, 2, '2015-05-25', '2017-11-16', 1, 1),
(110107, '1号床', 1103, 1, '2015-05-25', '2017-11-16', 1, 1),
(110108, '2号床', 1103, 1, '2015-05-25', '2017-11-16', 1, 1),
(110109, '3号床', 1103, 1, '2015-05-25', '2017-11-16', 1, 1),
(110110, '4号床', 1103, 1, '2015-05-25', '2017-11-16', 1, 1),
(110111, '1号床', 1104, 0, '2015-05-25', '2017-11-16', 1, 1),
(110112, '2号床', 1104, 1, '2015-05-25', '2017-11-16', 1, 1),
(110113, '3号床', 1104, 1, '2015-05-25', '2017-11-16', 1, 1),
(110114, '4号床', 1104, 1, '2015-05-25', '2017-11-16', 1, 1),
(110115, '5号床', 1104, 0, '2015-05-25', '2017-11-16', 1, 1),
(110116, '6号床', 1104, 1, '2015-05-25', '2017-11-16', 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `bed_info_for_lab`
--

CREATE TABLE `bed_info_for_lab` (
  `bed_info_id` int(11) NOT NULL,
  `patient_name` varchar(100) NOT NULL,
  `room_pos` varchar(100) NOT NULL,
  `symptom_info` varchar(100) NOT NULL,
  `patient_status` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `bed_info_for_lab`
--

INSERT INTO `bed_info_for_lab` (`bed_info_id`, `patient_name`, `room_pos`, `symptom_info`, `patient_status`) VALUES
(1, '老大爷', '1楼1层101号房1号床', '高血压,糖尿病', '正常'),
(2, '林黛玉', '1楼1层101号房2号床', '高血压,糖尿病', '异常'),
(3, '罗大佑', '1楼1层101号房3号床', '高血压,糖尿病', '正常'),
(4, '老队员', '1楼1层102号房1号床', '高血压,糖尿病', '异常'),
(5, '绿豆芽', '1楼1层102号房2号床', '高血压,糖尿病', '正常'),
(6, '六单元', '1楼1层102号房3号床', '高血压,糖尿病', '异常');

-- --------------------------------------------------------

--
-- 表的结构 `building_info`
--

CREATE TABLE `building_info` (
  `building_id` int(11) NOT NULL,
  `building_name` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '楼名',
  `building_floor_num` int(11) NOT NULL COMMENT '楼层数',
  `building_create_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '楼信息创建时间',
  `building_update_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '楼修改时间',
  `building_is_use` int(11) NOT NULL DEFAULT '1' COMMENT '楼信息软删除，1为有，0为无'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `building_info`
--

INSERT INTO `building_info` (`building_id`, `building_name`, `building_floor_num`, `building_create_time`, `building_update_time`, `building_is_use`) VALUES
(1, '博文苑一号楼', 12, '2015-05-25', '2017-11-16', 1),
(2, '博文苑二号楼', 12, '2015-05-25', '2017-11-16', 1),
(3, '恕园一号楼', 8, '2015-05-25', '2017-11-16', 1);

-- --------------------------------------------------------

--
-- 表的结构 `equipment_info`
--

CREATE TABLE `equipment_info` (
  `equipment_id` int(11) NOT NULL,
  `bed_id` int(11) NOT NULL COMMENT '床位id',
  `equipment_serial_number` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '设备编号',
  `equipment_install_date` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '绑定时间',
  `equipment_type` int(11) NOT NULL COMMENT '设备类型',
  `equipment_status` int(11) NOT NULL COMMENT '设备状态（0为已报废，1为未绑定，2为已绑定，3为正常，4为异常）',
  `equipment_create_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '设备出厂时间',
  `equipment_info_update_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '设备信息修改时间',
  `equipment_is_use` int(11) NOT NULL DEFAULT '1' COMMENT '软删除，0为无，1为有'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `equipment_info`
--

INSERT INTO `equipment_info` (`equipment_id`, `bed_id`, `equipment_serial_number`, `equipment_install_date`, `equipment_type`, `equipment_status`, `equipment_create_time`, `equipment_info_update_time`, `equipment_is_use`) VALUES
(1, 110101, '10011', '2015-05-25', 1, 2, '2015-05-25', '', 1),
(2, 110102, '10012', '2015-05-25', 1, 2, '2015-05-25', '', 1),
(3, 110103, '10031', '2017-09-15', 0, 1, '2017-09-15', '2017-09-15', 1);

-- --------------------------------------------------------

--
-- 表的结构 `module_info`
--

CREATE TABLE `module_info` (
  `module_id` int(11) NOT NULL COMMENT '此模块的坐标所属ID',
  `user_id` int(11) NOT NULL COMMENT '所绑定的用户的ID',
  `module_x` int(11) NOT NULL,
  `module_y` int(11) NOT NULL,
  `module_width` int(11) NOT NULL,
  `module_height` int(11) NOT NULL,
  `is_used` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否在使用',
  `zindex` int(3) NOT NULL COMMENT 'z-index的值'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='每个模块的信息';

--
-- 转存表中的数据 `module_info`
--

INSERT INTO `module_info` (`module_id`, `user_id`, `module_x`, `module_y`, `module_width`, `module_height`, `is_used`, `zindex`) VALUES
(1, 1, 2, 91, 608, 431, 1, 400),
(2, 1, 461, 110, 624, 411, 1, 500),
(3, 1, 651, 112, 523, 241, 1, 300);

-- --------------------------------------------------------

--
-- 表的结构 `role_info`
--

CREATE TABLE `role_info` (
  `role_id` int(11) NOT NULL COMMENT '角色id',
  `role_name` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '角色名称',
  `role_description` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '角色描述',
  `role_create_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '创建时间',
  `role_info_update_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '修改时间',
  `role_is_use` int(11) NOT NULL DEFAULT '1' COMMENT '软删除，0为无，1为有'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `role_info`
--

INSERT INTO `role_info` (`role_id`, `role_name`, `role_description`, `role_create_time`, `role_info_update_time`, `role_is_use`) VALUES
(1, '一般管理员', '拥有所有权限', '2017-07-09', '', 1),
(2, '普通护工', '查看床位设备，护理记录权限', '2017-07-09', '2017-11-12', 1),
(3, '高级护工', '查看床位设备，护理记录，护理服务权限', '2017-07-09', '2017-09-29', 1),
(4, '超级管理员', '拥有所有权限，最高权限', '2017-07-09', '2017-09-29', 1),
(5, '前台', '只有会员管理权限', '2017-07-09', '', 1),
(6, '床位管理员', '只有床位配置权限', '2017-07-19', '2017-07-19', 0),
(7, '12', '123', '2017-07-19', '2017-07-19', 0),
(8, '12', '123', '2017-07-19', '2017-07-19', 0),
(9, '12', '123', '2017-07-19', '2017-07-19', 0),
(10, '', '', '2017-07-19', '2017-07-19', 0),
(11, '123123123', '123123123', '2017-07-19', '2017-07-19', 0),
(12, '123123123', '123123123', '2017-07-19', '2017-07-19', 0),
(13, '床位管理员', '只有床位配置权限', '2017-07-19', '2017-07-19', 0),
(14, '设备管理员', '只有设备信息权限', '2017-07-19', '2017-09-29', 1),
(15, '员工管理员', '', '2017-07-19', '2017-09-29', 0),
(16, '企业管理员', '', '2017-07-19', '2017-09-29', 0),
(17, '特级护工', '特级护理服务', '2017-09-29', '2017-09-29', 0);

-- --------------------------------------------------------

--
-- 表的结构 `staff_info`
--

CREATE TABLE `staff_info` (
  `staff_id` int(11) NOT NULL,
  `staff_serial_number` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '工号',
  `staff_name` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '员工姓名',
  `staff_gender` int(11) NOT NULL COMMENT '员工性别，0为女，1为男',
  `staff_phone_num` varchar(11) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `staff_role_id` int(11) NOT NULL COMMENT '员工类型,1为一般管理员，2为普通护工，3为高级护工，4为超级管理员',
  `staff_id_type` int(11) NOT NULL COMMENT '证件类型，1为二代身份证，2为港澳通行证，3为台湾通行证，4为护照',
  `staff_id_card_no` varchar(18) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '证件号码',
  `staff_photo_url` varchar(99) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '照片地址',
  `staff_birthdate` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '员工生日日期',
  `staff_nationality` varchar(5) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '民族',
  `staff_address` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '员工住址',
  `bed_status` int(11) NOT NULL COMMENT '床位位置（床位1、2..）',
  `staff_house_phone_num` varchar(14) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '住宅电话',
  `staff_emergency_name` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '紧急联系人姓名',
  `staff_emergency_phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '紧急联系人电话',
  `staff_create_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '入职时间',
  `staff_info_update_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '修改时间',
  `staff_is_use` int(11) NOT NULL DEFAULT '1' COMMENT '员工信息软删除，1为有，0为无',
  `staff_head_image` varchar(100) NOT NULL DEFAULT 'img/avatar.jpg' COMMENT '员工头像',
  `staff_is_in_service` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否在岗'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `staff_info`
--

INSERT INTO `staff_info` (`staff_id`, `staff_serial_number`, `staff_name`, `staff_gender`, `staff_phone_num`, `staff_role_id`, `staff_id_type`, `staff_id_card_no`, `staff_photo_url`, `staff_birthdate`, `staff_nationality`, `staff_address`, `bed_status`, `staff_house_phone_num`, `staff_emergency_name`, `staff_emergency_phone`, `staff_create_time`, `staff_info_update_time`, `staff_is_use`, `staff_head_image`, `staff_is_in_service`) VALUES
(1, 'AL001', '张三', 1, '18710240101', 2, 1, '330101199504225225', '', '1995-04-22', '汉族', '浙江省杭州市余杭区仓新街123号', 2, '057-55114778', '张大', '13545678888', '2012-06-10', '2017-07-31', 1, 'img/avatar.jpg', 1),
(2, 'AL002', '李四', 0, '15241223456', 1, 1, '330102198906224236', '', '1989-06-22', '汉族', '浙江省杭州市余杭区海曙路572号', 1, '057-55114778', '李二', '13672318876', '2016-03-06', '2017-09-29', 1, 'img/avatar.jpg', 1),
(3, 'AL003', '王五', 1, '15247859956', 2, 1, '330783199408241555', '', '1994-08-24', '汉族', '浙江省杭州市余杭区海曙路1024号', 1, '057-55114778', '王小小', '18757779596', '2015-09-02', '2017-11-16', 1, 'img/avatar.jpg', 1),
(10, 'AL0010', '刘思', 0, '18055478895', 3, 1, '330793197612201120', '', '1976-12-20', '汉族', '浙江省金华市东阳市江滨南街124号', 0, '057-55114778', '刘彬', '18055124778', '2017-05-20', '2017-11-16', 1, 'img/avatar.jpg', 1),
(6, 'AL006', '王玲', 0, '18022441578', 3, 1, '330783199611111234', '', '1996-11-01', '汉族', '浙江省杭州市余杭区海曙路1024号', 0, '021-25547789', '王强', '18045678901', '2015-09-01', '2017-11-14', 1, 'img/avatar.jpg', 0),
(7, 'AL007', '杨凯', 0, '18745678901', 1, 1, '330724199612065224', '', '1996-10-01', '汉族', '浙江省杭州市余杭区海曙路1024号', 0, '021-00124556', '杨洋', '18055224474', '2015-02-24', '2017-11-16', 1, 'img/avatar.jpg', 0),
(8, 'AL008', '张婷', 0, '18755471124', 3, 1, '330783199612065224', '', '1996-12-11', '汉族', '浙江省杭州市西湖区余杭塘路378号', 0, '027-112344491', '张三', '18022477558', '2014-10-11', '2017-11-16', 1, 'img/avatar.jpg', 1),
(9, 'AL009', '长安', 1, '18044578845', 1, 1, '330724199611224450', '', '1996-12-05', '汉族', '山东省济南市历下区理性路111号', 0, '037-11205478', '长达', '18057889656', '2017-11-30', '2017-11-16', 1, 'img/avatar.jpg', 0),
(11, 'AL0011', '吕东雨', 1, '18100000000', 1, 1, '330227197979797', '../images/timg.jpg', '2017-12-06', '傣族', '浙江省杭州市西湖区养老院', 0, '0571-41545445', '王含泽', '18100000000', '2017-12-17', NULL, 1, 'img/avatar.jpg', 0),
(12, 'AL0012', '老大爷', 0, '18100000000', 1, 1, '330227197979797', '../images/timg.jpg', '2017-05-19', '瑶族', '浙江省杭州市西湖区精神病院', 0, '0571-41545445', '啊啊啊', '18100000000', '2017-12-09', NULL, 1, 'img/avatar.jpg', 1),
(13, 'AL0013', '林黛玉', 1, '18100000000', 4, 2, '330227197979797', '../images/timg.jpg', '2017-12-01', '汉族', '浙江省杭州市西湖区啊啊啊', 0, '0571-41545445', '事实上', '18100000000', '2017-12-23', NULL, 1, 'img/avatar.jpg', 0),
(14, 'AL0014', '爱迪生', 0, '18100000000', 4, 1, '18100000000', '../images/timg.jpg', '2017-12-13', '高山族', '浙江省杭州市西湖区啊啊啊', 0, '0571-41545445', '事实上', '18100000000', '2017-12-14', NULL, 1, 'img/avatar.jpg', 0),
(15, 'AL0015', '哎哎哎', 0, '18100000000', 4, 1, '330227197979797', '../images/timg.jpg', '2017-12-07', '鄂伦春族', '浙江省杭州市西湖区发给', 0, '0571-41545445', '啊啊', '18100000000', '2017-12-19', NULL, 1, 'img/avatar.jpg', 1),
(16, 'AL0016', '事实上', 0, '18100000000', 3, 1, '18100000000', '../images/timg.jpg', '2017-12-13', '鄂伦春族', '浙江省杭州市西湖区www', 0, '0571-41545445', '啊啊啊', '18100000000', '2017-12-31', NULL, 1, 'img/avatar.jpg', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bed_info`
--
ALTER TABLE `bed_info`
  ADD PRIMARY KEY (`bed_id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `bed_info_for_lab`
--
ALTER TABLE `bed_info_for_lab`
  ADD PRIMARY KEY (`bed_info_id`);

--
-- Indexes for table `building_info`
--
ALTER TABLE `building_info`
  ADD PRIMARY KEY (`building_id`);

--
-- Indexes for table `equipment_info`
--
ALTER TABLE `equipment_info`
  ADD PRIMARY KEY (`equipment_id`),
  ADD KEY `bed_id` (`bed_id`);

--
-- Indexes for table `module_info`
--
ALTER TABLE `module_info`
  ADD PRIMARY KEY (`module_id`);

--
-- Indexes for table `role_info`
--
ALTER TABLE `role_info`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `staff_info`
--
ALTER TABLE `staff_info`
  ADD PRIMARY KEY (`staff_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `bed_info`
--
ALTER TABLE `bed_info`
  MODIFY `bed_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110117;
--
-- 使用表AUTO_INCREMENT `bed_info_for_lab`
--
ALTER TABLE `bed_info_for_lab`
  MODIFY `bed_info_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- 使用表AUTO_INCREMENT `building_info`
--
ALTER TABLE `building_info`
  MODIFY `building_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `equipment_info`
--
ALTER TABLE `equipment_info`
  MODIFY `equipment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `module_info`
--
ALTER TABLE `module_info`
  MODIFY `module_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '此模块的坐标所属ID', AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `role_info`
--
ALTER TABLE `role_info`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色id', AUTO_INCREMENT=18;
--
-- 使用表AUTO_INCREMENT `staff_info`
--
ALTER TABLE `staff_info`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
