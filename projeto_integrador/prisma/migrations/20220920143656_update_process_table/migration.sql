/*
  Warnings:

  - You are about to drop the column `infraction_date` on the `process` table. All the data in the column will be lost.
  - Added the required column `process_date` to the `process` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `process` DROP COLUMN `infraction_date`,
    ADD COLUMN `billsId` VARCHAR(191) NULL,
    ADD COLUMN `process_date` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `process` ADD CONSTRAINT `process_billsId_fkey` FOREIGN KEY (`billsId`) REFERENCES `bills`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
