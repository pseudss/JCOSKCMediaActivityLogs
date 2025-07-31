-- AlterTable
ALTER TABLE `members` ADD COLUMN `dojCoopId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `doj_coops` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `doj_coops_name_key`(`name`),
    UNIQUE INDEX `doj_coops_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `members` ADD CONSTRAINT `members_dojCoopId_fkey` FOREIGN KEY (`dojCoopId`) REFERENCES `doj_coops`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
