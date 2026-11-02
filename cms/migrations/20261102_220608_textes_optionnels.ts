import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_page_accueil\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`countdown_label\` text NOT NULL,
  	\`countdown_done_label\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_accueil\`("id", "title", "intro", "description", "image_id", "countdown_label", "countdown_done_label", "updated_at", "created_at") SELECT "id", "title", "intro", "description", "image_id", "countdown_label", "countdown_done_label", "updated_at", "created_at" FROM \`page_accueil\`;`)
  await db.run(sql`DROP TABLE \`page_accueil\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_accueil\` RENAME TO \`page_accueil\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`page_accueil_image_idx\` ON \`page_accueil\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_page_historique\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_historique\`("id", "title", "intro", "description", "updated_at", "created_at") SELECT "id", "title", "intro", "description", "updated_at", "created_at" FROM \`page_historique\`;`)
  await db.run(sql`DROP TABLE \`page_historique\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_historique\` RENAME TO \`page_historique\`;`)
  await db.run(sql`CREATE TABLE \`__new_page_benevoles\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_benevoles\`("id", "title", "intro", "description", "updated_at", "created_at") SELECT "id", "title", "intro", "description", "updated_at", "created_at" FROM \`page_benevoles\`;`)
  await db.run(sql`DROP TABLE \`page_benevoles\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_benevoles\` RENAME TO \`page_benevoles\`;`)
  await db.run(sql`CREATE TABLE \`__new_page_boutique\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_boutique\`("id", "title", "intro", "description", "updated_at", "created_at") SELECT "id", "title", "intro", "description", "updated_at", "created_at" FROM \`page_boutique\`;`)
  await db.run(sql`DROP TABLE \`page_boutique\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_boutique\` RENAME TO \`page_boutique\`;`)
  await db.run(sql`CREATE TABLE \`__new_page_comite\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_comite\`("id", "title", "intro", "description", "updated_at", "created_at") SELECT "id", "title", "intro", "description", "updated_at", "created_at" FROM \`page_comite\`;`)
  await db.run(sql`DROP TABLE \`page_comite\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_comite\` RENAME TO \`page_comite\`;`)
  await db.run(sql`CREATE TABLE \`__new_page_sponsors\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_sponsors\`("id", "title", "intro", "description", "updated_at", "created_at") SELECT "id", "title", "intro", "description", "updated_at", "created_at" FROM \`page_sponsors\`;`)
  await db.run(sql`DROP TABLE \`page_sponsors\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_sponsors\` RENAME TO \`page_sponsors\`;`)
  await db.run(sql`CREATE TABLE \`__new_page_photos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_photos\`("id", "title", "intro", "description", "updated_at", "created_at") SELECT "id", "title", "intro", "description", "updated_at", "created_at" FROM \`page_photos\`;`)
  await db.run(sql`DROP TABLE \`page_photos\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_photos\` RENAME TO \`page_photos\`;`)
  await db.run(sql`CREATE TABLE \`__new_page_infos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_infos\`("id", "title", "intro", "description", "updated_at", "created_at") SELECT "id", "title", "intro", "description", "updated_at", "created_at" FROM \`page_infos\`;`)
  await db.run(sql`DROP TABLE \`page_infos\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_infos\` RENAME TO \`page_infos\`;`)
  await db.run(sql`CREATE TABLE \`__new_page_programme\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_programme\`("id", "title", "intro", "description", "updated_at", "created_at") SELECT "id", "title", "intro", "description", "updated_at", "created_at" FROM \`page_programme\`;`)
  await db.run(sql`DROP TABLE \`page_programme\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_programme\` RENAME TO \`page_programme\`;`)
  await db.run(sql`CREATE TABLE \`__new_page_billetterie\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_billetterie\`("id", "title", "intro", "description", "updated_at", "created_at") SELECT "id", "title", "intro", "description", "updated_at", "created_at" FROM \`page_billetterie\`;`)
  await db.run(sql`DROP TABLE \`page_billetterie\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_billetterie\` RENAME TO \`page_billetterie\`;`)
  await db.run(sql`CREATE TABLE \`__new_page_contact\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_contact\`("id", "title", "intro", "description", "updated_at", "created_at") SELECT "id", "title", "intro", "description", "updated_at", "created_at" FROM \`page_contact\`;`)
  await db.run(sql`DROP TABLE \`page_contact\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_contact\` RENAME TO \`page_contact\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_page_accueil\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text NOT NULL,
  	\`description\` text,
  	\`image_id\` integer,
  	\`countdown_label\` text NOT NULL,
  	\`countdown_done_label\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_accueil\`("id", "title", "intro", "description", "image_id", "countdown_label", "countdown_done_label", "updated_at", "created_at") SELECT "id", "title", "intro", "description", "image_id", "countdown_label", "countdown_done_label", "updated_at", "created_at" FROM \`page_accueil\`;`)
  await db.run(sql`DROP TABLE \`page_accueil\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_accueil\` RENAME TO \`page_accueil\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`page_accueil_image_idx\` ON \`page_accueil\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_page_historique\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_historique\`("id", "title", "intro", "description", "updated_at", "created_at") SELECT "id", "title", "intro", "description", "updated_at", "created_at" FROM \`page_historique\`;`)
  await db.run(sql`DROP TABLE \`page_historique\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_historique\` RENAME TO \`page_historique\`;`)
  await db.run(sql`CREATE TABLE \`__new_page_benevoles\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_benevoles\`("id", "title", "intro", "description", "updated_at", "created_at") SELECT "id", "title", "intro", "description", "updated_at", "created_at" FROM \`page_benevoles\`;`)
  await db.run(sql`DROP TABLE \`page_benevoles\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_benevoles\` RENAME TO \`page_benevoles\`;`)
  await db.run(sql`CREATE TABLE \`__new_page_boutique\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_boutique\`("id", "title", "intro", "description", "updated_at", "created_at") SELECT "id", "title", "intro", "description", "updated_at", "created_at" FROM \`page_boutique\`;`)
  await db.run(sql`DROP TABLE \`page_boutique\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_boutique\` RENAME TO \`page_boutique\`;`)
  await db.run(sql`CREATE TABLE \`__new_page_comite\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_comite\`("id", "title", "intro", "description", "updated_at", "created_at") SELECT "id", "title", "intro", "description", "updated_at", "created_at" FROM \`page_comite\`;`)
  await db.run(sql`DROP TABLE \`page_comite\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_comite\` RENAME TO \`page_comite\`;`)
  await db.run(sql`CREATE TABLE \`__new_page_sponsors\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_sponsors\`("id", "title", "intro", "description", "updated_at", "created_at") SELECT "id", "title", "intro", "description", "updated_at", "created_at" FROM \`page_sponsors\`;`)
  await db.run(sql`DROP TABLE \`page_sponsors\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_sponsors\` RENAME TO \`page_sponsors\`;`)
  await db.run(sql`CREATE TABLE \`__new_page_photos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_photos\`("id", "title", "intro", "description", "updated_at", "created_at") SELECT "id", "title", "intro", "description", "updated_at", "created_at" FROM \`page_photos\`;`)
  await db.run(sql`DROP TABLE \`page_photos\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_photos\` RENAME TO \`page_photos\`;`)
  await db.run(sql`CREATE TABLE \`__new_page_infos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_infos\`("id", "title", "intro", "description", "updated_at", "created_at") SELECT "id", "title", "intro", "description", "updated_at", "created_at" FROM \`page_infos\`;`)
  await db.run(sql`DROP TABLE \`page_infos\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_infos\` RENAME TO \`page_infos\`;`)
  await db.run(sql`CREATE TABLE \`__new_page_programme\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_programme\`("id", "title", "intro", "description", "updated_at", "created_at") SELECT "id", "title", "intro", "description", "updated_at", "created_at" FROM \`page_programme\`;`)
  await db.run(sql`DROP TABLE \`page_programme\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_programme\` RENAME TO \`page_programme\`;`)
  await db.run(sql`CREATE TABLE \`__new_page_billetterie\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_billetterie\`("id", "title", "intro", "description", "updated_at", "created_at") SELECT "id", "title", "intro", "description", "updated_at", "created_at" FROM \`page_billetterie\`;`)
  await db.run(sql`DROP TABLE \`page_billetterie\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_billetterie\` RENAME TO \`page_billetterie\`;`)
  await db.run(sql`CREATE TABLE \`__new_page_contact\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_contact\`("id", "title", "intro", "description", "updated_at", "created_at") SELECT "id", "title", "intro", "description", "updated_at", "created_at" FROM \`page_contact\`;`)
  await db.run(sql`DROP TABLE \`page_contact\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_contact\` RENAME TO \`page_contact\`;`)
}
