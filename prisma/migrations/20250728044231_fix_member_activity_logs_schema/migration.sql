/*
  Warnings:

  - You are about to drop the `member_activity_log_devices` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deviceIds` to the `member_activity_logs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `member_activity_log_devices` DROP FOREIGN KEY `member_activity_log_devices_deviceId_fkey`;

-- DropForeignKey
ALTER TABLE `member_activity_log_devices` DROP FOREIGN KEY `member_activity_log_devices_memberActivityLogId_fkey`;

-- AlterTable
ALTER TABLE `member_activity_logs` ADD COLUMN `deviceIds` TEXT NOT NULL;

-- DropTable
DROP TABLE `member_activity_log_devices`;
