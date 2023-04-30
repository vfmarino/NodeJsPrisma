/*
  Warnings:

  - You are about to drop the column `coinMarketId` on the `cryptoprices` table. All the data in the column will be lost.
  - Added the required column `coinMarketCapId` to the `cryptoPrices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cryptoprices` DROP COLUMN `coinMarketId`,
    ADD COLUMN `coinMarketCapId` INTEGER NOT NULL;
