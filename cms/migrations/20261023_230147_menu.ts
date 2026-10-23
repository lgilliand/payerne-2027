import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // La case « Afficher dans le menu » des pages est remplacée par la fiche Menu :
  // on reprend les pages cochées, avant de supprimer la case. Page jamais enregistrée :
  // valeur par défaut de la case (cochée, sauf Historique).
  const pages = ['accueil', 'historique', 'benevoles', 'boutique', 'comite', 'contact', 'sponsors', 'photos', 'infos', 'programme', 'billetterie']
  const menuPages: string[] = []
  for (const page of pages) {
    const [row] = await db.all<{ show_in_menu: number | null }>(sql.raw(`SELECT show_in_menu FROM page_${page} LIMIT 1`))
    if (row ? Boolean(row.show_in_menu) : page !== 'historique') menuPages.push(page)
  }

  await db.run(sql`CREATE TABLE \`menu_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`page\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`menu\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`menu_items_order_idx\` ON \`menu_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`menu_items_parent_id_idx\` ON \`menu_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`menu\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`ALTER TABLE \`page_accueil\` DROP COLUMN \`show_in_menu\`;`)
  await db.run(sql`ALTER TABLE \`page_historique\` DROP COLUMN \`show_in_menu\`;`)
  await db.run(sql`ALTER TABLE \`page_benevoles\` DROP COLUMN \`show_in_menu\`;`)
  await db.run(sql`ALTER TABLE \`page_boutique\` DROP COLUMN \`show_in_menu\`;`)
  await db.run(sql`ALTER TABLE \`page_comite\` DROP COLUMN \`show_in_menu\`;`)
  await db.run(sql`ALTER TABLE \`page_sponsors\` DROP COLUMN \`show_in_menu\`;`)
  await db.run(sql`ALTER TABLE \`page_photos\` DROP COLUMN \`show_in_menu\`;`)
  await db.run(sql`ALTER TABLE \`page_infos\` DROP COLUMN \`show_in_menu\`;`)
  await db.run(sql`ALTER TABLE \`page_programme\` DROP COLUMN \`show_in_menu\`;`)
  await db.run(sql`ALTER TABLE \`page_billetterie\` DROP COLUMN \`show_in_menu\`;`)
  await db.run(sql`ALTER TABLE \`page_contact\` DROP COLUMN \`show_in_menu\`;`)

  await payload.updateGlobal({
    slug: 'menu',
    data: { items: menuPages.map((page) => ({ page: page as 'accueil' })) },
    req,
  })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`menu_items\`;`)
  await db.run(sql`DROP TABLE \`menu\`;`)
  await db.run(sql`ALTER TABLE \`page_accueil\` ADD \`show_in_menu\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`page_historique\` ADD \`show_in_menu\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`page_benevoles\` ADD \`show_in_menu\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`page_boutique\` ADD \`show_in_menu\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`page_comite\` ADD \`show_in_menu\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`page_sponsors\` ADD \`show_in_menu\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`page_photos\` ADD \`show_in_menu\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`page_infos\` ADD \`show_in_menu\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`page_programme\` ADD \`show_in_menu\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`page_billetterie\` ADD \`show_in_menu\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`page_contact\` ADD \`show_in_menu\` integer DEFAULT true;`)
}
