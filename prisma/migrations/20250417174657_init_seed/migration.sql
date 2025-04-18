-- CreateTable
CREATE TABLE `Fac` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Fac_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Team_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attendee` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `studyLevel` ENUM('FIRST', 'SECOND', 'THIRD') NULL,
    `specialization` ENUM('LICENSE', 'MASTER', 'DOCTORAT', 'ENGINEER', 'PREPARATORY', 'OTHER') NULL,
    `teamId` VARCHAR(191) NOT NULL,
    `ticketId` VARCHAR(191) NOT NULL,
    `facId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Attendee_email_key`(`email`),
    UNIQUE INDEX `Attendee_phone_key`(`phone`),
    UNIQUE INDEX `Attendee_ticketId_key`(`ticketId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `ticketNo` VARCHAR(191) NOT NULL,
    `done` BOOLEAN NOT NULL DEFAULT false,
    `hadMeal` BOOLEAN NOT NULL DEFAULT false,
    `hadLunch` BOOLEAN NOT NULL DEFAULT false,
    `workshopId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ticketNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkshopsByTicket` (
    `hasAttended` BOOLEAN NOT NULL DEFAULT false,
    `ticketId` VARCHAR(191) NOT NULL,
    `workshopId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ticketId`, `workshopId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Workshop` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChallengesByTeam` (
    `teamId` VARCHAR(191) NOT NULL,
    `challengeId` INTEGER NOT NULL,
    `score` INTEGER NOT NULL DEFAULT 0,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`teamId`, `challengeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Challenge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `number` INTEGER NOT NULL,
    `points` INTEGER NOT NULL,
    `description` MEDIUMTEXT NOT NULL,
    `key` VARCHAR(191) NULL,
    `hint` VARCHAR(191) NULL,
    `tech` ENUM('AI', 'WEB', 'DEVOPS', 'MOBILE', 'PROBLEM_SOLVING', 'UI_UX', 'OTHER') NULL,
    `domaineId` INTEGER NULL,

    UNIQUE INDEX `Challenge_number_key`(`number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Domaine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Domaine_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Controle` (
    `id` TINYINT NOT NULL AUTO_INCREMENT,
    `isFrozen` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Attendee` ADD CONSTRAINT `Attendee_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendee` ADD CONSTRAINT `Attendee_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`ticketNo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendee` ADD CONSTRAINT `Attendee_facId_fkey` FOREIGN KEY (`facId`) REFERENCES `Fac`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkshopsByTicket` ADD CONSTRAINT `WorkshopsByTicket_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`ticketNo`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkshopsByTicket` ADD CONSTRAINT `WorkshopsByTicket_workshopId_fkey` FOREIGN KEY (`workshopId`) REFERENCES `Workshop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChallengesByTeam` ADD CONSTRAINT `ChallengesByTeam_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChallengesByTeam` ADD CONSTRAINT `ChallengesByTeam_challengeId_fkey` FOREIGN KEY (`challengeId`) REFERENCES `Challenge`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Challenge` ADD CONSTRAINT `Challenge_domaineId_fkey` FOREIGN KEY (`domaineId`) REFERENCES `Domaine`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
