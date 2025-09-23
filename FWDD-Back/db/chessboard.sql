-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 23, 2025 at 01:05 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chessboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `game_scores`
--

CREATE TABLE `game_scores` (
  `id` int(11) NOT NULL,
  `game_session_id` int(11) NOT NULL,
  `player_id` int(11) NOT NULL,
  `score` int(11) DEFAULT 0,
  `attempts` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `game_sessions`
--

CREATE TABLE `game_sessions` (
  `id` int(11) NOT NULL,
  `game_code` varchar(5) NOT NULL,
  `player1_id` int(11) NOT NULL,
  `player2_id` int(11) DEFAULT NULL,
  `status` varchar(10) DEFAULT 'waiting',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `question_id` int(11) NOT NULL,
  `question_text` varchar(255) NOT NULL,
  `answer` tinyint(1) NOT NULL,
  `explanation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`question_id`, `question_text`, `answer`, `explanation`) VALUES
(1, 'In Python, variable names are case-sensitive.', 1, 'Python treats \"age\" and \"Age\" as different variables due to case sensitivity.'),
(2, 'The keyword \"var\" is used to declare a variable in Python.', 0, 'Python does not use \"var\"; variables are created by simple assignment.'),
(3, 'The data type of 10 is int.', 1, 'The number 10 is an integer, which is of type int in Python.'),
(4, '\"3.14\" is a float in Python.', 0, 'It is a string, not a float. Float literals are written without quotes.'),
(5, 'A variable name can begin with a digit in Python.', 0, 'Variable names must begin with a letter or underscore.'),
(6, 'The type of \"Hello\" is str.', 1, 'Text enclosed in quotes is of string (str) type.'),
(7, 'None is a special constant in Python.', 1, 'None is used to represent the absence of a value or a null value'),
(8, 'The expression type(True) returns bool.', 1, 'True is a boolean constant; type(True) returns <class \'bool\'>'),
(9, 'The value of int(\"10.5\") is 10.5.', 0, 'int(\"10.5\") raises a ValueError since \"10.5\" is not a valid int literal'),
(10, 'You can change the type of a variable by reassigning a different value.', 1, 'Python variables are dynamically typed and can be reassigned'),
(11, 'Variables must be declared before they are assigned in Python.', 0, 'Python allows direct assignment without prior declaration'),
(12, 'In Python, 5 + 5.0 returns a float.', 1, 'Adding int and float returns a float (10.0)'),
(13, 'The result of type(5) == type(5.0) is True.', 0, '5 is int and 5.0 is float; types are not equal'),
(14, 'Python allows dynamic typing of variables.', 1, 'Variables can change types at runtime in Python'),
(15, 'The type of [1, 2, 3] is list.', 1, 'Square brackets define a list in Python'),
(16, 'The type of (1,) is tuple.', 1, 'A trailing comma makes it a tuple, not just parentheses'),
(17, 'An empty dictionary is created with [].', 0, '[] creates a list; {} creates a dictionary'),
(18, 'Variables with underscore _prefix are private by convention.', 1, 'A single underscore indicates \"internal use\" by convention'),
(19, 'The data type of range(5) is list.', 0, 'range(5) returns a range object, not a list'),
(20, 'Strings are mutable in Python.', 0, 'Strings are immutable; they cannot be changed in place'),
(21, 'The expression type({}) is dict.', 1, 'Empty curly braces represent an empty dictionary'),
(22, 'The type of a variable can be checked using typeof().', 0, 'Python uses type(), not typeof()'),
(23, 'The bool value of 0 is False.', 1, 'In Python, 0 is treated as False in a boolean context'),
(24, 'Variables can store values of any data type.', 1, 'Python variables are flexible and dynamically typed'),
(25, 'The type() function returns the data type of a variable.', 1, 'type(x) returns the type of the object x'),
(26, 'The value of float(\"3.14\") is 3.14.', 1, 'The string \"3.14\" can be converted to the float 3.14'),
(27, 'Lists in Python can hold mixed data types.', 1, 'Lists can store int, str, float, etc., all together'),
(28, 'The keyword \"int\" is used to define a function.', 0, '\"int\" is a type, not a function declaration keyword'),
(29, 'The value of bool(\"\") is False.', 1, 'Empty strings are considered False in Python'),
(30, 'The expression \"100\" + 100 returns 200.', 0, 'It raises TypeError; cannot add str and int directly');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `game_scores`
--
ALTER TABLE `game_scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `game_session_id` (`game_session_id`);

--
-- Indexes for table `game_sessions`
--
ALTER TABLE `game_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `player1_id` (`player1_id`),
  ADD KEY `player2_id` (`player2_id`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`question_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `game_scores`
--
ALTER TABLE `game_scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `game_sessions`
--
ALTER TABLE `game_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `game_scores`
--
ALTER TABLE `game_scores`
  ADD CONSTRAINT `game_scores_ibfk_1` FOREIGN KEY (`game_session_id`) REFERENCES `game_sessions` (`id`);

--
-- Constraints for table `game_sessions`
--
ALTER TABLE `game_sessions`
  ADD CONSTRAINT `game_sessions_ibfk_1` FOREIGN KEY (`player1_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `game_sessions_ibfk_2` FOREIGN KEY (`player2_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
