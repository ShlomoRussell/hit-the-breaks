-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: eu-cdbr-west-03.cleardb.net    Database: heroku_84947b68bf10c4f
-- ------------------------------------------------------
-- Server version	5.6.50-log

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(36) COLLATE utf8_bin NOT NULL,
  `email` varchar(45) COLLATE utf8_bin NOT NULL,
  `first_name` varchar(45) COLLATE utf8_bin NOT NULL,
  `last_name` varchar(45) COLLATE utf8_bin NOT NULL,
  `username` varchar(45) COLLATE utf8_bin NOT NULL,
  `password` varchar(60) COLLATE utf8_bin NOT NULL,
  `is_admin` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('0edb280f-83e1-416b-ab35-34d5e16e1599','john@doe.com','john','doe','johndoe','$2b$10$BvsUJLicIpU3iXL3ZCezxee1PVp/3Hp2iLIFjA0C2CMnWVrwwLn02',0),('1236cc4f-a57f-4e1e-a849-a2536e6d8cc8','mweiner@test.com','mmm','www','msw','$2b$10$S13MPlKnS/XdfsnxYenEWeCj/BghSHe4UX74fHcmad6rka5mVgydu',0),('17bcbeac-4c64-49a2-b64f-ec66137f007e','dsbr163@yahoo.com','דינה','ראסל','DenaR','$2b$10$JKACdh7P1ktOKkobdc/tQeE0qTdMU/KKTiAOz/u0XtEVF4tP/5SmS',0),('21aa971a-c854-47c3-a820-1bb1cfc29ab1','shlomorussell@gmail.com','shlomo','russell','bobbby','$2b$10$d7230oQLrsE2Rw1nWsoHSOEHFLXOTZ2UjkclDMqvRgI7uBWZN0.b6',1),('4dcd87ce-02a2-45cb-b173-89a66264895c','baapteshuva@gmail.com','Shlomo ','Shlomo Russell','Shlomo Russell','$2b$10$nXVbyr5aYZYnIT..3hKm8uSJcL9FGMwGgxguwqHCwFiCnEbKkspom',0),('50e21b47-7c9d-4df1-b4fe-cfdefb9b703d','bpsi@gmail.com','Dufus','Rufus','rufus ','$2b$10$Cwa0mSCuezls.c1qVZ4CaOv57dbpQWXHINUr6rDG3DZ0einrUSKqy',0),('5ba9285b-b5c3-4358-bc97-620b065aee23','vcvc@gmail.com','Amit','Licht','Amicht','$2b$10$FERN3TD.FmdljPBXmBfLYui/L.9JABZYWhla1joBWY4mmFPGs54ie',0),('61f82c22-98bf-43e4-8d13-2f8547d253c6','mrrruss26@gmail.com','Moshe ','Russell ','Mosher','$2b$10$cXxAxzdb25LHQCCVNV8R8.h67Lot81EqeKmXNKvnmGFQfiHL4FetW',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `destination` varchar(40) COLLATE utf8_bin NOT NULL,
  `description` mediumtext COLLATE utf8_bin NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `picture` varchar(100) COLLATE utf8_bin NOT NULL,
  `id` varchar(45) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES ('Bora Bora','What this small French Polynesian island may lack in size it makes up for in sheer tropical beauty. Here, you\'ll find picturesque beaches, lush jungles and luxurious resorts. The island\'s extinct volcano, Mount Otemanu, makes for a great photo-op or challenging hike, and the friendly Bora Bora locals can help you catch a glimpse of the island\'s best sights during an off-road excursion. To relax, head to Matira Beach for crystal-clear water and soft white sand. Although a trip to Bora Bora is very expensive, most travelers say it\'s worth every penny.','2022-08-14 08:17:00','2022-08-22 05:17:00',600.00,'4832dd0c-8f6a-4cc7-b018-6e66ab3a56a9.jfif','27b0e8b4-00af-11ed-9ea8-c025a57d8af5'),('Tahiti','Travel to this island – the largest in French Polynesia – if you\'ve been dreaming of a vacation spent lazing in a lavish overwater bungalow. Beyond the posh resorts, Tahiti boasts black sand and golden beaches, a bustling capital and prime snorkeling and surfing conditions. If you\'re looking for more cultural experiences, check out some of the island\'s ancient temples or shop at its traditional indoor markets. To save money, opt to stay in a vacation rental – the island is home to plenty of cute bungalows and chic condos.','2022-08-19 08:17:00','2022-08-29 05:17:00',850.00,'d82140bc-5dd2-428e-891c-769370540267.jfif','4b00801d-00af-11ed-9ea8-c025a57d8af5'),('London','London is a world unto itself. The eclectic neighborhoods, which are home to a blend of historical landmarks and modern-day attractions, can keep you occupied for days. If it\'s your first time in London, plan to see the top spots, such as the Tower of London, the Tate Modern art institution, Buckingham Palace, Borough Market and the British Museum, before sitting down to a classic afternoon tea or checking out a local pub. The best time to travel to London is during the warmer months, but be warned that this is also the busiest and most expensive time of year. ','2022-09-20 00:17:00','2022-09-06 09:17:00',1500.00,'d0c591e9-1cbd-4a7d-b842-f7786e4ebb3e.jfif','73f339b2-00af-11ed-9ea8-c025a57d8af5'),('South Island, New Zealand','New Zealand\'s South Island brims with majestic landscapes at every turn, from dramatic mountains to spectacular fjords. Here, you can admire the mountains of Fiordland National Park, a UNESCO World Heritage Site, from hiking trails or a boat on Milford Sound. At night, journey to the University of Canterbury\'s Mount John Observatory to gaze at the starry skies. You can also indulge your inner daredevil in Queenstown (a favorite destination among bungee jumpers), sample delicious sauvignon blanc wine in the Marlborough region or explore New Zealand\'s most accessible glaciers – Franz Josef and Fox Glacier – on the island\'s west coast','2022-07-14 02:30:00','2022-07-14 02:30:00',1900.00,'a27bdd14-c6b1-4ab0-9425-f89a541fd6c3.jfif','78e20d0f-00a8-11ed-9ea8-c025a57d8af5'),('Rome','When you visit the Eternal City, prepare to cross a few must-see attractions – including the Colosseum, the Trevi Fountain and the Pantheon – off of your bucket list. Travelers can see additional treasures, such as St. Peter\'s Basilica and the Sistine Chapel, in nearby Vatican City. Escape the tourist crowds by taking a twilight stroll along the cobblestone streets of Trastevere, or head to Mercato Centrale Roma to sample local delicacies like gelato and pizza. Before leaving, peruse some of Rome\'s lesser-known museums, art galleries and boutiques','2022-08-29 00:17:00','2022-09-10 09:17:00',925.00,'6b6c76bd-4166-4b2a-ac16-5d71321398cb.jfif','8d9a69b3-00af-11ed-9ea8-c025a57d8af5'),('Turks & Caicos','Located north of the Dominican Republic, this collection of roughly 100 islands and cays is popular with honeymooners – and for good reason. With sparkling white sand, crystal-clear water and nearly 350 miles of colorful coral reef, the Turks and Caicos Islands are truly a sight to behold. While you\'d be remiss to visit the islands and not spend a day or two lounging on Grace Bay Beach, those seeking a more active getaway will have plenty of opportunities to snorkel, scuba dive and ride horses along the coast. ','2022-08-23 00:17:00','2022-09-13 09:17:00',400.00,'2fef1674-6132-4c58-a526-bbd49ddeaaaa.jfif','b2b3695e-00af-11ed-9ea8-c025a57d8af5'),('Paris','The City of Light draws millions of visitors every year with its unforgettable ambiance. Of course, the divine cuisine and vast art collections deserve some of the credit as well. The gentle River Seine rambles through the city, flanked by stately museums, centuries-old churches, and blocks of Rococo- and Neoclassic-design architecture, further enhanced by cascading trees and glowing streetlamps. Peppering the Seine\'s cobbled walks and graceful bridges are impossibly chic Parisians, probably on their way to the market, cafe or cinema.  Containing world-class museums, fashion, cuisine and an atmosphere all its own, Paris is also a city of \"many splendors,\" as Ernest Hemingway recalled in his memoir, \"A Moveable Feast.\" Visit the beloved Musée d\'Orsay, shop the biggest designers on the Champs Élysées or hit the boutiques in Le Marais, take in the view atop the Eiffel Tower, or even plan a day trip to Versailles Palace. But don\'t miss out on the simple pleasure of meandering the marvelous arrondissements (districts), or snacking on street crepes either.','2022-07-12 03:16:00','2022-07-21 03:16:00',1000.00,'b5948bf6-4674-48f7-910d-9413fc372f9e.jfif','b34263a2-00ae-11ed-9ea8-c025a57d8af5'),('Tokyo','Simply setting foot in Japan\'s cosmopolitan capital is an experience within itself. A city known for its bustling streets and flashing neon signs, Tokyo has an electric energy and plenty of attractions to discover. Foodies won\'t be let down by the city\'s fresh sushi and hearty ramen. Budding photographers and adrenaline junkies will love taking in the sweeping panoramas from the top of the Tokyo Skytree. Shopaholics will find plenty of must-have designer products in Ginza. And for history buffs, Tokyo offers centuries-old temples and shrines to explore.','2022-08-31 00:17:00','2022-09-27 09:17:00',795.00,'25e68ce3-a254-4566-be8b-a128385bd8e1.jfif','c9b4f24a-00af-11ed-9ea8-c025a57d8af5'),('Maui','Whether you\'re driving along the Road to Hana, enjoying a bird\'s-eye view of Maui\'s lush coastline from a helicopter, snorkeling with sea turtles or simply relaxing on white or black sand beaches, you\'ll find that this Hawaiian island is unlike any other tropical destination. Don\'t miss a chance to visit Haleakala National Park, which is home to one of the world\'s largest dormant volcanic craters. You should also attend a luau for a dose of local culture and a taste of Hawaiian specialties like poi, poke and mahimahi.','2022-08-07 06:17:00','2022-08-11 05:17:00',1500.00,'73d932b8-2130-4329-a7a5-abf591f2fa7e.jfif','f6f9ae37-00ae-11ed-9ea8-c025a57d8af5');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations_followers`
--

DROP TABLE IF EXISTS `vacations_followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations_followers` (
  `user_id` varchar(36) COLLATE utf8_bin NOT NULL,
  `vacation_id` varchar(45) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`user_id`,`vacation_id`),
  KEY `vacation_id_to_vacation` (`vacation_id`),
  CONSTRAINT `user_id_to_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vacation_id_to_vacation` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations_followers`
--

LOCK TABLES `vacations_followers` WRITE;
/*!40000 ALTER TABLE `vacations_followers` DISABLE KEYS */;
INSERT INTO `vacations_followers` VALUES ('4dcd87ce-02a2-45cb-b173-89a66264895c','27b0e8b4-00af-11ed-9ea8-c025a57d8af5'),('4dcd87ce-02a2-45cb-b173-89a66264895c','4b00801d-00af-11ed-9ea8-c025a57d8af5'),('5ba9285b-b5c3-4358-bc97-620b065aee23','73f339b2-00af-11ed-9ea8-c025a57d8af5'),('5ba9285b-b5c3-4358-bc97-620b065aee23','78e20d0f-00a8-11ed-9ea8-c025a57d8af5'),('4dcd87ce-02a2-45cb-b173-89a66264895c','b2b3695e-00af-11ed-9ea8-c025a57d8af5'),('50e21b47-7c9d-4df1-b4fe-cfdefb9b703d','f6f9ae37-00ae-11ed-9ea8-c025a57d8af5');
/*!40000 ALTER TABLE `vacations_followers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-20 18:05:03
