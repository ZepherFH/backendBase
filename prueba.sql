-- MariaDB dump 10.19  Distrib 10.6.7-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: prueba
-- ------------------------------------------------------
-- Server version	10.6.7-MariaDB-2ubuntu1.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Usuarios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Usuario` varchar(255) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellidos` varchar(255) NOT NULL,
  `Edad` int(3) NOT NULL,
  `Genero` char(1) DEFAULT NULL,
  `Contraseña` varchar(255) NOT NULL,
  `Fecha_Nacimiento` date DEFAULT NULL,
  `Activo` char(1) NOT NULL,
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `Modificado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
INSERT INTO `Usuarios` VALUES (1,'marc.gmo17@gmail.com','Marcos Gil','Martínez Ojeda',21,'M','zepher17','2001-07-19','S','2022-11-06 02:49:39','2022-11-17 16:48:06'),(2,'vianey@gmail.com','Vianey','Alonso Ramírez',21,'F','vi11ar03','2001-03-11','S','2022-11-06 02:51:00','2022-11-06 02:51:00'),(3,'yunmo@gmail.com','Yunuet','Corro Morales',21,'F','$2a$10$xgP9Au7oAGC6fvcTXW1R9elQ.pY0zVGFfp3a4KN/ol9P1uY4WwgKG','2001-01-07','S','2022-11-06 02:54:10','2022-11-06 03:15:23'),(4,'astrid@gmail.com','Astrid','Valencia',21,'F','$2a$10$OjCrirP73pciBS9Yjqph.upQTO4IvOJAsUUxBsbENCGdYyGWXELNG','2001-01-07','S','2022-11-06 03:09:37','2022-11-06 03:11:05');
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Valkiryas`
--

DROP TABLE IF EXISTS `Valkiryas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Valkiryas` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) NOT NULL,
  `Actor_Voz` varchar(255) NOT NULL,
  `Rango` char(5) NOT NULL,
  `Genero` char(1) DEFAULT NULL,
  `Arma` varchar(255) NOT NULL,
  `Cumpleaños` date DEFAULT NULL,
  `Altura` int(3) DEFAULT NULL,
  `Peso` int(3) DEFAULT NULL,
  `Activo` char(1) NOT NULL,
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `Modificado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Valkiryas`
--

LOCK TABLES `Valkiryas` WRITE;
/*!40000 ALTER TABLE `Valkiryas` DISABLE KEYS */;
INSERT INTO `Valkiryas` VALUES (1,'Fu Hua','Takayama Minami','A','F','Guanteletes','1990-02-09',165,53,'S','2022-11-11 16:21:40','2022-11-11 16:38:08'),(2,'Elysia','Marina Inoue','SS','F','Arco','1995-11-11',163,54,'S','2022-11-11 16:35:29','2022-11-11 16:35:29'),(3,'Murata Himeko','Tanaka Rie','S','F','Mandoble','1998-06-11',167,55,'N','2022-11-13 00:43:11','2022-11-16 16:24:33'),(4,'Bronya','Kana Asumi','S','F','Katana','1997-08-18',160,51,'S','2022-11-15 16:49:35','2022-11-16 16:25:28'),(5,'Raiden Mei','Sawashiro Miyuki','A','F','Espada Ligera','1997-04-13',172,50,'S','2022-11-16 16:26:10','2022-11-16 16:26:10');
/*!40000 ALTER TABLE `Valkiryas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-18 10:23:21
