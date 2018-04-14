/*
SQLyog Ultimate v11.24 (32 bit)
MySQL - 5.1.73-log : Database - UUWIFI
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`UUWIFI` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `UUWIFI`;

/*Table structure for table `tbCfrmResource` */

DROP TABLE IF EXISTS `tbCfrmResource`;

CREATE TABLE `tbCfrmResource` (
  `keyResourceId` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL,
  `menu` varchar(7) DEFAULT '0',
  `iconClass` varchar(128) DEFAULT NULL,
  `authMethod` varchar(16) DEFAULT 'authc' COMMENT 'anon/authcBasic/auchc',
  `resType` varchar(45) DEFAULT 'web' COMMENT 'web/api/app/',
  `remarks` varchar(128) DEFAULT 'web',
  `createdBy` varchar(45) NOT NULL,
  `createdTime` datetime NOT NULL,
  `modifiedBy` varchar(45) DEFAULT NULL,
  `modifiedTime` datetime DEFAULT NULL COMMENT '\n',
  PRIMARY KEY (`keyResourceId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tbCfrmResource` */

insert  into `tbCfrmResource`(`keyResourceId`,`name`,`menu`,`iconClass`,`authMethod`,`resType`,`remarks`,`createdBy`,`createdTime`,`modifiedBy`,`modifiedTime`) values ('/api/area','api_area','99-08',NULL,'authcBasic','app','0|1|0','_EUROOT','2017-03-17 14:36:22','_EUROOT','2017-03-17 14:36:22'),('/api/devicegroup','api_devicegroup','99-09',NULL,'authcBasic','app','0|1|0','_EUROOT','2017-03-17 14:36:22','_EUROOT','2017-03-17 14:36:22'),('/api/devicepkg','api_devicepkg','99-10',NULL,'authcBasic','app','0|1|0','_EUROOT','2017-03-17 14:36:22','_EUROOT','2017-03-17 14:36:22'),('/api/wifidevice','api_wifidevice','99-11',NULL,'authcBasic','app','0|1|0','_EUROOT','2017-03-17 14:36:22','_EUROOT','2017-03-17 14:36:22'),('/count/deviceDaily','count_deviceDaily','13-04','','authc','web','0|1|0','_EUROOT','2017-06-14 18:36:06','_EUROOT','2017-06-14 18:36:06'),('/count/simCardDaily','count_simCardDaily','13-05','','authc','web','0|1|0','_EUROOT','2017-06-14 18:36:06','_EUROOT','2017-06-14 18:36:06'),('/count/userDaily','count_userDaily','13-03','','authc','web','0|1|0','_EUROOT','2017-06-14 18:36:06','_EUROOT','2017-06-14 18:36:06'),('/devtest','v2_devtest','0',NULL,'anon','app','0|1|0','liweihao','2017-05-25 17:51:22','liweihao','2017-05-25 17:51:22'),('/frame/audit','frame_audit','01-06','','authc','web','0|1|0','_EUROOT','2015-11-18 18:29:50','_EUROOT','2015-11-18 18:29:50'),('/frame/blackList','frame_blackList','01-04','','authc','web','0|1|0','_EUROOT','2015-11-18 18:29:50','_EUROOT','2015-11-18 18:29:50'),('/frame/resource','frame_resource','01-01','fa fa-cog','authc','web','0|1|0','_EUROOT','2015-11-18 18:29:50','_EUROOT','2015-11-18 18:29:50'),('/frame/role','frame_role','01-02','','authc','web','0|1|0','_EUROOT','2015-11-18 18:29:50','_EUROOT','2015-11-18 18:29:50'),('/frame/user','frame_user','01-03','','authc','web','1|1|1','_EUROOT','2015-11-18 18:29:50','_EUROOT','2015-11-18 18:29:50'),('/notify_url/ALIPAY','v2_ali_cb','0',NULL,'anon','app','0|1|0','liweihao','2017-05-10 18:35:56','liweihao','2017-05-10 18:35:56'),('/notify_url/WEIXIN','v2_wx_cb','0',NULL,'anon','app','0|1|0','liweihao','2017-05-10 18:35:56','liweihao','2017-05-10 18:35:56'),('/packageConsume/dailyRental','packageConsume_dailyRental','09-02','','authc','web','0|1|0','_EUROOT','2015-11-18 18:29:50','_EUROOT','2015-11-18 18:29:50'),('/packageConsume/rate','packageConsume_rate','09-03','','authc','web','0|1|0','_EUROOT','2017-05-05 17:41:46','_EUROOT','2017-05-05 17:41:50'),('/packageConsume/trafficPkg','packageConsume_trafficPkg','09-01','fa fa-rmb','authc','web','0|1|0','_EUROOT','2017-01-19 15:25:35','_EUROOT','2017-01-19 15:25:37'),('/sysconfig/configure','sysconfig_configure','02-01','fa fa-tasks','authc','web','0|1|0','_EUROOT','2017-05-16 15:49:48','_EUROOT','2017-05-16 15:49:48'),('/sysconfig/wifiArea','sysconfig_wifiArea','02-03','fa fa-tasks','authc','web','0|1|0','_EUROOT','2017-05-16 15:51:49','_EUROOT','2017-05-16 15:51:49'),('/syslog/fs/api','syslog_api','14-05','','authc','web','0|1|0','_EUROOT','2016-12-05 18:53:53','_EUROOT','2016-12-05 18:53:51'),('/syslog/fs/as','syslog_as','14-03','','authc','web','0|1|0','_EUROOT','2015-11-18 18:29:50','_EUROOT','2015-11-18 18:29:50'),('/syslog/fs/msg','syslog_msg','14-09','','authc','web','0|1|0','_EUROOT','2016-12-05 18:57:49','_EUROOT','2016-12-05 18:57:50'),('/syslog/fs/vns','syslog_vns','14-06','','authc','web','0|1|0','_EUROOT','2016-12-05 19:44:37','_EUROOT','2016-12-05 19:44:35'),('/syslog/fs/vsw','syslog_vsw','14-07','fa  fa-inbox','authc','web','0|1|0','_EUROOT','2015-11-18 18:29:50','_EUROOT','2015-11-18 18:29:50'),('/syslog/fs/webmin','syslog_webmin','14-01','fa  fa-inbox','authc','web','0|1|0','_EUROOT','2015-11-18 18:29:50','_EUROOT','2015-11-18 18:29:50'),('/syslog/fs/ws','syslog_ws','14-02','','authc','web','0|1|0','_EUROOT','2015-11-18 18:29:50','_EUROOT','2015-11-18 18:29:50'),('/upload','v2_upload','0',NULL,'anon','app','0|1|0','liweihao','2017-05-12 12:36:54','liweihao','2017-05-12 12:36:54'),('/user/feedback','user_feedback','03-06','','authc','web','0|1|0','_EUROOT','2015-11-18 18:29:50','_EUROOT','2015-11-18 18:29:50'),('/user/smsNew','user_smsNew','03-05','','authc','web','0|1|0','_EUROOT','2016-04-14 13:22:00','_EUROOT','2016-04-14 13:22:00'),('/user/user','user_user','03-01','fa fa-users','authc','web','0|1|0','_EUROOT','2015-11-18 18:29:50','_EUROOT','2015-11-18 18:29:50'),('/user/userTopupRcd','user_userTopupRcd','03-02','','authc','web','0|1|0','_EUROOT','2015-11-18 18:29:50','_EUROOT','2015-11-18 18:29:50'),('/v2/account','v2_account','0',NULL,'authcBasic','app','0|1|0','_EUROOT','2017-05-04 11:11:43','_EUROOT','2017-05-04 11:11:43'),('/v2/app','v2_app','0',NULL,'anon','app','0|1|0','_EUROOT','2017-05-04 11:08:36','_EUROOT','2017-05-04 11:08:36'),('/v2/device','v2_device','0',NULL,'anon','app','0|1|0','_EUROOT','2017-05-04 11:11:43','_EUROOT','2017-05-04 11:11:43'),('/v2/pkgorder','v2_pkgorder','0',NULL,'anon','app','0|1|0','_EUROOT','2017-05-04 11:11:43','_EUROOT','2017-05-04 11:11:43'),('/v2/rent','v2_rent','0',NULL,'anon','app','0|1|0','liweihao','2017-05-04 20:37:06','liweihao','2017-05-04 20:37:06'),('/v2/session','v2_session','0',NULL,'authcBasic','app','0|1|0','_EUROOT','2017-05-04 11:11:43','_EUROOT','2017-05-04 11:11:43'),('/v2/user','v2_user','0',NULL,'anon','app','0|1|0','_EUROOT','2017-05-04 11:11:43','_EUROOT','2017-05-04 11:11:43'),('/v2/uuwifi','v2_uuwifi','0',NULL,'authcBasic','app','0|1|0','_EUROOT','2017-05-04 11:11:43','_EUROOT','2017-05-04 11:11:43'),('/vsw/cdrNew','vsw_cdrNew','04-07','','authc','web','0|1|0','_EUROOT','2016-04-14 13:22:00','_EUROOT','2016-04-14 13:22:00'),('/vsw/globalSIMNew','vsw_globalSIMNew','04-05','fa fa-cloud','authc','web','0|1|0','_EUROOT','2016-04-23 13:22:00','_EUROOT','2016-04-23 13:22:00'),('/vsw/simCardNew','vsw_simCardNew','04-03','','authc','web','0|1|0','_EUROOT','2016-04-14 13:22:00','_EUROOT','2016-04-14 13:22:00'),('/vsw/simPDevNew','vsw_simPDevNew','04-02','','authc','web','0|1|0','_EUROOT','2016-04-14 13:22:00','_EUROOT','2016-04-14 13:22:00'),('/vsw/viFiDeviceNew','vsw_viFiDeviceNew','04-04','','authc','web','0|1|0','_EUROOT','2016-04-14 13:22:00','_EUROOT','2016-04-14 13:22:00'),('/vsw/vswExchangeSer','vsw_vswExchangeSer','04-01','fa fa-rss','authc','web','0|1|0','_EUROOT','2016-07-26 10:58:04','_EUROOT','2016-07-26 10:58:06');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
