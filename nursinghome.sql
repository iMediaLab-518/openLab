-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017-12-17 07:32:28
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
  `bed_is_use` int(11) NOT NULL DEFAULT '1' COMMENT '床位信息软删除，1为有，0为无'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `bed_info`
--

INSERT INTO `bed_info` (`bed_id`, `bed_name`, `room_id`, `bed_status`, `bed_create_time`, `bed_info_update_time`, `bed_is_use`) VALUES
(110101, '1号床', 1101, 1, '2015-05-25', '2017-11-16', 1),
(110102, '2号床', 1101, 2, '2015-05-25', '2017-11-16', 1),
(110105, '1号床', 1102, 2, '2015-05-25', '2017-11-16', 1),
(110103, '3号床', 1101, 1, '2015-05-25', '2017-11-16', 1),
(110104, '4号床', 1101, 0, '2015-05-25', '2017-11-16', 1),
(110106, '2号床', 1102, 2, '2015-05-25', '2017-11-16', 1),
(110107, '1号床', 1103, 1, '2015-05-25', '2017-11-16', 1),
(110108, '2号床', 1103, 1, '2015-05-25', '2017-11-16', 1),
(110109, '3号床', 1103, 1, '2015-05-25', '2017-11-16', 1),
(110110, '4号床', 1103, 1, '2015-05-25', '2017-11-16', 1),
(110111, '1号床', 1104, 0, '2015-05-25', '2017-11-16', 1),
(110112, '2号床', 1104, 1, '2015-05-25', '2017-11-16', 1),
(110113, '3号床', 1104, 1, '2015-05-25', '2017-11-16', 1),
(110114, '4号床', 1104, 1, '2015-05-25', '2017-11-16', 1),
(110115, '5号床', 1104, 0, '2015-05-25', '2017-11-16', 1),
(110116, '6号床', 1104, 1, '2015-05-25', '2017-11-16', 1);

-- --------------------------------------------------------

--
-- 表的结构 `bed_manage_record`
--

CREATE TABLE `bed_manage_record` (
  `record_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL COMMENT '员工id',
  `bed_id` int(11) NOT NULL COMMENT '床位id',
  `record_create_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '员工管理床位开始时间',
  `bed_manage_record_update_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '床位管理记录修改时间',
  `record_is_use` int(11) NOT NULL DEFAULT '1' COMMENT '床位员工配置信息软删除，1为有，0为无'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
-- 表的结构 `care_record`
--

CREATE TABLE `care_record` (
  `care_record_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL COMMENT '员工id',
  `checkin_id` int(11) NOT NULL COMMENT '入住记录id',
  `care_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '护理时间',
  `record_type` int(11) NOT NULL COMMENT '护理类型',
  `remark` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '详细评论',
  `care_record_create_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '护理记录创建时间',
  `care_record_update_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '护理记录修改时间',
  `care_record_is_use` int(11) NOT NULL DEFAULT '1' COMMENT '软删除，0为无，1为有'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `care_service_record`
--

CREATE TABLE `care_service_record` (
  `care_service_record_id` int(11) NOT NULL,
  `care_record_id` int(11) NOT NULL COMMENT '护理记录id',
  `service_id` int(11) NOT NULL COMMENT '服务id',
  `service_time` int(11) NOT NULL COMMENT '服务时间频率',
  `care_service_record_create_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '创建时间',
  `care_service_record_update_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '修改时间',
  `care_service_record_is_use` int(11) NOT NULL DEFAULT '1' COMMENT '软删除，0为无，1为有'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `checkin_info`
--

CREATE TABLE `checkin_info` (
  `checkin_id` int(11) NOT NULL COMMENT '入住id',
  `member_id` int(11) NOT NULL COMMENT '会员id',
  `bed_id` int(11) NOT NULL COMMENT '床位id',
  `level_id` int(11) NOT NULL COMMENT '等级id',
  `checkout_date` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '退住日期',
  `checkout_reason` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '退住原因',
  `checkin_create_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '创建时间',
  `checkin_info_update_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '最近修改时间',
  `checkin_is_use` int(11) NOT NULL DEFAULT '1' COMMENT '软删除，0为无，1为有'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `equipment_bind_record`
--

CREATE TABLE `equipment_bind_record` (
  `equipment_bind_record_id` int(11) NOT NULL COMMENT '设备绑定记录id',
  `bed_id` int(11) NOT NULL COMMENT '床位id',
  `equipment_id` int(11) NOT NULL COMMENT '设备id',
  `equipment_bind_record_create_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '设备绑定记录创建时间',
  `equipment_bind_record_update_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '设备绑定记录修改时间',
  `equipment_bind_record_is_use` int(11) NOT NULL DEFAULT '1' COMMENT '软删除，0为无，1为有'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `equipment_bind_record`
--

INSERT INTO `equipment_bind_record` (`equipment_bind_record_id`, `bed_id`, `equipment_id`, `equipment_bind_record_create_time`, `equipment_bind_record_update_time`, `equipment_bind_record_is_use`) VALUES
(1, 110101, 1, '2015-05-25', '', 1),
(2, 110102, 2, '2015-05-25', '', 1);

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
(1, 110101, '10011', '2015-05-25', 1, 1, '2015-05-25', '', 1),
(2, 110102, '10012', '2015-05-25', 1, 1, '2015-05-25', '', 1),
(3, 0, '10031', '2017-09-15', 0, 1, '2017-09-15', '2017-09-15', 1);

-- --------------------------------------------------------

--
-- 表的结构 `family_member_info`
--

CREATE TABLE `family_member_info` (
  `family_member_id` int(11) NOT NULL COMMENT '家庭成员id',
  `member_id` int(11) NOT NULL COMMENT '会员id',
  `family_member_name` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '家属姓名',
  `family_member_relation` varchar(4) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '家属关系',
  `family_member_phone_num` varchar(11) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '家属电话',
  `family_member_create_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '创建时间',
  `family_member_info_update_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '修改时间',
  `family_member_is_use` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `medical_history`
--

CREATE TABLE `medical_history` (
  `medical_history_id` int(11) NOT NULL COMMENT '病史id',
  `member_id` int(11) NOT NULL COMMENT '会员id',
  `high_blood_pressure` int(11) NOT NULL COMMENT '高血压，0为无，1为有',
  `high_blood_lipids` int(11) NOT NULL COMMENT '高血脂，0为无，1为有',
  `high_blood_sugar` int(11) NOT NULL COMMENT '高血糖，0为无，1为有',
  `disbetes` int(11) NOT NULL COMMENT '糖尿病，0为无，1为有',
  `coronary_heart_disease` int(11) NOT NULL COMMENT '冠心病，0为无，1为有',
  `medical_history_create_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '创建时间',
  `medical_history_update_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '修改时间',
  `medical_history_is_use` int(11) NOT NULL DEFAULT '1' COMMENT '软删除，0为无，1为有'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `member_info`
--

CREATE TABLE `member_info` (
  `member_id` int(11) NOT NULL COMMENT '会员id',
  `member_serial_number` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '会员编号',
  `member_name` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '会员姓名',
  `member_gender` int(11) NOT NULL COMMENT '会员性别',
  `member_birthdate` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '会员生日',
  `member_address` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '会员住址',
  `member_nationality` varchar(5) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '会员民族',
  `member_photo_url` varchar(99) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '照片路径',
  `member_id_type` int(11) NOT NULL COMMENT '证件类型',
  `member_id_No` varchar(18) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '证件号码',
  `member_height` varchar(3) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '身高',
  `member_weight` varchar(3) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '体重',
  `member_blood_type` int(11) NOT NULL COMMENT '血型',
  `self_care_situation` int(11) NOT NULL COMMENT '自理情况，1为完全自理，2为一定自理能力，3为不能自理',
  `member_status` int(11) NOT NULL,
  `member_remark` varchar(120) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '备注',
  `member_create_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '创建时间',
  `member_info_update_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '修改时间',
  `member_is_use` int(11) NOT NULL DEFAULT '1' COMMENT '软删除，0为无，1为有'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
  `is_used` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否在使用'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='每个模块的信息';

--
-- 转存表中的数据 `module_info`
--

INSERT INTO `module_info` (`module_id`, `user_id`, `module_x`, `module_y`, `module_width`, `module_height`, `is_used`) VALUES
(1, 1, 344, 88, 259, 566, 1);

-- --------------------------------------------------------

--
-- 表的结构 `nursing_class`
--

CREATE TABLE `nursing_class` (
  `nursing_class_id` int(11) NOT NULL,
  `nursing_level_id` int(11) NOT NULL COMMENT '等级id',
  `nursing_class_name` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '类型名称',
  `nursing_class_create_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '创建时间',
  `nursing_class_update_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '修改时间',
  `nursing_class_is_use` int(11) NOT NULL DEFAULT '1' COMMENT '软删除，0为无，1为有'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `nursing_class`
--

INSERT INTO `nursing_class` (`nursing_class_id`, `nursing_level_id`, `nursing_class_name`, `nursing_class_create_time`, `nursing_class_update_time`, `nursing_class_is_use`) VALUES
(1, 1, '基础服务', '2015-05-02', '2017-10-30', 1),
(2, 1, '健康服务', '2015-05-02', NULL, 1),
(3, 2, '高级特殊服务', '2015-05-02', '2017-10-30', 1),
(4, 4, '基础服务', '2017-10-30', NULL, 1),
(5, 4, '超级王玲服务', '2017-10-30', '2017-10-30', 1);

-- --------------------------------------------------------

--
-- 表的结构 `nursing_level`
--

CREATE TABLE `nursing_level` (
  `nursing_level_id` int(11) NOT NULL COMMENT '护理等级id',
  `nursing_level_name` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '等级名称',
  `nursing_level_create_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '创建时间',
  `nursing_level_update_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '修改时间',
  `nursing_level_is_use` int(11) NOT NULL DEFAULT '1' COMMENT '软删除，0为无，1为有'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `nursing_level`
--

INSERT INTO `nursing_level` (`nursing_level_id`, `nursing_level_name`, `nursing_level_create_time`, `nursing_level_update_time`, `nursing_level_is_use`) VALUES
(1, '普通护理', '2015-05-02', NULL, 1),
(2, '高级护理', '2015-05-02', NULL, 1),
(3, '特殊护理', '2015-05-02', NULL, 1),
(4, '超级无敌套餐', '2017-10-30', '2017-10-30', 0);

-- --------------------------------------------------------

--
-- 表的结构 `nursing_service`
--

CREATE TABLE `nursing_service` (
  `nursing_service_id` int(11) NOT NULL COMMENT '护理服务id',
  `nursing_class_id` int(11) NOT NULL,
  `nursing_service_name` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '服务名称',
  `nursing_service_frequency` int(11) NOT NULL COMMENT '护理频率（每日为1，每周为2，每月为3，每季度为4，每年为5）',
  `nursing_service_create_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '创建时间',
  `nursing_service_update_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '修改时间',
  `nursing_service_is_use` int(11) NOT NULL DEFAULT '1' COMMENT '软删除，0为无，1为有'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `nursing_service`
--

INSERT INTO `nursing_service` (`nursing_service_id`, `nursing_class_id`, `nursing_service_name`, `nursing_service_frequency`, `nursing_service_create_time`, `nursing_service_update_time`, `nursing_service_is_use`) VALUES
(1, 1, '打扫卫生', 1, '2015-05-02', NULL, 1),
(2, 1, '换洗衣物', 2, '2015-05-02', '2017-10-30', 1),
(3, 1, '换洗床单', 2, '2015-05-02', NULL, 1),
(4, 1, '定期理发', 3, '2015-05-02', NULL, 1),
(5, 1, '送餐服务', 1, '2015-05-02', NULL, 0),
(6, 1, '起床提醒', 1, '2015-05-02', NULL, 1);

-- --------------------------------------------------------

--
-- 表的结构 `nursing_service_frequency`
--

CREATE TABLE `nursing_service_frequency` (
  `nursing_service_frequency_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
-- 表的结构 `room_info`
--

CREATE TABLE `room_info` (
  `room_id` int(11) NOT NULL COMMENT '房间id',
  `room_name` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '房间名',
  `building_id` int(11) NOT NULL COMMENT '楼id',
  `building_floor_No` int(11) NOT NULL COMMENT '房间位于第几层 ',
  `room_type` int(11) NOT NULL COMMENT '房间类型，1为双人间，2为四人间，3为六人间，4为其他',
  `room_photo_url` varchar(80) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '房间照片路径',
  `room_orientation` int(11) NOT NULL COMMENT '房间朝阳，0为背阳，1为朝阳',
  `room_lighting` int(11) NOT NULL COMMENT '房间采光，0为一般，1为良好',
  `room_ventilate` int(11) NOT NULL COMMENT '房间通风，0为一般，1为良好',
  `room_create_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '房间创建时间',
  `room_info_update_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '修改时间',
  `room_is_use` int(11) NOT NULL DEFAULT '1' COMMENT '房间信息软删除，1为有，0为无'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `room_info`
--

INSERT INTO `room_info` (`room_id`, `room_name`, `building_id`, `building_floor_No`, `room_type`, `room_photo_url`, `room_orientation`, `room_lighting`, `room_ventilate`, `room_create_time`, `room_info_update_time`, `room_is_use`) VALUES
(1101, '101', 1, 1, 2, '', 1, 1, 1, '2015-05-25', '2017-11-16', 1),
(1102, '102', 1, 1, 1, '', 1, 1, 0, '2015-05-25', '2017-11-16', 1),
(1103, '103', 1, 1, 2, '', 0, 0, 0, '2015-05-25', '2017-11-16', 1),
(1104, '104', 1, 1, 3, '', 0, 0, 0, '2015-05-25', '2017-11-16', 1),
(1105, '105', 1, 1, 3, '', 1, 0, 1, '2015-05-25', '2017-11-16', 1),
(1106, '106', 1, 1, 2, '', 1, 0, 1, '2015-05-25', '2017-11-16', 1),
(1107, '107', 1, 1, 2, '', 1, 1, 0, '2015-05-25', '2017-11-16', 1),
(1108, '108', 1, 1, 2, '', 0, 1, 0, '2015-05-25', '2017-11-16', 1),
(1109, '109', 1, 1, 2, '', 1, 1, 1, '2015-05-25', '2017-11-16', 1),
(1110, '110', 1, 1, 2, '', 1, 1, 0, '2015-05-25', '2017-11-16', 1),
(1111, '111', 1, 1, 2, '', 1, 0, 1, '2015-05-25', '2017-11-16', 1);

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
  `staff_head_image` varchar(100) NOT NULL DEFAULT 'img/avatar.jpg' COMMENT '员工头像'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `staff_info`
--

INSERT INTO `staff_info` (`staff_id`, `staff_serial_number`, `staff_name`, `staff_gender`, `staff_phone_num`, `staff_role_id`, `staff_id_type`, `staff_id_card_no`, `staff_photo_url`, `staff_birthdate`, `staff_nationality`, `staff_address`, `bed_status`, `staff_house_phone_num`, `staff_emergency_name`, `staff_emergency_phone`, `staff_create_time`, `staff_info_update_time`, `staff_is_use`, `staff_head_image`) VALUES
(1, 'AL001', '张三', 1, '18710240101', 2, 1, '330101199504225225', '', '1995-04-22', '汉族', '浙江省杭州市余杭区仓新街123号', 2, '057-55114778', '张大', '13545678888', '2012-06-10', '2017-07-31', 1, 'img/avatar.jpg'),
(2, 'AL002', '李四', 0, '15241223456', 1, 1, '330102198906224236', '', '1989-06-22', '汉族', '浙江省杭州市余杭区海曙路572号', 1, '057-55114778', '李二', '13672318876', '2016-03-06', '2017-09-29', 1, 'img/avatar.jpg'),
(3, 'AL003', '王五', 1, '15247859956', 2, 1, '330783199408241555', '', '1994-08-24', '汉族', '浙江省杭州市余杭区海曙路1024号', 1, '057-55114778', '王小小', '18757779596', '2015-09-02', '2017-11-16', 1, 'img/avatar.jpg'),
(10, 'AL0010', '刘思', 0, '18055478895', 3, 1, '330793197612201120', '', '1976-12-20', '汉族', '浙江省金华市东阳市江滨南街124号', 0, '057-55114778', '刘彬', '18055124778', '2017-05-20', '2017-11-16', 1, 'img/avatar.jpg'),
(6, 'AL006', '王玲', 0, '18022441578', 3, 1, '330783199611111234', '', '1996-11-01', '汉族', '浙江省杭州市余杭区海曙路1024号', 0, '021-25547789', '王强', '18045678901', '2015-09-01', '2017-11-14', 1, 'img/avatar.jpg'),
(7, 'AL007', '杨凯', 0, '18745678901', 1, 1, '330724199612065224', '', '1996-10-01', '汉族', '浙江省杭州市余杭区海曙路1024号', 0, '021-00124556', '杨洋', '18055224474', '2015-02-24', '2017-11-16', 1, 'img/avatar.jpg'),
(8, 'AL008', '张婷', 0, '18755471124', 3, 1, '330783199612065224', '', '1996-12-11', '汉族', '浙江省杭州市西湖区余杭塘路378号', 0, '027-112344491', '张三', '18022477558', '2014-10-11', '2017-11-16', 1, 'img/avatar.jpg'),
(9, 'AL009', '长安', 1, '18044578845', 1, 1, '330724199611224450', '', '1996-12-05', '汉族', '山东省济南市历下区理性路111号', 0, '037-11205478', '长达', '18057889656', '2017-11-30', '2017-11-16', 1, 'img/avatar.jpg'),
(11, 'AL0011', '吕东雨', 1, '18100000000', 1, 1, '330227197979797', '../images/timg.jpg', '2017-12-06', '傣族', '浙江省杭州市西湖区养老院', 0, '0571-41545445', '王含泽', '18100000000', '2017-12-17', NULL, 1, 'img/avatar.jpg'),
(12, 'AL0012', '老大爷', 0, '18100000000', 1, 1, '330227197979797', '../images/timg.jpg', '2017-05-19', '瑶族', '浙江省杭州市西湖区精神病院', 0, '0571-41545445', '啊啊啊', '18100000000', '2017-12-09', NULL, 1, 'img/avatar.jpg'),
(13, 'AL0013', '林黛玉', 1, '18100000000', 4, 2, '330227197979797', '../images/timg.jpg', '2017-12-01', '汉族', '浙江省杭州市西湖区啊啊啊', 0, '0571-41545445', '事实上', '18100000000', '2017-12-23', NULL, 1, 'img/avatar.jpg'),
(14, 'AL0014', '爱迪生', 0, '18100000000', 4, 1, '18100000000', '../images/timg.jpg', '2017-12-13', '高山族', '浙江省杭州市西湖区啊啊啊', 0, '0571-41545445', '事实上', '18100000000', '2017-12-14', NULL, 1, 'img/avatar.jpg'),
(15, 'AL0015', '哎哎哎', 0, '18100000000', 4, 1, '330227197979797', '../images/timg.jpg', '2017-12-07', '鄂伦春族', '浙江省杭州市西湖区发给', 0, '0571-41545445', '啊啊', '18100000000', '2017-12-19', NULL, 1, 'img/avatar.jpg'),
(16, 'AL0016', '事实上', 0, '18100000000', 3, 1, '18100000000', '../images/timg.jpg', '2017-12-13', '鄂伦春族', '浙江省杭州市西湖区www', 0, '0571-41545445', '啊啊啊', '18100000000', '2017-12-31', NULL, 1, 'img/avatar.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `system_right`
--

CREATE TABLE `system_right` (
  `system_id` int(11) NOT NULL COMMENT '系统id',
  `role_id` int(11) NOT NULL COMMENT '角色id',
  `company_r` int(11) NOT NULL COMMENT '企业',
  `member_r` int(11) NOT NULL COMMENT '会员',
  `health_r` int(11) NOT NULL COMMENT '健康',
  `staff_manage_r` varchar(11) NOT NULL COMMENT '员工管理',
  `role_manage_r` varchar(11) NOT NULL COMMENT '角色管理',
  `bed_manage_r` varchar(11) NOT NULL COMMENT '床位管理',
  `equipment_manage_r` varchar(11) NOT NULL COMMENT '设备管理',
  `service_manage_r` varchar(11) DEFAULT NULL COMMENT '服务管理',
  `ui_manage_r` varchar(11) NOT NULL COMMENT '用户界面',
  `member_manage_r` varchar(11) NOT NULL COMMENT '会员管理',
  `checkin_manage_r` varchar(11) DEFAULT NULL COMMENT '入住管理',
  `care_record_r` varchar(11) NOT NULL COMMENT '护理记录',
  `system_create_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '创建时间',
  `system_right_update_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '修改时间',
  `system_is_use` int(11) NOT NULL DEFAULT '1' COMMENT '软删除，0为无，1为有'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `system_right`
--

INSERT INTO `system_right` (`system_id`, `role_id`, `company_r`, `member_r`, `health_r`, `staff_manage_r`, `role_manage_r`, `bed_manage_r`, `equipment_manage_r`, `service_manage_r`, `ui_manage_r`, `member_manage_r`, `checkin_manage_r`, `care_record_r`, `system_create_time`, `system_right_update_time`, `system_is_use`) VALUES
(1, 1, 1, 1, 1, '0x457', '0x457', '0x457', '0x457', '0x457', '0x1', '0x457', '0x457', '0x457', '2017-07-09', '', 1),
(2, 2, 1, 1, 1, '0x0', '0x0', '0x3F2', '0x3E8', '0x0', '0x0', '0x456', '0x0', '0x456', '2017-07-09', '2017-11-12', 1),
(3, 3, 1, 1, 1, '0x0', '0x456', '0x3E8', '0x456', '0x456', '0x0', '0x456', '0x0', '0x457', '2017-07-09', '2017-09-29', 1),
(4, 4, 1, 1, 1, '0x457', '0x457', '0x456', '0x457', '0x457', '0x1', '0x457', '0x457', '0x44C', '2017-07-09', '2017-09-29', 1),
(5, 5, 0, 1, 0, '0x0', '0x0', '0x0', '0x0', '0x0', '0x0', '0x457', '0x456', '0x0', '2017-07-09', '', 1),
(6, 12, 0, 0, 0, '0x0', '0x0', '0x0', '0x0', NULL, '0x0', '0x0', NULL, '0x0', '2017-07-19', NULL, 1),
(7, 13, 1, 0, 0, '0x0', '0x0', '0x457', '0x0', NULL, '0x0', '0x0', NULL, '0x0', '2017-07-19', NULL, 1),
(8, 14, 1, 0, 0, '0x456', '0x3E8', '0x3E9', '0x457', NULL, '0x0', '0x0', NULL, '0x0', '2017-07-19', '2017-09-29', 1),
(9, 15, 1, 0, 0, '0x457', '0x0', '0x457', '0x0', NULL, '0x1', '0x0', NULL, '0x0', '2017-07-19', '2017-09-29', 0),
(10, 16, 1, 0, 0, '0x457', '0x6E', '0x457', '0x6E', NULL, '0x1', '0x0', NULL, '0x0', '2017-07-19', '2017-09-29', 0),
(11, 17, 1, 1, 1, '0x6E', '0x457', '0x457', '0x457', NULL, '0x1', '0x44C', NULL, '0x6E', '2017-09-29', '2017-09-29', 0);

-- --------------------------------------------------------

--
-- 表的结构 `user_info`
--

CREATE TABLE `user_info` (
  `user_id` int(11) NOT NULL,
  `user_pStyle` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '青碧' COMMENT '个性化界面颜色',
  `user_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '用户名',
  `user_password` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '用户密码',
  `role_id` int(11) NOT NULL COMMENT '角色id',
  `user_create_time` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '创建时间',
  `user_update_time` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '修改时间',
  `user_is_use` int(11) NOT NULL DEFAULT '1' COMMENT '软删除，1为有，0为无'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `user_info`
--

INSERT INTO `user_info` (`user_id`, `user_pStyle`, `user_name`, `user_password`, `role_id`, `user_create_time`, `user_update_time`, `user_is_use`) VALUES
(1, '', 'root', '123456', 4, '2017-07-31', '', 1);

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
-- Indexes for table `bed_manage_record`
--
ALTER TABLE `bed_manage_record`
  ADD PRIMARY KEY (`record_id`),
  ADD KEY `staff_id` (`staff_id`),
  ADD KEY `bed_id` (`bed_id`);

--
-- Indexes for table `building_info`
--
ALTER TABLE `building_info`
  ADD PRIMARY KEY (`building_id`);

--
-- Indexes for table `care_record`
--
ALTER TABLE `care_record`
  ADD PRIMARY KEY (`care_record_id`),
  ADD KEY `staff_id` (`staff_id`),
  ADD KEY `checkin_id` (`checkin_id`);

--
-- Indexes for table `care_service_record`
--
ALTER TABLE `care_service_record`
  ADD PRIMARY KEY (`care_service_record_id`),
  ADD KEY `care_record_id` (`care_record_id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indexes for table `checkin_info`
--
ALTER TABLE `checkin_info`
  ADD PRIMARY KEY (`checkin_id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `bed_id` (`bed_id`);

--
-- Indexes for table `equipment_bind_record`
--
ALTER TABLE `equipment_bind_record`
  ADD PRIMARY KEY (`equipment_bind_record_id`),
  ADD KEY `bed_id` (`bed_id`),
  ADD KEY `equipment_id` (`equipment_id`);

--
-- Indexes for table `equipment_info`
--
ALTER TABLE `equipment_info`
  ADD PRIMARY KEY (`equipment_id`),
  ADD KEY `bed_id` (`bed_id`);

--
-- Indexes for table `family_member_info`
--
ALTER TABLE `family_member_info`
  ADD PRIMARY KEY (`family_member_id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indexes for table `medical_history`
--
ALTER TABLE `medical_history`
  ADD PRIMARY KEY (`medical_history_id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indexes for table `member_info`
--
ALTER TABLE `member_info`
  ADD PRIMARY KEY (`member_id`);

--
-- Indexes for table `module_info`
--
ALTER TABLE `module_info`
  ADD PRIMARY KEY (`module_id`);

--
-- Indexes for table `nursing_class`
--
ALTER TABLE `nursing_class`
  ADD PRIMARY KEY (`nursing_class_id`),
  ADD KEY `level_id` (`nursing_level_id`);

--
-- Indexes for table `nursing_level`
--
ALTER TABLE `nursing_level`
  ADD PRIMARY KEY (`nursing_level_id`);

--
-- Indexes for table `nursing_service`
--
ALTER TABLE `nursing_service`
  ADD PRIMARY KEY (`nursing_service_id`),
  ADD KEY `class_id` (`nursing_class_id`);

--
-- Indexes for table `nursing_service_frequency`
--
ALTER TABLE `nursing_service_frequency`
  ADD PRIMARY KEY (`nursing_service_frequency_id`);

--
-- Indexes for table `role_info`
--
ALTER TABLE `role_info`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `room_info`
--
ALTER TABLE `room_info`
  ADD PRIMARY KEY (`room_id`),
  ADD KEY `building_id` (`building_id`);

--
-- Indexes for table `staff_info`
--
ALTER TABLE `staff_info`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `system_right`
--
ALTER TABLE `system_right`
  ADD PRIMARY KEY (`system_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`user_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `bed_info`
--
ALTER TABLE `bed_info`
  MODIFY `bed_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110117;
--
-- 使用表AUTO_INCREMENT `bed_manage_record`
--
ALTER TABLE `bed_manage_record`
  MODIFY `record_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `building_info`
--
ALTER TABLE `building_info`
  MODIFY `building_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `care_record`
--
ALTER TABLE `care_record`
  MODIFY `care_record_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `care_service_record`
--
ALTER TABLE `care_service_record`
  MODIFY `care_service_record_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `checkin_info`
--
ALTER TABLE `checkin_info`
  MODIFY `checkin_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '入住id';
--
-- 使用表AUTO_INCREMENT `equipment_bind_record`
--
ALTER TABLE `equipment_bind_record`
  MODIFY `equipment_bind_record_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '设备绑定记录id', AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `equipment_info`
--
ALTER TABLE `equipment_info`
  MODIFY `equipment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `family_member_info`
--
ALTER TABLE `family_member_info`
  MODIFY `family_member_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '家庭成员id';
--
-- 使用表AUTO_INCREMENT `medical_history`
--
ALTER TABLE `medical_history`
  MODIFY `medical_history_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '病史id';
--
-- 使用表AUTO_INCREMENT `member_info`
--
ALTER TABLE `member_info`
  MODIFY `member_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '会员id';
--
-- 使用表AUTO_INCREMENT `module_info`
--
ALTER TABLE `module_info`
  MODIFY `module_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '此模块的坐标所属ID', AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `nursing_class`
--
ALTER TABLE `nursing_class`
  MODIFY `nursing_class_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- 使用表AUTO_INCREMENT `nursing_level`
--
ALTER TABLE `nursing_level`
  MODIFY `nursing_level_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '护理等级id', AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `nursing_service`
--
ALTER TABLE `nursing_service`
  MODIFY `nursing_service_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '护理服务id', AUTO_INCREMENT=7;
--
-- 使用表AUTO_INCREMENT `nursing_service_frequency`
--
ALTER TABLE `nursing_service_frequency`
  MODIFY `nursing_service_frequency_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `role_info`
--
ALTER TABLE `role_info`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色id', AUTO_INCREMENT=18;
--
-- 使用表AUTO_INCREMENT `room_info`
--
ALTER TABLE `room_info`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '房间id', AUTO_INCREMENT=1112;
--
-- 使用表AUTO_INCREMENT `staff_info`
--
ALTER TABLE `staff_info`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- 使用表AUTO_INCREMENT `system_right`
--
ALTER TABLE `system_right`
  MODIFY `system_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '系统id', AUTO_INCREMENT=12;
--
-- 使用表AUTO_INCREMENT `user_info`
--
ALTER TABLE `user_info`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
