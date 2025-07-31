/*
  Warnings:

  - You are about to drop the column `deviceDistinctionId` on the `devices` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `devices` DROP FOREIGN KEY `devices_deviceDistinctionId_fkey`;

-- DropIndex
DROP INDEX `devices_deviceDistinctionId_fkey` ON `devices`;

-- AlterTable
ALTER TABLE `devices` DROP COLUMN `deviceDistinctionId`;

-- CreateTable
CREATE TABLE `device_device_distinctions` (
    `id` VARCHAR(191) NOT NULL,
    `deviceId` VARCHAR(191) NOT NULL,
    `deviceDistinctionId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `device_device_distinctions_deviceId_deviceDistinctionId_key`(`deviceId`, `deviceDistinctionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `device_device_distinctions` ADD CONSTRAINT `device_device_distinctions_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `devices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `device_device_distinctions` ADD CONSTRAINT `device_device_distinctions_deviceDistinctionId_fkey` FOREIGN KEY (`deviceDistinctionId`) REFERENCES `device_distinctions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
