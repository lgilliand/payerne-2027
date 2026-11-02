import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`dates\` text DEFAULT 'Du 28 juillet au 1er août 2027' NOT NULL,
  	\`start_date\` text DEFAULT '2027-07-28T16:00:00.000Z' NOT NULL,
  	\`email\` text DEFAULT 'info@payerne2027.ch' NOT NULL,
  	\`president\` text DEFAULT 'Michaël Rapin' NOT NULL,
  	\`volunteer_url\` text DEFAULT 'https://benevoo.ch/manifestation-public/2d0d1e4c685c1539' NOT NULL,
  	\`shop_url\` text DEFAULT 'https://shop.strapnpay.ch/01a15df7-779d-7425-ab5f-0335f40a25d3?s=payerne-2027-vente-de-vin' NOT NULL,
  	\`social_instagram\` text DEFAULT 'https://www.instagram.com/giron_payerne_2027/' NOT NULL,
  	\`social_facebook\` text DEFAULT 'https://www.facebook.com/p/Jeunesse-Payerne-100092482256925/' NOT NULL,
  	\`social_tiktok\` text DEFAULT 'https://www.tiktok.com/@giron.payerne.2027' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_settings\`("id", "dates", "start_date", "email", "president", "volunteer_url", "shop_url", "social_instagram", "social_facebook", "social_tiktok", "updated_at", "created_at") SELECT "id", "dates", "start_date", "email", "president", "volunteer_url", "shop_url", "social_instagram", "social_facebook", "social_tiktok", "updated_at", "created_at" FROM \`settings\`;`)
  await db.run(sql`DROP TABLE \`settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_settings\` RENAME TO \`settings\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_settings\` (
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
  await db.run(sql`INSERT INTO \`__new_settings\`("id", "dates", "start_date", "email", "president", "volunteer_url", "shop_url", "social_instagram", "social_facebook", "social_tiktok", "updated_at", "created_at") SELECT "id", "dates", "start_date", "email", "president", "volunteer_url", "shop_url", "social_instagram", "social_facebook", "social_tiktok", "updated_at", "created_at" FROM \`settings\`;`)
  await db.run(sql`DROP TABLE \`settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_settings\` RENAME TO \`settings\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
}
