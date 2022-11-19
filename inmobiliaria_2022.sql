-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-10-2022 a las 23:30:58
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inmobiliaria_2022`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contrato`
--

CREATE TABLE `contrato` (
  `IdContrato` int(11) NOT NULL,
  `IdInmueble` int(11) NOT NULL,
  `IdInquilino` int(11) NOT NULL,
  `FechaInicio` date NOT NULL,
  `FechaFinal` date NOT NULL,
  `Monto` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contrato`
--

INSERT INTO `contrato` (`IdContrato`, `IdInmueble`, `IdInquilino`, `FechaInicio`, `FechaFinal`, `Monto`) VALUES
(11, 3, 1, '2022-10-19', '2022-10-27', 40000),
(12, 19, 1, '2022-11-02', '2022-12-11', 40000),
(13, 19, 1, '2022-10-29', '2022-11-04', 40000),
(14, 19, 4, '2022-10-30', '2022-11-25', 5000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inmueble`
--

CREATE TABLE `inmueble` (
  `IdInmueble` int(11) NOT NULL,
  `IdPropietario` int(11) NOT NULL,
  `Direccion` varchar(100) NOT NULL,
  `Uso` varchar(30) NOT NULL,
  `Tipo` varchar(30) NOT NULL,
  `Ambientes` int(11) NOT NULL,
  `Latitud` varchar(50) NOT NULL,
  `Longitud` varchar(50) NOT NULL,
  `Precio` double NOT NULL,
  `Estado` tinyint(1) NOT NULL,
  `Imagen` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `inmueble`
--

INSERT INTO `inmueble` (`IdInmueble`, `IdPropietario`, `Direccion`, `Uso`, `Tipo`, `Ambientes`, `Latitud`, `Longitud`, `Precio`, `Estado`, `Imagen`) VALUES
(3, 1, 'Las Heras 275', 'Comercial', 'Local', 3, '33:15.5', '198:54.1', 15000, 0, 'http://192.168.1.108:5000/Uploads/inmueble_0.jpg\r\n'),
(16, 1, 'San Diego 6987', 'Residencial', 'Casa', 5, '142:55', '142:55', 450000, 0, 'http://192.168.1.108:5000/Uploads/inmueble_077209.jpg'),
(17, 1, 'San Francisco 4545', 'Residencial', 'Casa', 5, '142:55', '142:55', 45055, 1, 'http://192.168.1.108:5000/Uploads/inmueble_126419.jpg'),
(18, 1, '25 de mayo 6444', 'Residencial', 'Departamento', 1, '-33.0511342', '-65.6271487', 25000, 0, 'http://192.168.1.108:5000/Uploads/inmueble_188687.jpg'),
(19, 5, 'Las Heras 265', 'Residencial', 'Casa', 5, '-33.0511342', '-65.6271487', 45000, 0, 'http://192.168.1.108:5000/Uploads/inmueble_516570.jpg'),
(20, 5, 'Lafinur 444', 'Comercial', 'Deposito', 5, '-33.0511342', '-65.6271487', 4500, 0, 'http://192.168.1.108:5000/Uploads/inmueble_587303.jpg'),
(21, 5, 'Sucre 123', 'Comercial', 'Departamento', 5, '-33.0511342', '-65.6271487', 45000, 0, 'http://192.168.1.108:5000/Uploads/inmueble_598660.jpg'),
(22, 5, 'sucre 1234', 'Comercial', 'Deposito', 6, '-33.0511342', '-65.6271487', 4700, 0, 'http://192.168.1.108:5000/Uploads/inmueble_522366.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inquilino`
--

CREATE TABLE `inquilino` (
  `IdInquilino` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Dni` varchar(20) NOT NULL,
  `LugarTrabajo` varchar(100) NOT NULL,
  `Direccion` varchar(100) NOT NULL,
  `Email` varchar(70) NOT NULL,
  `Telefono` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `inquilino`
--

INSERT INTO `inquilino` (`IdInquilino`, `Nombre`, `Dni`, `LugarTrabajo`, `Direccion`, `Email`, `Telefono`) VALUES
(1, 'Mardone Yohana', '12345678', 'La toma', 'Lafinur 168', 'yohana@gmail.com', '1234123456'),
(4, 'Lidia Novara', '12345678', 'La toma', 'San martin 205', 'Lidia@gmail.com', '1234123456');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `IdPago` int(11) NOT NULL,
  `IdContrato` int(11) NOT NULL,
  `FechaEmision` date NOT NULL,
  `Importe` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pago`
--

INSERT INTO `pago` (`IdPago`, `IdContrato`, `FechaEmision`, `Importe`) VALUES
(11, 11, '2022-10-26', 12344),
(12, 12, '2022-11-06', 40000),
(13, 13, '2022-10-31', 12000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propietario`
--

CREATE TABLE `propietario` (
  `IdPropietario` int(11) NOT NULL,
  `Nombre` varchar(70) NOT NULL,
  `Apellido` varchar(50) NOT NULL,
  `Dni` varchar(20) NOT NULL,
  `Telefono` varchar(20) NOT NULL,
  `Email` varchar(40) NOT NULL,
  `Clave` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `propietario`
--

INSERT INTO `propietario` (`IdPropietario`, `Nombre`, `Apellido`, `Dni`, `Telefono`, `Email`, `Clave`) VALUES
(1, 'Fernando', 'Novara', '12345678', '1234123456', 'Fernando@gmail.com', '3A0G2+zJ3luLnlC44+Xe5HGw/9RWJNoyF2XZACvev20='),
(2, 'Lidia', 'Correa', '12345678', '1234123456', 'Lidia@gmail.com', '3A0G2+zJ3luLnlC44+Xe5HGw/9RWJNoyF2XZACvev20='),
(3, 'Rafael', 'Novara', '37357357', '1597532684', 'Rafael@gmail.com', '3A0G2+zJ3luLnlC44+Xe5HGw/9RWJNoyF2XZACvev20='),
(4, 'Mariano', 'Luzza', '12345678', '123132123', 'mariano@mail.com', '3A0G2+zJ3luLnlC44+Xe5HGw/9RWJNoyF2XZACvev20='),
(5, 'Ariel', 'Ledesma', '123456789', '1234123456', 'fernandoarielnovara@gmail.com', '3A0G2+zJ3luLnlC44+Xe5HGw/9RWJNoyF2XZACvev20=');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `IdUsuario` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(50) NOT NULL,
  `Email` varchar(70) NOT NULL,
  `Clave` varchar(200) NOT NULL,
  `Avatar` varchar(100) DEFAULT NULL,
  `Rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`IdUsuario`, `Nombre`, `Apellido`, `Email`, `Clave`, `Avatar`, `Rol`) VALUES
(5, 'Yohana', 'Mardone', 'Yohana@mail.com', '3A0G2+zJ3luLnlC44+Xe5HGw/9RWJNoyF2XZACvev20=', '/Upload\\avatar_5.png', 2),
(8, 'Fernando', 'Novara', 'Fernando@mail.com', '3A0G2+zJ3luLnlC44+Xe5HGw/9RWJNoyF2XZACvev20=', '/Upload\\avatar_8.png', 2),
(9, 'Lidia', 'Novara', 'Lidia@mail.com', '3A0G2+zJ3luLnlC44+Xe5HGw/9RWJNoyF2XZACvev20=', '/Upload\\avatar_9.png', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contrato`
--
ALTER TABLE `contrato`
  ADD PRIMARY KEY (`IdContrato`),
  ADD KEY `IdInmueble` (`IdInmueble`,`IdInquilino`),
  ADD KEY `IdInquilino` (`IdInquilino`);

--
-- Indices de la tabla `inmueble`
--
ALTER TABLE `inmueble`
  ADD PRIMARY KEY (`IdInmueble`),
  ADD KEY `IdPropietario` (`IdPropietario`);

--
-- Indices de la tabla `inquilino`
--
ALTER TABLE `inquilino`
  ADD PRIMARY KEY (`IdInquilino`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`IdPago`),
  ADD KEY `IdContrato` (`IdContrato`);

--
-- Indices de la tabla `propietario`
--
ALTER TABLE `propietario`
  ADD PRIMARY KEY (`IdPropietario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`IdUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contrato`
--
ALTER TABLE `contrato`
  MODIFY `IdContrato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `inmueble`
--
ALTER TABLE `inmueble`
  MODIFY `IdInmueble` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `inquilino`
--
ALTER TABLE `inquilino`
  MODIFY `IdInquilino` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `IdPago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `propietario`
--
ALTER TABLE `propietario`
  MODIFY `IdPropietario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `IdUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contrato`
--
ALTER TABLE `contrato`
  ADD CONSTRAINT `contrato_ibfk_1` FOREIGN KEY (`IdInquilino`) REFERENCES `inquilino` (`IdInquilino`),
  ADD CONSTRAINT `contrato_ibfk_2` FOREIGN KEY (`IdInmueble`) REFERENCES `inmueble` (`IdInmueble`);

--
-- Filtros para la tabla `inmueble`
--
ALTER TABLE `inmueble`
  ADD CONSTRAINT `inmueble_ibfk_1` FOREIGN KEY (`IdPropietario`) REFERENCES `propietario` (`IdPropietario`);

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`IdContrato`) REFERENCES `contrato` (`IdContrato`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
