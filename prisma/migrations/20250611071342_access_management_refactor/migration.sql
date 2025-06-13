/*
  Warnings:

  - You are about to drop the `permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role_permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `role_permissions` DROP FOREIGN KEY `role_permissions_permissionId_fkey`;

-- DropForeignKey
ALTER TABLE `role_permissions` DROP FOREIGN KEY `role_permissions_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `user_roles` DROP FOREIGN KEY `user_roles_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `user_roles` DROP FOREIGN KEY `user_roles_userId_fkey`;

-- DropTable
DROP TABLE `permission`;

-- DropTable
DROP TABLE `role`;

-- DropTable
DROP TABLE `role_permissions`;

-- DropTable
DROP TABLE `user`;

-- DropTable
DROP TABLE `user_roles`;

-- CreateTable
CREATE TABLE `_auth_users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_temporary_password` BOOLEAN NOT NULL DEFAULT false,
    `is_system_user` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `_auth_users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_auth_roles` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `_auth_roles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_auth_permissions` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `_auth_permissions_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_auth_user_roles` (
    `userId` VARCHAR(191) NOT NULL,
    `roleId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_auth_role_permissions` (
    `roleId` VARCHAR(191) NOT NULL,
    `permissionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`roleId`, `permissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_auth_user_roles` ADD CONSTRAINT `_auth_user_roles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `_auth_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_auth_user_roles` ADD CONSTRAINT `_auth_user_roles_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `_auth_roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_auth_role_permissions` ADD CONSTRAINT `_auth_role_permissions_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `_auth_roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_auth_role_permissions` ADD CONSTRAINT `_auth_role_permissions_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `_auth_permissions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
