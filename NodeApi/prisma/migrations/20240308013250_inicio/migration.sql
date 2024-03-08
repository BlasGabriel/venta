-- CreateTable
CREATE TABLE `auditoria` (
    `id_auditoria` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `fecha` DATE NOT NULL,
    `hora` TIME(0) NOT NULL,
    `mensaje` VARCHAR(200) NOT NULL,
    `tipo_operacion` INTEGER NOT NULL,

    INDEX `id_usuario`(`id_usuario`),
    PRIMARY KEY (`id_auditoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cargo` (
    `id_cargo` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(200) NOT NULL,
    `id_dependencia` INTEGER NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,

    INDEX `id_dependencia`(`id_dependencia`),
    PRIMARY KEY (`id_cargo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria` (
    `id_categoria` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(200) NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,

    PRIMARY KEY (`id_categoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ciudad` (
    `id_ciudad` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id_ciudad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente` (
    `id_cliente` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(200) NOT NULL,
    `ruc` INTEGER NOT NULL,
    `telefono` VARCHAR(200) NOT NULL,
    `direccion` VARCHAR(200) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,
    `opera_credito` INTEGER NOT NULL,
    `id_ciudad` INTEGER NOT NULL,

    INDEX `id_ciudad`(`id_ciudad`),
    PRIMARY KEY (`id_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cobro` (
    `id_cobro` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cliente` INTEGER NOT NULL,
    `subtotal` INTEGER NOT NULL,
    `descuento` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `fecha` DATE NOT NULL,
    `fecha_anulacion` DATE NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,

    INDEX `id_cliente`(`id_cliente`),
    INDEX `id_usuario`(`id_usuario`),
    PRIMARY KEY (`id_cobro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `compra` (
    `id_compra` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATE NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,
    `id_proveedor` INTEGER NOT NULL,
    `total_iva` DECIMAL(10, 0) NOT NULL,
    `subtotal` INTEGER NOT NULL,
    `descuento` FLOAT NOT NULL,
    `total` INTEGER NOT NULL,
    `fecha_anulacion` DATE NOT NULL,
    `id_deposito` INTEGER NOT NULL,
    `tipo_operacion` INTEGER NOT NULL,

    INDEX `id_deposito`(`id_deposito`),
    INDEX `id_proveedor`(`id_proveedor`),
    INDEX `id_usuario`(`id_usuario`),
    PRIMARY KEY (`id_compra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cuenta_cobrar` (
    `id_cuenta_cobrar` INTEGER NOT NULL AUTO_INCREMENT,
    `id_venta` INTEGER NOT NULL,
    `id_cliente` INTEGER NOT NULL,
    `fecha` DATE NOT NULL,
    `fecha_pago` DATE NOT NULL,
    `monto` INTEGER NOT NULL,
    `porcentaje_interes` INTEGER NOT NULL,
    `tipo_interes` INTEGER NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,

    INDEX `id_cliente`(`id_cliente`),
    INDEX `id_venta`(`id_venta`),
    PRIMARY KEY (`id_cuenta_cobrar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cuenta_pagar` (
    `id_cuenta_pagar` INTEGER NOT NULL AUTO_INCREMENT,
    `id_compra` INTEGER NOT NULL,
    `id_proveedor` INTEGER NOT NULL,
    `fecha` DATE NOT NULL,
    `fecha_pago` DATE NOT NULL,
    `monto` INTEGER NOT NULL,
    `porcentaje_interes` FLOAT NOT NULL,
    `tipo_interes` INTEGER NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,

    INDEX `id_compra`(`id_compra`),
    INDEX `id_proveedor`(`id_proveedor`),
    PRIMARY KEY (`id_cuenta_pagar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dependencia` (
    `id_dependencia` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(200) NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,

    PRIMARY KEY (`id_dependencia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `deposito` (
    `id_deposito` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(200) NOT NULL,
    `direccion` VARCHAR(200) NOT NULL,
    `telefono` VARCHAR(200) NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,
    `id_encargado` INTEGER NOT NULL,

    INDEX `id_encargado`(`id_encargado`),
    PRIMARY KEY (`id_deposito`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcionario` (
    `id_funcionario` INTEGER NOT NULL AUTO_INCREMENT,
    `id_persona` INTEGER NOT NULL,
    `fecha_ingreso` DATE NOT NULL,
    `fecha_baja` DATE NOT NULL,
    `id_dependencia` INTEGER NOT NULL,
    `id_cargo` INTEGER NOT NULL,
    `salario` INTEGER NOT NULL,
    `horario` INTEGER NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,

    INDEX `id_cargo`(`id_cargo`),
    INDEX `id_dependencia`(`id_dependencia`),
    INDEX `id_persona`(`id_persona`),
    PRIMARY KEY (`id_funcionario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_cobro` (
    `id_item_cobro` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cuenta_cobrar` INTEGER NOT NULL,
    `monto_nominal` INTEGER NOT NULL,
    `monto_real` INTEGER NOT NULL,

    INDEX `id_cuenta_cobrar`(`id_cuenta_cobrar`),
    PRIMARY KEY (`id_item_cobro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_compra` (
    `id_item_compra` INTEGER NOT NULL AUTO_INCREMENT,
    `id_producto` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `precio_unitario` INTEGER NOT NULL,
    `monto_iva` DECIMAL(10, 0) NOT NULL,

    INDEX `id_produtco`(`id_producto`),
    PRIMARY KEY (`id_item_compra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_pago` (
    `id_item_pago` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cuenta_pagar` INTEGER NOT NULL,
    `monto_nominal` INTEGER NOT NULL,
    `monto_real` INTEGER NOT NULL,

    INDEX `id_cuenta_pagar`(`id_cuenta_pagar`),
    PRIMARY KEY (`id_item_pago`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_traslado` (
    `id_traslado` INTEGER NOT NULL AUTO_INCREMENT,
    `id_producto` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,

    INDEX `id_producto`(`id_producto`),
    PRIMARY KEY (`id_traslado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_venta` (
    `id_item_venta` INTEGER NOT NULL AUTO_INCREMENT,
    `id_producto` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `precio_unitario` INTEGER NOT NULL,
    `monto_iva` DECIMAL(11, 0) NOT NULL,
    `id_venta` INTEGER NOT NULL,

    INDEX `id_producto`(`id_producto`),
    INDEX `id_venta`(`id_venta`),
    PRIMARY KEY (`id_item_venta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `licencia` (
    `id_licencia` INTEGER NOT NULL AUTO_INCREMENT,
    `id_funcionario` INTEGER NOT NULL,
    `id_tipo_licencia` INTEGER NOT NULL,
    `fecha_desde` DATE NOT NULL,
    `fecha_hasta` DATE NOT NULL,
    `hora_desde` TIME(0) NOT NULL,
    `hora_hasta` TIME(0) NOT NULL,
    `remunerado` INTEGER NOT NULL,
    `observacion` VARCHAR(200) NOT NULL,

    INDEX `id_funcionario`(`id_funcionario`),
    INDEX `id_tipo_licencia`(`id_tipo_licencia`),
    PRIMARY KEY (`id_licencia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pago` (
    `id_pago` INTEGER NOT NULL AUTO_INCREMENT,
    `id_proveedor` INTEGER NOT NULL,
    `subtotal` INTEGER NOT NULL,
    `descuento` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `fecha` DATE NOT NULL,
    `fecha_anulacion` DATE NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,

    INDEX `id_proveedor`(`id_proveedor`),
    INDEX `id_usuario`(`id_usuario`),
    PRIMARY KEY (`id_pago`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pago_salario` (
    `id_pago_salario` INTEGER NOT NULL AUTO_INCREMENT,
    `id_funcionario` INTEGER NOT NULL,
    `fecha_pago` DATE NOT NULL,
    `correspondiente_a_mes` DATE NOT NULL,
    `correspondiente_a_anho` YEAR NOT NULL,
    `monto_salario` INTEGER NOT NULL,
    `descuento` INTEGER NOT NULL,
    `extra` INTEGER NOT NULL,
    `monto_real` INTEGER NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,

    INDEX `id_funcionario`(`id_funcionario`),
    PRIMARY KEY (`id_pago_salario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `perfil` (
    `id_perfil` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(200) NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,

    PRIMARY KEY (`id_perfil`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `persona` (
    `id_persona` INTEGER NOT NULL AUTO_INCREMENT,
    `documento` INTEGER NOT NULL,
    `apellido` VARCHAR(200) NOT NULL,
    `nombre` VARCHAR(200) NOT NULL,
    `direccion` VARCHAR(200) NOT NULL,
    `id_ciudad` INTEGER NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `foto` MEDIUMBLOB NOT NULL,

    INDEX `id_ciudad`(`id_ciudad`),
    PRIMARY KEY (`id_persona`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `producto` (
    `id_producto` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(200) NOT NULL,
    `codigo_barra` VARCHAR(150) NOT NULL,
    `precio_compra` FLOAT NOT NULL,
    `precio_venta_minimo` FLOAT NOT NULL,
    `precio_venta_maximo` FLOAT NOT NULL,
    `porcentaje_iva` FLOAT NOT NULL,
    `id_categoria` INTEGER NOT NULL,
    `id_unidad_medida` INTEGER NOT NULL,
    `foto` MEDIUMBLOB NOT NULL,
    `observacion` VARCHAR(200) NOT NULL,

    INDEX `id_categoria`(`id_categoria`),
    INDEX `id_unidad_medida`(`id_unidad_medida`),
    PRIMARY KEY (`id_producto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proveedor` (
    `id_proveedor` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(200) NOT NULL,
    `ruc` INTEGER NOT NULL,
    `id_responsable` INTEGER NOT NULL,
    `telefono` VARCHAR(200) NOT NULL,
    `direccion` VARCHAR(200) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,
    `opera_credito` INTEGER NOT NULL,
    `id_ciudad` INTEGER NOT NULL,

    INDEX `id_ciudad`(`id_ciudad`),
    INDEX `id_responsable`(`id_responsable`),
    PRIMARY KEY (`id_proveedor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock` (
    `id_stock` INTEGER NOT NULL AUTO_INCREMENT,
    `id_producto` INTEGER NOT NULL,
    `id_deposito` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `stock_minimo` INTEGER NOT NULL,

    INDEX `id_deposito`(`id_deposito`),
    INDEX `id_producto`(`id_producto`),
    PRIMARY KEY (`id_stock`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_licencia` (
    `id_tipo_licencia` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id_tipo_licencia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `traslado` (
    `id_traslado` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATE NOT NULL,
    `fecha_cierre` DATE NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,
    `id_responsable` INTEGER NOT NULL,
    `id_deposito_origen` INTEGER NOT NULL,
    `id_deposito_destino` INTEGER NOT NULL,
    `id_transporte` INTEGER NOT NULL,

    INDEX `id_deposito_destino`(`id_deposito_destino`),
    INDEX `id_deposito_origen`(`id_deposito_origen`),
    INDEX `id_responsable`(`id_responsable`),
    INDEX `id_transporte`(`id_transporte`),
    PRIMARY KEY (`id_traslado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unidad_de_medida` (
    `id_unidad_medida` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(200) NOT NULL,
    `abreviatura` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id_unidad_medida`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `id_persona` INTEGER NOT NULL,
    `id_perfil` INTEGER NOT NULL,
    `login` VARCHAR(200) NOT NULL,
    `password` VARCHAR(400) NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,

    INDEX `id_perfil`(`id_perfil`),
    INDEX `id_persona`(`id_persona`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `venta` (
    `id_venta` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,
    `id_cliente` INTEGER NOT NULL,
    `total_iva` FLOAT NOT NULL,
    `subtotal` INTEGER NOT NULL,
    `descuento` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `fecha_anulacion` DATE NOT NULL,
    `id_deposito` INTEGER NOT NULL,
    `tipo_operacion` INTEGER NOT NULL,

    INDEX `id_cliente`(`id_cliente`),
    INDEX `id_deposito`(`id_deposito`),
    INDEX `id_usuario`(`id_usuario`),
    PRIMARY KEY (`id_venta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `auditoria` ADD CONSTRAINT `fk_id_usuario_auditoria` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cargo` ADD CONSTRAINT `fk_id_dependencia_cargo` FOREIGN KEY (`id_dependencia`) REFERENCES `dependencia`(`id_dependencia`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cliente` ADD CONSTRAINT `fk_id_ciudad_cliente` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudad`(`id_ciudad`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cobro` ADD CONSTRAINT `fk_id_cliente_cobro` FOREIGN KEY (`id_cliente`) REFERENCES `cliente`(`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cobro` ADD CONSTRAINT `fk_id_usuario_cobro` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `fk_id_deposito_compra` FOREIGN KEY (`id_deposito`) REFERENCES `deposito`(`id_deposito`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `fk_id_proveedor_compra` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor`(`id_proveedor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `fk_id_usuario_compra` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cuenta_cobrar` ADD CONSTRAINT `fk_id_cliente_cuenta_cobrar` FOREIGN KEY (`id_cliente`) REFERENCES `cliente`(`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cuenta_cobrar` ADD CONSTRAINT `fk_id_venta_cuenta_cobrar` FOREIGN KEY (`id_venta`) REFERENCES `venta`(`id_venta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cuenta_pagar` ADD CONSTRAINT `fk_id_compra_cuenta_pagar` FOREIGN KEY (`id_compra`) REFERENCES `compra`(`id_compra`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cuenta_pagar` ADD CONSTRAINT `fk_id_proveedor_cuenta_pagar` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor`(`id_proveedor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `deposito` ADD CONSTRAINT `fk_id_encargado_deposito` FOREIGN KEY (`id_encargado`) REFERENCES `funcionario`(`id_funcionario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `funcionario` ADD CONSTRAINT `fk_id_cargo_funcionario` FOREIGN KEY (`id_cargo`) REFERENCES `cargo`(`id_cargo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `funcionario` ADD CONSTRAINT `fk_id_dependencia_funcionario` FOREIGN KEY (`id_dependencia`) REFERENCES `dependencia`(`id_dependencia`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `funcionario` ADD CONSTRAINT `fk_id_persona_funcionario` FOREIGN KEY (`id_persona`) REFERENCES `persona`(`id_persona`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_cobro` ADD CONSTRAINT `fk_id_cuenta_cobrar_cobro` FOREIGN KEY (`id_cuenta_cobrar`) REFERENCES `cuenta_cobrar`(`id_cuenta_cobrar`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_compra` ADD CONSTRAINT `fk_id_producto_item_compra` FOREIGN KEY (`id_producto`) REFERENCES `producto`(`id_producto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_pago` ADD CONSTRAINT `fk_id_cuenta_pagar_pago` FOREIGN KEY (`id_cuenta_pagar`) REFERENCES `cuenta_pagar`(`id_cuenta_pagar`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_traslado` ADD CONSTRAINT `fk_id_producto_traslado` FOREIGN KEY (`id_producto`) REFERENCES `producto`(`id_producto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_venta` ADD CONSTRAINT `fk_id_producto_venta` FOREIGN KEY (`id_producto`) REFERENCES `producto`(`id_producto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_venta` ADD CONSTRAINT `fk_id_venta` FOREIGN KEY (`id_venta`) REFERENCES `venta`(`id_venta`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `licencia` ADD CONSTRAINT `fk_id_funcionario_licencia` FOREIGN KEY (`id_funcionario`) REFERENCES `funcionario`(`id_funcionario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `licencia` ADD CONSTRAINT `fk_id_tipo_licencia_licencia` FOREIGN KEY (`id_tipo_licencia`) REFERENCES `tipo_licencia`(`id_tipo_licencia`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pago` ADD CONSTRAINT `fk_id_proveedor_pago` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor`(`id_proveedor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pago` ADD CONSTRAINT `fk_id_usuario_pago` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pago_salario` ADD CONSTRAINT `fk_id_funcionario_pago_salario` FOREIGN KEY (`id_funcionario`) REFERENCES `funcionario`(`id_funcionario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `persona` ADD CONSTRAINT `fk_id_ciudad_persona` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudad`(`id_ciudad`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `producto` ADD CONSTRAINT `fk_id_categoria_producto` FOREIGN KEY (`id_categoria`) REFERENCES `categoria`(`id_categoria`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `producto` ADD CONSTRAINT `fk_id_unidad_medida_producto` FOREIGN KEY (`id_unidad_medida`) REFERENCES `unidad_de_medida`(`id_unidad_medida`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `proveedor` ADD CONSTRAINT `fk_id_ciudad_proveedor` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudad`(`id_ciudad`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `proveedor` ADD CONSTRAINT `fk_id_responsable_proveedor` FOREIGN KEY (`id_responsable`) REFERENCES `funcionario`(`id_funcionario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `stock` ADD CONSTRAINT `fk_id_deposito_stock` FOREIGN KEY (`id_deposito`) REFERENCES `deposito`(`id_deposito`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `stock` ADD CONSTRAINT `fk_id_producto_stock` FOREIGN KEY (`id_producto`) REFERENCES `producto`(`id_producto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `traslado` ADD CONSTRAINT `fk_id_deposito_destino_traslado` FOREIGN KEY (`id_deposito_destino`) REFERENCES `deposito`(`id_deposito`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `traslado` ADD CONSTRAINT `fk_id_deposito_origen_traslado` FOREIGN KEY (`id_deposito_origen`) REFERENCES `deposito`(`id_deposito`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `traslado` ADD CONSTRAINT `fk_id_responsable_traslado` FOREIGN KEY (`id_responsable`) REFERENCES `funcionario`(`id_funcionario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `fk_id_perfil_usuario` FOREIGN KEY (`id_perfil`) REFERENCES `perfil`(`id_perfil`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `fk_id_persona_usuario` FOREIGN KEY (`id_persona`) REFERENCES `persona`(`id_persona`) ON DELETE NO ACTION ON UPDATE NO ACTION;
