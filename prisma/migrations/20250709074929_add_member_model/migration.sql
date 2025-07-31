/*
  Warnings:

  - You are about to drop the column `is_inactive_member` on the `members` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `members` DROP COLUMN `is_inactive_member`,
    ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT false;
