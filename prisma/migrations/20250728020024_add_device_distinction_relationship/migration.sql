-- AlterTable
ALTER TABLE `devices` ADD COLUMN `deviceDistinctionId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `devices` ADD CONSTRAINT `devices_deviceDistinctionId_fkey` FOREIGN KEY (`deviceDistinctionId`) REFERENCES `device_distinctions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
