import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { Template } from '@/types';

interface TemplateDB extends DBSchema {
  templates: {
    key: string;
    value: Template;
    indexes: { 'by-created': number };
  };
}

const DB_NAME = 'template-talk-db';
const STORE_NAME = 'templates';

let dbPromise: Promise<IDBPDatabase<TemplateDB>> | null = null;

function getDB(): Promise<IDBPDatabase<TemplateDB>> {
  if (!dbPromise) {
    dbPromise = openDB<TemplateDB>(DB_NAME, 1, {
      upgrade(db) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
        });
        store.createIndex('by-created', 'createdAt');
      },
    });
  }
  return dbPromise;
}

export async function getAllTemplates(): Promise<Template[]> {
  const db = await getDB();
  return db.getAllFromIndex(STORE_NAME, 'by-created');
}

export async function getTemplate(id: string): Promise<Template | undefined> {
  const db = await getDB();
  return db.get(STORE_NAME, id);
}

export async function saveTemplate(template: Template): Promise<void> {
  const db = await getDB();
  await db.put(STORE_NAME, template);
}

export async function deleteTemplate(id: string): Promise<void> {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}

export async function getTemplatesCount(): Promise<number> {
  const db = await getDB();
  return db.count(STORE_NAME);
}
