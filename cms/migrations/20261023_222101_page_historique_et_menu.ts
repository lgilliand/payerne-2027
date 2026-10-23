import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // La page Histoire, jamais remplie, est remplacée par la page Historique
  await db.run(sql`DROP TABLE IF EXISTS \`page_histoire\`;`)
  await db.run(sql`CREATE TABLE \`page_historique\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text NOT NULL,
  	\`show_in_menu\` integer DEFAULT false,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`ALTER TABLE \`page_accueil\` ADD \`show_in_menu\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`page_benevoles\` ADD \`show_in_menu\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`page_boutique\` ADD \`show_in_menu\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`page_comite\` ADD \`show_in_menu\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`page_sponsors\` ADD \`show_in_menu\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`page_photos\` ADD \`show_in_menu\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`page_infos\` ADD \`show_in_menu\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`page_programme\` ADD \`show_in_menu\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`page_billetterie\` ADD \`show_in_menu\` integer DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`page_histoire\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`DROP TABLE \`page_historique\`;`)
  await db.run(sql`ALTER TABLE \`page_accueil\` DROP COLUMN \`show_in_menu\`;`)
  await db.run(sql`ALTER TABLE \`page_benevoles\` DROP COLUMN \`show_in_menu\`;`)
  await db.run(sql`ALTER TABLE \`page_boutique\` DROP COLUMN \`show_in_menu\`;`)
  await db.run(sql`ALTER TABLE \`page_comite\` DROP COLUMN \`show_in_menu\`;`)
  await db.run(sql`ALTER TABLE \`page_sponsors\` DROP COLUMN \`show_in_menu\`;`)
  await db.run(sql`ALTER TABLE \`page_photos\` DROP COLUMN \`show_in_menu\`;`)
  await db.run(sql`ALTER TABLE \`page_infos\` DROP COLUMN \`show_in_menu\`;`)
  await db.run(sql`ALTER TABLE \`page_programme\` DROP COLUMN \`show_in_menu\`;`)
  await db.run(sql`ALTER TABLE \`page_billetterie\` DROP COLUMN \`show_in_menu\`;`)
}
