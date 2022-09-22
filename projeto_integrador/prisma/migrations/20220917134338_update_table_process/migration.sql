/*
  Warnings:

  - You are about to drop the column `code` on the `process` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number_process]` on the table `process` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number_process` to the `process` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `process_code_key` ON `process`;

-- AlterTable
ALTER TABLE `process` DROP COLUMN `code`,
    ADD COLUMN `number_process` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `process_number_process_key` ON `process`(`number_process`);
