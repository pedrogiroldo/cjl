/*
  Warnings:

  - Made the column `location` on table `Schedule` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Schedule" ALTER COLUMN "location" SET NOT NULL;
