-- CreateTable
CREATE TABLE `Controle` (
    `id` TINYINT NOT NULL AUTO_INCREMENT,
    `isFrozen` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
