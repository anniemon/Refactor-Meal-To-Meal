CREATE DATABASE IF NOT EXISTS mealtomeal CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
DROP DATABASE IF EXISTS mealtomeal_test;
CREATE DATABASE IF NOT EXISTS mealtomeal_test CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
CREATE USER IF NOT EXISTS 'dayone'@'%' IDENTIFIED BY 'dayone'; 
GRANT ALL PRIVILEGES ON *.* TO 'dayone'@'%' WITH GRANT OPTION; 
FLUSH PRIVILEGES;

