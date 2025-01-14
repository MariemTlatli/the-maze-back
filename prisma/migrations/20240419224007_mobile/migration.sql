/*
  Warnings:

  - The values [DEV] on the enum `Challenge_tech` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `challenge` MODIFY `tech` ENUM('AI', 'WEB', 'DEVOPS', 'MOBILE', 'PROBLEM_SOLVING', 'UI_UX', 'OTHER') NULL;
