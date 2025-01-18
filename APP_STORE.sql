/*!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.8-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: app_store_database
-- ------------------------------------------------------
-- Server version	10.11.8-MariaDB-0ubuntu0.24.04.1

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
-- Table structure for table `articulo`
--

DROP TABLE IF EXISTS `articulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articulo` (
  `codigo_articulo` int(9) NOT NULL AUTO_INCREMENT,
  `codigo_inventario` int(9) NOT NULL,
  `precio` decimal(9,2) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `marca` varchar(60) DEFAULT NULL,
  `modelo` varchar(60) DEFAULT NULL,
  `url_img` text DEFAULT NULL,
  PRIMARY KEY (`codigo_articulo`),
  KEY `codigo_inventario` (`codigo_inventario`),
  CONSTRAINT `articulo_ibfk_1` FOREIGN KEY (`codigo_inventario`) REFERENCES `inventario` (`codigo_inventario`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulo`
--

LOCK TABLES `articulo` WRITE;
/*!40000 ALTER TABLE `articulo` DISABLE KEYS */;
/*!40000 ALTER TABLE `articulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_oferta`
--

DROP TABLE IF EXISTS `detalle_oferta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detalle_oferta` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `id_oferta` int(9) DEFAULT NULL,
  `id_articulo` int(9) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_oferta` (`id_oferta`),
  KEY `id_articulo` (`id_articulo`),
  CONSTRAINT `detalle_oferta_ibfk_1` FOREIGN KEY (`id_oferta`) REFERENCES `oferta` (`id_oferta`),
  CONSTRAINT `detalle_oferta_ibfk_2` FOREIGN KEY (`id_articulo`) REFERENCES `articulo` (`codigo_articulo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_oferta`
--

LOCK TABLES `detalle_oferta` WRITE;
/*!40000 ALTER TABLE `detalle_oferta` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_oferta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_pedido`
--

DROP TABLE IF EXISTS `detalle_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detalle_pedido` (
  `id_detalle` int(9) DEFAULT NULL,
  `N_articulos` int(5) NOT NULL,
  `codigo_pedido` int(9) NOT NULL,
  `codigo_articulo` int(9) NOT NULL,
  KEY `codigo_pedido` (`codigo_pedido`),
  KEY `codigo_articulo` (`codigo_articulo`),
  CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`codigo_pedido`) REFERENCES `pedido` (`n_pedido`),
  CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`codigo_articulo`) REFERENCES `articulo` (`codigo_articulo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_pedido`
--

LOCK TABLES `detalle_pedido` WRITE;
/*!40000 ALTER TABLE `detalle_pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direccion`
--

DROP TABLE IF EXISTS `direccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `direccion` (
  `id_direccion` int(4) NOT NULL,
  `dni_usuario` varchar(10) NOT NULL,
  `calle_primaria` varchar(60) NOT NULL,
  `calle_segundaria` varchar(60) DEFAULT NULL,
  `referencia` text NOT NULL,
  `ciudad` varchar(25) NOT NULL,
  `N_casa` int(6) DEFAULT NULL,
  `provincia` varchar(25) NOT NULL,
  `cod_postal` int(6) NOT NULL,
  `pais` varchar(60) NOT NULL,
  PRIMARY KEY (`id_direccion`),
  KEY `dni_usuario` (`dni_usuario`),
  CONSTRAINT `direccion_ibfk_1` FOREIGN KEY (`dni_usuario`) REFERENCES `usuario` (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direccion`
--

LOCK TABLES `direccion` WRITE;
/*!40000 ALTER TABLE `direccion` DISABLE KEYS */;
/*!40000 ALTER TABLE `direccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `factura` (
  `n_factura` int(9) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  PRIMARY KEY (`n_factura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventario`
--

DROP TABLE IF EXISTS `inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventario` (
  `codigo_inventario` int(9) NOT NULL AUTO_INCREMENT,
  `cantidad` int(6) NOT NULL,
  PRIMARY KEY (`codigo_inventario`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario`
--

LOCK TABLES `inventario` WRITE;
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
INSERT INTO `inventario` VALUES
(20,5);
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oferta`
--

DROP TABLE IF EXISTS `oferta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oferta` (
  `id_oferta` int(9) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `tipo` varchar(60) NOT NULL,
  `valor` decimal(9,2) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  PRIMARY KEY (`id_oferta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oferta`
--

LOCK TABLES `oferta` WRITE;
/*!40000 ALTER TABLE `oferta` DISABLE KEYS */;
/*!40000 ALTER TABLE `oferta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pago`
--

DROP TABLE IF EXISTS `pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pago` (
  `codigo_pago` int(9) NOT NULL,
  `metodo_pago` varchar(20) NOT NULL,
  `estado` varchar(20) NOT NULL,
  PRIMARY KEY (`codigo_pago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pago`
--

LOCK TABLES `pago` WRITE;
/*!40000 ALTER TABLE `pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedido` (
  `n_pedido` int(9) NOT NULL AUTO_INCREMENT,
  `dni_usuario` varchar(10) DEFAULT NULL,
  `codigo_pago` int(9) NOT NULL,
  `num_factura` int(9) NOT NULL,
  PRIMARY KEY (`n_pedido`),
  KEY `dni_usuario` (`dni_usuario`),
  KEY `codigo_pago` (`codigo_pago`),
  KEY `num_factura` (`num_factura`),
  CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`dni_usuario`) REFERENCES `usuario` (`dni`),
  CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`codigo_pago`) REFERENCES `pago` (`codigo_pago`),
  CONSTRAINT `pedido_ibfk_3` FOREIGN KEY (`num_factura`) REFERENCES `factura` (`n_factura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarjeta`
--

DROP TABLE IF EXISTS `tarjeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tarjeta` (
  `N_tarjeta` varchar(15) NOT NULL,
  `dni_usuario` varchar(10) NOT NULL,
  `tipo` varchar(10) NOT NULL,
  `cvc` int(3) NOT NULL,
  `fecha_venci` date NOT NULL,
  PRIMARY KEY (`N_tarjeta`),
  KEY `dni_usuario` (`dni_usuario`),
  CONSTRAINT `tarjeta_ibfk_1` FOREIGN KEY (`dni_usuario`) REFERENCES `usuario` (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarjeta`
--

LOCK TABLES `tarjeta` WRITE;
/*!40000 ALTER TABLE `tarjeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `tarjeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `dni` varchar(10) NOT NULL,
  `nom_nombre` varchar(250) NOT NULL,
  `nom_apellido` varchar(250) NOT NULL,
  `rol` varchar(20) NOT NULL,
  `cuenta_correo` varchar(250) NOT NULL,
  `cuenta_contrasena` varchar(255) NOT NULL,
  PRIMARY KEY (`dni`),
  UNIQUE KEY `cuenta_correo` (`cuenta_correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES
('0705635837','Ariel','Tandazo','Cliente','ariel.a.tandazo@unl.edu.ec','scrypt:32768:8:1$GdRQ98jBCqRAivyw$75d63b6314de54771c223d26f95c043f652d5770705f3925c57002ddffa564852c3eaef4eff5ea02ebaa5dcf3ead6c8c0cc02e057d6dfebdac4a6facc6c799f2'),
('100056666','Adolf','Hittler','Cliente','Adolfo@gmail.com','scrypt:32768:8:1$4k2tPccfMQOXF00L$385cd4c10516d5b1ed297a58153c7a17e7d3776304de0cf41045542b4feb31cf1d274a1f5e9f2625f1090d56e53f81e1687677e1b52be7efcb8197c3c20e98b4'),
('1111111','Hola','Mundo','Cliente','HolaMundo@gmail.com','scrypt:32768:8:1$yXxQZt9kkpmIU76Z$af28981ac081870e31c652853fcd9a8f43acf422c13f20b7c25243264d4737c615a04a69cb28b49db2d794e1bac82fe4333cc2665a22224d4f70adb6390d71aa'),
('5555555','Diana','Ruiz','Cliente','diana@gmail.com','scrypt:32768:8:1$93qBs11pSs1ZNzQi$c7227b40c076f162a07da4f2cb6e0796d91e36ebbdc61a8b2ad2d1e8c883358c9252614bcb4566bd5616bcf4892433d5be82f25de473aff74f290d0d17a0c87f');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-18 10:28:56
