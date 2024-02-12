-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: ECOMODA_FINANCE
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ACCOUNTS`
--

DROP TABLE IF EXISTS `ACCOUNTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ACCOUNTS` (
  `id` int NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ACCOUNTS`
--

LOCK TABLES `ACCOUNTS` WRITE;
/*!40000 ALTER TABLE `ACCOUNTS` DISABLE KEYS */;
/*!40000 ALTER TABLE `ACCOUNTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DEPARTMENTS`
--

DROP TABLE IF EXISTS `DEPARTMENTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DEPARTMENTS` (
  `id` int NOT NULL,
  `description` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Description_UNIQUE` (`description`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DEPARTMENTS`
--

LOCK TABLES `DEPARTMENTS` WRITE;
/*!40000 ALTER TABLE `DEPARTMENTS` DISABLE KEYS */;
/*!40000 ALTER TABLE `DEPARTMENTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FINANCIAL_BACKGROUND`
--

DROP TABLE IF EXISTS `FINANCIAL_BACKGROUND`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FINANCIAL_BACKGROUND` (
  `request_id` int NOT NULL,
  `finanacial_record_id` int NOT NULL,
  PRIMARY KEY (`request_id`,`finanacial_record_id`),
  KEY `fk_FINANCIAL_BACKGROUND_RECORD_idx` (`finanacial_record_id`),
  CONSTRAINT `fk_FINANCIAL_BACKGROUND_RECORD` FOREIGN KEY (`finanacial_record_id`) REFERENCES `FINANCIAL_RECORD` (`id`),
  CONSTRAINT `fk_FINANCIAL_BACKGROUND_REQUEST` FOREIGN KEY (`request_id`) REFERENCES `REQUESTS` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FINANCIAL_BACKGROUND`
--

LOCK TABLES `FINANCIAL_BACKGROUND` WRITE;
/*!40000 ALTER TABLE `FINANCIAL_BACKGROUND` DISABLE KEYS */;
/*!40000 ALTER TABLE `FINANCIAL_BACKGROUND` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FINANCIAL_RECORD`
--

DROP TABLE IF EXISTS `FINANCIAL_RECORD`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FINANCIAL_RECORD` (
  `id` int NOT NULL,
  `type` enum('DEBE','HABER') NOT NULL COMMENT '"debe" and "haber" represents incoms and outcomes in that record',
  `description` varchar(45) NOT NULL,
  `amount` float NOT NULL,
  `user_id` int NOT NULL,
  `account_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_FINANTIAL_RECORD_USER_idx` (`user_id`),
  KEY `fk_FINANTIAL_RECORD_ACCOUNT_idx` (`account_id`),
  CONSTRAINT `fk_FINANTIAL_RECORD_ACCOUNT` FOREIGN KEY (`account_id`) REFERENCES `ACCOUNTS` (`id`),
  CONSTRAINT `fk_FINANTIAL_RECORD_USER` FOREIGN KEY (`user_id`) REFERENCES `USERS` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FINANCIAL_RECORD`
--

LOCK TABLES `FINANCIAL_RECORD` WRITE;
/*!40000 ALTER TABLE `FINANCIAL_RECORD` DISABLE KEYS */;
/*!40000 ALTER TABLE `FINANCIAL_RECORD` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `REQUESTS`
--

DROP TABLE IF EXISTS `REQUESTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `REQUESTS` (
  `id` int NOT NULL,
  `amount` float NOT NULL,
  `description` varchar(45) NOT NULL,
  `user_id` int NOT NULL,
  `type_id` int NOT NULL,
  `date` datetime NOT NULL,
  `status` varchar(45) NOT NULL COMMENT 'status:{\n	0:"en espera",\n	1: "Aceptada",\n	2:"rechazada"\n}',
  PRIMARY KEY (`id`),
  KEY `fk_REQUESTS_USER_idx` (`user_id`),
  KEY `fk_REQUESTS_TYPE_REQUEST_idx` (`type_id`),
  CONSTRAINT `fk_REQUESTS_TYPE_REQUEST` FOREIGN KEY (`type_id`) REFERENCES `REQUESTS_TYPES` (`id`),
  CONSTRAINT `fk_REQUESTS_USER` FOREIGN KEY (`user_id`) REFERENCES `USERS` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `REQUESTS`
--

LOCK TABLES `REQUESTS` WRITE;
/*!40000 ALTER TABLE `REQUESTS` DISABLE KEYS */;
/*!40000 ALTER TABLE `REQUESTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `REQUESTS_TYPES`
--

DROP TABLE IF EXISTS `REQUESTS_TYPES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `REQUESTS_TYPES` (
  `id` int NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `REQUESTS_TYPES`
--

LOCK TABLES `REQUESTS_TYPES` WRITE;
/*!40000 ALTER TABLE `REQUESTS_TYPES` DISABLE KEYS */;
/*!40000 ALTER TABLE `REQUESTS_TYPES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ROLES`
--

DROP TABLE IF EXISTS `ROLES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ROLES` (
  `id` int NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ROLES`
--

LOCK TABLES `ROLES` WRITE;
/*!40000 ALTER TABLE `ROLES` DISABLE KEYS */;
/*!40000 ALTER TABLE `ROLES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USERS`
--

DROP TABLE IF EXISTS `USERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USERS` (
  `id` int NOT NULL,
  `email` varchar(256) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  `department_id` varchar(45) DEFAULT NULL,
  `rol_id` int DEFAULT NULL,
  `USERScol` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_USER_ROL` FOREIGN KEY (`id`) REFERENCES `ROLES` (`id`),
  CONSTRAINT `fk_USERS_DEPARTMENT` FOREIGN KEY (`id`) REFERENCES `DEPARTMENTS` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USERS`
--

LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;
/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-12 16:41:22
