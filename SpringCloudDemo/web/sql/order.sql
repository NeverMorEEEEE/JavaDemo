/*
Navicat MySQL Data Transfer

Source Server         : local_Wac
Source Server Version : 50724
Source Host           : localhost:3306
Source Database       : wac

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2018-12-20 23:35:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `order_id` varchar(50) NOT NULL COMMENT '订单ID',
  `consumer_name` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `consumer_phone` varchar(15) NOT NULL COMMENT '消费者手机号',
  `consumer_id` varchar(50) NOT NULL COMMENT '消费者ID',
  `consume_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '下单时间',
  `consumer_address` varchar(255) NOT NULL DEFAULT '' COMMENT '消费者下单地址',
  `actual_pay_discount` int(20) DEFAULT NULL COMMENT '实际支付金额',
  `pay_before_discount` int(20) DEFAULT NULL COMMENT '折扣前商品总金额',
  `discount_amount` int(20) DEFAULT '0' COMMENT '折扣金额',
  `discount_id` int(20) DEFAULT NULL COMMENT '折扣券ID',
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
