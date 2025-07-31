/*
  Warnings:

  - You are about to drop the column `dojCoopId` on the `members` table. All the data in the column will be lost.
  - You are about to drop the `doj_coops` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `members` DROP FOREIGN KEY `members_dojCoopId_fkey`;

-- DropIndex
DROP INDEX `members_dojCoopId_fkey` ON `members`;

-- AlterTable
ALTER TABLE `members` DROP COLUMN `dojCoopId`,
    ADD COLUMN `dojHmoId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `doj_coops`;

-- CreateTable
CREATE TABLE `doj_hmos` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `doj_hmos_name_key`(`name`),
    UNIQUE INDEX `doj_hmos_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `members` ADD CONSTRAINT `members_dojHmoId_fkey` FOREIGN KEY (`dojHmoId`) REFERENCES `doj_hmos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
