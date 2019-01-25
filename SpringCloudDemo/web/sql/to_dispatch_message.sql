/*
Navicat MySQL Data Transfer

Source Server         : local_Wac
Source Server Version : 50724
Source Host           : localhost:3306
Source Database       : wac

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2018-12-20 23:35:32
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for to_dispatch_message
-- ----------------------------
DROP TABLE IF EXISTS `to_dispatch_message`;
CREATE TABLE `to_dispatch_message` (
  `unique_id` varchar(255) NOT NULL COMMENT '消息ID',
  `msg_content` varchar(5000) DEFAULT NULL COMMENT '消费信息内容',
  `msg_status` int(1) NOT NULL COMMENT '消息状态，0，未被消费，1，消费成功，-1，消费失败',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`unique_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
