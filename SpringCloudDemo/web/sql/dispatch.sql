/*
Navicat MySQL Data Transfer

Source Server         : local_Wac
Source Server Version : 50724
Source Host           : localhost:3306
Source Database       : wac

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2018-12-20 23:35:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for dispatch
-- ----------------------------
DROP TABLE IF EXISTS `dispatch`;
CREATE TABLE `dispatch` (
  `dispatch_id` varchar(50) NOT NULL COMMENT '派送ID',
  `orderid` varchar(50) NOT NULL COMMENT '订单ID',
  `Courier_id` varchar(50) DEFAULT NULL COMMENT '派送员ID',
  `Courier_name` varchar(20) DEFAULT NULL COMMENT '派送员姓名',
  `Courier_phone` int(15) DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`dispatch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
