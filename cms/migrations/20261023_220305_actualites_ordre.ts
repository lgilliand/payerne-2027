import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'
import { generateNKeysBetween } from 'payload/shared'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`articles\` ADD \`_order\` text;`)
  await db.run(sql`CREATE INDEX \`articles__order_idx\` ON \`articles\` (\`_order\`);`)
  await db.run(sql`ALTER TABLE \`_articles_v\` ADD \`version__order\` text;`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version__order_idx\` ON \`_articles_v\` (\`version__order\`);`)

  // Les actualités existantes gardent l'ordre d'avant (de la plus récente à la plus ancienne),
  // avant la suppression de leur date
  const articles = await db.all<{ id: number }>(sql`SELECT id FROM articles ORDER BY published_at DESC`)
  const keys = generateNKeysBetween(null, null, articles.length)
  for (const [i, { id }] of articles.entries()) {
    await db.run(sql`UPDATE articles SET _order = ${keys[i]} WHERE id = ${id}`)
    await db.run(sql`UPDATE _articles_v SET version__order = ${keys[i]} WHERE parent_id = ${id}`)
  }

  await db.run(sql`ALTER TABLE \`articles\` DROP COLUMN \`published_at\`;`)
  await db.run(sql`ALTER TABLE \`_articles_v\` DROP COLUMN \`version_published_at\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`articles__order_idx\`;`)
  await db.run(sql`ALTER TABLE \`articles\` ADD \`published_at\` text;`)
  await db.run(sql`ALTER TABLE \`articles\` DROP COLUMN \`_order\`;`)
  await db.run(sql`DROP INDEX \`_articles_v_version_version__order_idx\`;`)
  await db.run(sql`ALTER TABLE \`_articles_v\` ADD \`version_published_at\` text;`)
  await db.run(sql`ALTER TABLE \`_articles_v\` DROP COLUMN \`version__order\`;`)
}
