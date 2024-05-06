/*
  Warnings:

  - You are about to drop the column `fields` on the `Sheet` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Sheet` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Sheet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[googleId]` on the table `Sheet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[googleUrl]` on the table `Sheet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `googleId` to the `Sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `googleUrl` to the `Sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `headers` to the `Sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Sheet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Sheet` DROP COLUMN `fields`,
    DROP COLUMN `isActive`,
    DROP COLUMN `name`,
    ADD COLUMN `googleId` VARCHAR(191) NOT NULL,
    ADD COLUMN `googleUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `headers` JSON NOT NULL,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Sheet_googleId_key` ON `Sheet`(`googleId`);

-- CreateIndex
CREATE UNIQUE INDEX `Sheet_googleUrl_key` ON `Sheet`(`googleUrl`);
