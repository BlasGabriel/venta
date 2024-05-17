/*
  Warnings:

  - You are about to drop the column `id_item_compra` on the `compra` table. All the data in the column will be lost.
  - You are about to drop the column `id_item_venta` on the `venta` table. All the data in the column will be lost.
  - Changed the type of `horario` on the `funcionario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `id_compra` to the `item_compra` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `compra` DROP FOREIGN KEY `fk_id_item_compra`;

-- DropForeignKey
ALTER TABLE `venta` DROP FOREIGN KEY `fk_id_item_venta`;

-- AlterTable
ALTER TABLE `compra` DROP COLUMN `id_item_compra`;

-- AlterTable
ALTER TABLE `funcionario` DROP COLUMN `horario`,
    ADD COLUMN `horario` TIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `item_compra` ADD COLUMN `id_compra` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `venta` DROP COLUMN `id_item_venta`;

-- CreateIndex
CREATE INDEX `id_compra` ON `item_compra`(`id_compra`);

-- CreateIndex
CREATE INDEX `item_compra` ON `item_compra`(`id_compra`);

-- AddForeignKey
ALTER TABLE `item_compra` ADD CONSTRAINT `fk_id_compra_item_compra` FOREIGN KEY (`id_compra`) REFERENCES `compra`(`id_compra`) ON DELETE RESTRICT ON UPDATE RESTRICT;
