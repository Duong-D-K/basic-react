/*
  Warnings:

  - Added the required column `phoneNumber` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctor` ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL;
