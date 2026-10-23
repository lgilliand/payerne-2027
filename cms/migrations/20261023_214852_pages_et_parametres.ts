import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`page_accueil\` (
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
  await db.run(sql`CREATE INDEX \`page_accueil_image_idx\` ON \`page_accueil\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`page_benevoles\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`page_boutique\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`page_comite\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`page_sponsors\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`page_photos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`page_infos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`page_programme\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`page_billetterie\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`dates\` text DEFAULT 'Du 28 juillet au 1er août 2027' NOT NULL,
  	\`start_date\` text DEFAULT '2027-07-28T16:00:00.000Z' NOT NULL,
  	\`email\` text DEFAULT 'info@payerne2027.ch' NOT NULL,
  	\`president\` text DEFAULT 'Michaël Rapin' NOT NULL,
  	\`volunteer_url\` text DEFAULT 'https://benevoo.ch/manifestation-public/2d0d1e4c685c1539' NOT NULL,
  	\`shop_url\` text DEFAULT 'https://payerne2027.pay.strapnpay.ch/pay?tid=9f9c0eaa&appview=1&breakIframe=1' NOT NULL,
  	\`social_instagram\` text DEFAULT 'https://www.instagram.com/giron_payerne_2027/' NOT NULL,
  	\`social_facebook\` text DEFAULT 'https://www.facebook.com/p/Jeunesse-Payerne-100092482256925/' NOT NULL,
  	\`social_tiktok\` text DEFAULT 'https://www.tiktok.com/@giron.payerne.2027' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`page_accueil\`;`)
  await db.run(sql`DROP TABLE \`page_benevoles\`;`)
  await db.run(sql`DROP TABLE \`page_boutique\`;`)
  await db.run(sql`DROP TABLE \`page_comite\`;`)
  await db.run(sql`DROP TABLE \`page_sponsors\`;`)
  await db.run(sql`DROP TABLE \`page_photos\`;`)
  await db.run(sql`DROP TABLE \`page_infos\`;`)
  await db.run(sql`DROP TABLE \`page_programme\`;`)
  await db.run(sql`DROP TABLE \`page_billetterie\`;`)
  await db.run(sql`DROP TABLE \`settings\`;`)
}
