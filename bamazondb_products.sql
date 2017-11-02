CREATE DATABASE  IF NOT EXISTS `bamazondb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bamazondb`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: bamazondb
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'tv','electronics',1000.00,46),(2,'computer','electronics',500.00,9),(3,'chair','furniture',30.00,4),(4,'oreo','snacks',2.00,100),(5,'coke','drinks',3.00,170),(6,'beer','drinks',5.00,70),(7,'banana','produce',0.99,900),(8,'milk','produce',2.50,100),(9,'terminator','movies',20.00,50),(10,'i-phone','electronics',700.00,75),(11,'pen','stationery',2.00,504),(12,'rolex','jewellery',5000.00,2),(13,'pencil','stationery',2.00,100),(14,'ipad','electronics',600.00,23),(15,'shirt','clothing',10.00,30),(16,'jacket','clothing',55.00,98),(17,'meat','produce',25.00,100),(18,'antivirus','software',49.00,29),(19,'windows10','software',299.00,20),(20,'microwave','electronics',108.00,50),(21,'printer','stationery',60.00,80),(22,'blender','electronics',29.00,55);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-02  9:05:29
