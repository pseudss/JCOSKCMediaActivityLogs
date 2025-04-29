/*
  Warnings:

  - You are about to drop the `_rolepermissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_user roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_rolepermissions` DROP FOREIGN KEY `_RolePermissions_A_fkey`;

-- DropForeignKey
ALTER TABLE `_rolepermissions` DROP FOREIGN KEY `_RolePermissions_B_fkey`;

-- DropForeignKey
ALTER TABLE `_user roles` DROP FOREIGN KEY `_User Roles_A_fkey`;

-- DropForeignKey
ALTER TABLE `_user roles` DROP FOREIGN KEY `_User Roles_B_fkey`;

-- DropTable
DROP TABLE `_rolepermissions`;

-- DropTable
DROP TABLE `_user roles`;
