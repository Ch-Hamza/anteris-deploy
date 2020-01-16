-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  jeu. 16 jan. 2020 à 01:26
-- Version du serveur :  5.7.19
-- Version de PHP :  5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `anteris`
--

-- --------------------------------------------------------

--
-- Structure de la table `donation`
--

DROP TABLE IF EXISTS `donation`;
CREATE TABLE IF NOT EXISTS `donation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `montant` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjqx6doal59swi10cqcdgippee` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `donation`
--

INSERT INTO `donation` (`id`, `montant`, `user_id`, `date`) VALUES
(1, '5', 1, '14/01/2020'),
(2, '5', 1, '15/01/2020');

-- --------------------------------------------------------

--
-- Structure de la table `meeting`
--

DROP TABLE IF EXISTS `meeting`;
CREATE TABLE IF NOT EXISTS `meeting` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(10000) DEFAULT NULL,
  `enabled` bit(1) NOT NULL,
  `meeting_date` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `meeting_record_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkakm8o6hd09h1ci34jv82cjka` (`meeting_record_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `meeting`
--

INSERT INTO `meeting` (`id`, `description`, `enabled`, `meeting_date`, `title`, `meeting_record_id`) VALUES
(1, 'test', b'1', '2020-01-23', 'test', 3),
(2, 'test', b'1', '2020-01-23', 'test', 2),
(3, 'test', b'1', '2020-01-23', 'test', 3),
(4, 'test', b'1', '2020-01-23', 'testnn', 1),
(5, 'test', b'1', '2020-01-23', 'testnnkk', 4);

-- --------------------------------------------------------

--
-- Structure de la table `meeting_invitation`
--

DROP TABLE IF EXISTS `meeting_invitation`;
CREATE TABLE IF NOT EXISTS `meeting_invitation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `meeting_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKavmvy4jna2rb3n2b1hyxw4pof` (`meeting_id`),
  KEY `FKaks0u97l5llkd0206mhtfs8sf` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `meeting_invitation`
--

INSERT INTO `meeting_invitation` (`id`, `meeting_id`, `user_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 1),
(4, 2, 2),
(5, 3, 1),
(6, 3, 2),
(7, 4, 1),
(8, 4, 2),
(9, 5, 1),
(10, 5, 2);

-- --------------------------------------------------------

--
-- Structure de la table `meeting_record`
--

DROP TABLE IF EXISTS `meeting_record`;
CREATE TABLE IF NOT EXISTS `meeting_record` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `meeting_record`
--

INSERT INTO `meeting_record` (`id`, `title`) VALUES
(1, '05_IA_contraintes_BB.pdf'),
(2, '03-2_Armstrong-ModelingWebServices_with_UML.pdf'),
(3, '05_IA_contraintes_BB.pdf'),
(4, '03-2_Armstrong-ModelingWebServices_with_UML.pdf');

-- --------------------------------------------------------

--
-- Structure de la table `pending_users`
--

DROP TABLE IF EXISTS `pending_users`;
CREATE TABLE IF NOT EXISTS `pending_users` (
  `email` varchar(255) NOT NULL,
  `id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_nb4h0p6txrmfc0xbrd1kglp9t` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'ROLE_ADMIN'),
(2, 'ROLE_USER');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `enabled` bit(1) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `enabled`, `firstname`, `image`, `lastname`, `password`, `username`) VALUES
(1, 'doc@doc.doc', b'1', 'test12', NULL, 'test1', '$2a$10$ZUTs5KRal8Ng79XV5iUOvuRf3068Q4t4BLWis4Dedam.LJAMWBzki', 'admin'),
(2, 'doc@doc.doc', b'1', 'test', NULL, 'test', '$2a$10$98ON07kLqiP.pncFbK5pLOhuIPUztm127QZv/C6yW5Lk6aNQqBs5.', 'test');

-- --------------------------------------------------------

--
-- Structure de la table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE IF NOT EXISTS `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(1, 1),
(2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `vote`
--

DROP TABLE IF EXISTS `vote`;
CREATE TABLE IF NOT EXISTS `vote` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(10000) DEFAULT NULL,
  `enabled` bit(1) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `end_date` varchar(255) DEFAULT NULL,
  `start_date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `vote`
--

INSERT INTO `vote` (`id`, `description`, `enabled`, `title`, `end_date`, `start_date`) VALUES
(1, 'changed', b'1', 'chn', '2020-01-20', '2020-01-01'),
(2, 'string', b'1', 'test', '2020-01-15', '2019-12-12'),
(3, 'gg', b'1', 'hh', '2020-01-15', '2019-12-12'),
(4, 'ff', b'1', 'ff', '2020-01-20', '2020-01-01');

-- --------------------------------------------------------

--
-- Structure de la table `vote_option`
--

DROP TABLE IF EXISTS `vote_option`;
CREATE TABLE IF NOT EXISTS `vote_option` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `vote_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtbgkw2wpeeygnh7sjwuda3g4a` (`vote_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `vote_option`
--

INSERT INTO `vote_option` (`id`, `title`, `vote_id`) VALUES
(1, 'changed', 1),
(2, 'changed1', 1),
(3, 'ch', 1),
(4, 'test1', 2),
(5, 'test2', 2),
(6, 'test3', 2),
(7, 'ml', 3),
(8, 'az', 3),
(9, 'tata', 4),
(10, 'tata', 4);

-- --------------------------------------------------------

--
-- Structure de la table `vote_result`
--

DROP TABLE IF EXISTS `vote_result`;
CREATE TABLE IF NOT EXISTS `vote_result` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `vote_option_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2jne3ichmf6ne1w3q4vuf15rb` (`user_id`),
  KEY `FKahtmn44l770l9jovaf2lj4lae` (`vote_option_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `vote_result`
--

INSERT INTO `vote_result` (`id`, `user_id`, `vote_option_id`) VALUES
(1, 1, 3),
(3, 1, 5),
(4, 1, 7);

-- --------------------------------------------------------

--
-- Structure de la table `vote_roles`
--

DROP TABLE IF EXISTS `vote_roles`;
CREATE TABLE IF NOT EXISTS `vote_roles` (
  `vote_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  PRIMARY KEY (`vote_id`,`role_id`),
  KEY `FKkv57lqi3wd25t02l66fmyro01` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `vote_roles`
--

INSERT INTO `vote_roles` (`vote_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(1, 2),
(2, 2),
(3, 2),
(4, 2);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `donation`
--
ALTER TABLE `donation`
  ADD CONSTRAINT `FKjqx6doal59swi10cqcdgippee` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `meeting`
--
ALTER TABLE `meeting`
  ADD CONSTRAINT `FKkakm8o6hd09h1ci34jv82cjka` FOREIGN KEY (`meeting_record_id`) REFERENCES `meeting_record` (`id`);

--
-- Contraintes pour la table `meeting_invitation`
--
ALTER TABLE `meeting_invitation`
  ADD CONSTRAINT `FKaks0u97l5llkd0206mhtfs8sf` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKavmvy4jna2rb3n2b1hyxw4pof` FOREIGN KEY (`meeting_id`) REFERENCES `meeting` (`id`);

--
-- Contraintes pour la table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `vote_option`
--
ALTER TABLE `vote_option`
  ADD CONSTRAINT `FKtbgkw2wpeeygnh7sjwuda3g4a` FOREIGN KEY (`vote_id`) REFERENCES `vote` (`id`);

--
-- Contraintes pour la table `vote_result`
--
ALTER TABLE `vote_result`
  ADD CONSTRAINT `FK2jne3ichmf6ne1w3q4vuf15rb` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKahtmn44l770l9jovaf2lj4lae` FOREIGN KEY (`vote_option_id`) REFERENCES `vote_option` (`id`);

--
-- Contraintes pour la table `vote_roles`
--
ALTER TABLE `vote_roles`
  ADD CONSTRAINT `FKhavnj30a96n04f3i0r4kepp6c` FOREIGN KEY (`vote_id`) REFERENCES `vote` (`id`),
  ADD CONSTRAINT `FKkv57lqi3wd25t02l66fmyro01` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
