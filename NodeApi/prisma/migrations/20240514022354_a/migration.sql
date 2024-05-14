/*
  Warnings:

  - Added the required column `id_item_cobro` to the `cobro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_item_compra` to the `compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `es_cobrado` to the `item_cobro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `es_pagado` to the `item_pago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_item_pago` to the `pago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_item_traslado` to the `traslado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_item_venta` to the `venta` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `fecha` on the `venta` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `cliente` MODIFY `ruc` VARCHAR(11) NOT NULL;

-- AlterTable
ALTER TABLE `cobro` ADD COLUMN `id_item_cobro` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `compra` ADD COLUMN `id_item_compra` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `item_cobro` ADD COLUMN `es_cobrado` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `item_pago` ADD COLUMN `es_pagado` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `pago` ADD COLUMN `id_item_pago` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `proveedor` MODIFY `ruc` VARCHAR(11) NOT NULL;

-- AlterTable
ALTER TABLE `traslado` ADD COLUMN `id_item_traslado` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `venta` ADD COLUMN `id_item_venta` INTEGER NOT NULL,
    DROP COLUMN `fecha`,
    ADD COLUMN `fecha` DATE NOT NULL;

-- CreateIndex
CREATE INDEX `fk_id_item_cobro` ON `cobro`(`id_item_cobro`);

-- CreateIndex
CREATE INDEX `fk_id_item_compra` ON `compra`(`id_item_compra`);

-- CreateIndex
CREATE INDEX `fk_id_item_pago` ON `pago`(`id_item_pago`);

-- CreateIndex
CREATE INDEX `fk_id_item_traslado` ON `traslado`(`id_item_traslado`);

-- CreateIndex
CREATE INDEX `id_item_venta` ON `venta`(`id_item_venta`);

-- AddForeignKey
ALTER TABLE `cobro` ADD CONSTRAINT `fk_id_item_cobro` FOREIGN KEY (`id_item_cobro`) REFERENCES `item_cobro`(`id_item_cobro`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `fk_id_item_compra` FOREIGN KEY (`id_item_compra`) REFERENCES `item_compra`(`id_item_compra`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pago` ADD CONSTRAINT `fk_id_item_pago` FOREIGN KEY (`id_item_pago`) REFERENCES `item_pago`(`id_item_pago`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `traslado` ADD CONSTRAINT `fk_id_item_traslado` FOREIGN KEY (`id_item_traslado`) REFERENCES `item_traslado`(`id_traslado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `fk_id_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente`(`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `fk_id_deposito ` FOREIGN KEY (`id_deposito`) REFERENCES `deposito`(`id_deposito`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `fk_id_item_venta` FOREIGN KEY (`id_item_venta`) REFERENCES `item_venta`(`id_item_venta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `fk_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
