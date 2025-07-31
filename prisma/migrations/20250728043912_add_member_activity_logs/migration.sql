/*
  Warnings:

  - You are about to drop the column `deviceId` on the `member_activity_logs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `member_activity_logs` DROP FOREIGN KEY `member_activity_logs_deviceId_fkey`;

-- DropIndex
DROP INDEX `member_activity_logs_deviceId_fkey` ON `member_activity_logs`;

-- AlterTable
ALTER TABLE `member_activity_logs` DROP COLUMN `deviceId`;

-- CreateTable
CREATE TABLE `member_activity_log_devices` (
    `id` VARCHAR(191) NOT NULL,
    `memberActivityLogId` VARCHAR(191) NOT NULL,
    `deviceId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `member_activity_log_devices_memberActivityLogId_deviceId_key`(`memberActivityLogId`, `deviceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `member_activity_log_devices` ADD CONSTRAINT `member_activity_log_devices_memberActivityLogId_fkey` FOREIGN KEY (`memberActivityLogId`) REFERENCES `member_activity_logs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_activity_log_devices` ADD CONSTRAINT `member_activity_log_devices_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `devices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
