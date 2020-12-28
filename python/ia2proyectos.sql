-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 28, 2020 at 02:14 PM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 7.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ia2proyectos`
--

-- --------------------------------------------------------

--
-- Table structure for table `estado`
--

CREATE TABLE `estado` (
  `estado_id` int(11) NOT NULL,
  `positivo` float NOT NULL,
  `neutral` float NOT NULL,
  `negativo` float NOT NULL,
  `fecha` datetime NOT NULL,
  `proyectos_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `estado`
--

INSERT INTO `estado` (`estado_id`, `positivo`, `neutral`, `negativo`, `fecha`, `proyectos_id`) VALUES
(1, 1, 0, 0, '2020-12-26 23:05:14', 1),
(2, 1, 0, 0, '2020-12-26 23:06:31', 1),
(3, 0, 0, 1, '2020-12-27 13:17:08', 1),
(4, 0, 0, 1, '2020-12-27 14:21:00', 1),
(5, 0, 0, 1, '2020-12-28 00:19:11', 1),
(6, 0, 0.417, 0.583, '2020-12-28 00:20:35', 1),
(7, 0, 0.417, 0.583, '2020-12-28 07:12:19', 1),
(8, 0.571, 0.429, 0, '2020-12-28 07:30:48', 1),
(9, 0, 0.492, 0.508, '2020-12-28 07:39:13', 1),
(10, 0, 0.392, 0.608, '2020-12-28 07:39:29', 1),
(11, 0.571, 0.429, 0, '2020-12-28 07:51:18', 1),
(12, 0.571, 0.429, 0, '2020-12-28 07:53:29', 1),
(13, 0, 0.392, 0.608, '2020-12-28 09:12:43', 1);

-- --------------------------------------------------------

--
-- Table structure for table `gobierno`
--

CREATE TABLE `gobierno` (
  `gobierno_id` int(11) NOT NULL,
  `municipio` varchar(20) NOT NULL,
  `gestion` int(11) NOT NULL,
  `gobernante` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gobierno`
--

INSERT INTO `gobierno` (`gobierno_id`, `municipio`, `gestion`, `gobernante`) VALUES
(1, 'cercado', 2020, 'Ivan Telleria');

-- --------------------------------------------------------

--
-- Table structure for table `proyectos`
--

CREATE TABLE `proyectos` (
  `proyectos_id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `fechainicio` date NOT NULL,
  `fechafin` date NOT NULL,
  `gobierno_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `proyectos`
--

INSERT INTO `proyectos` (`proyectos_id`, `nombre`, `fechainicio`, `fechafin`, `gobierno_id`) VALUES
(1, 'Mantenimiento puente Pinto', '2020-12-01', '2020-12-31', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`estado_id`),
  ADD UNIQUE KEY `estado_id` (`estado_id`),
  ADD KEY `proyectos_id` (`proyectos_id`);

--
-- Indexes for table `gobierno`
--
ALTER TABLE `gobierno`
  ADD PRIMARY KEY (`gobierno_id`),
  ADD UNIQUE KEY `gobierno_id` (`gobierno_id`);

--
-- Indexes for table `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`proyectos_id`),
  ADD UNIQUE KEY `proyectos_id` (`proyectos_id`),
  ADD KEY `gobierno_id` (`gobierno_id`),
  ADD KEY `gobierno_id_2` (`gobierno_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `estado`
--
ALTER TABLE `estado`
  MODIFY `estado_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `gobierno`
--
ALTER TABLE `gobierno`
  MODIFY `gobierno_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `proyectos_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
