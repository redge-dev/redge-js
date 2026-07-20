import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const resource = pgTable('resource', {
  id: text('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const attribute = pgTable('attribute', {
  id: text('id').primaryKey(),
  type: varchar('type', { length: 50 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const policy = pgTable('policy', {
  id: text('id').primaryKey(),
  type: varchar('type', { length: 50 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
