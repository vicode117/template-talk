import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { CalendarEvent } from '@/types';

interface CalendarDB extends DBSchema {
  'calendar-events': {
    key: string;
    value: CalendarEvent;
    indexes: { 'by-date': string; 'by-created': number };
  };
}

const DB_NAME = 'roses-toolbox-calendar-db';
const STORE_NAME = 'calendar-events';

let dbPromise: Promise<IDBPDatabase<CalendarDB>> | null = null;

function getDB(): Promise<IDBPDatabase<CalendarDB>> {
  if (!dbPromise) {
    dbPromise = openDB<CalendarDB>(DB_NAME, 1, {
      upgrade(db) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('by-date', 'date');
        store.createIndex('by-created', 'createdAt');
      },
    });
  }
  return dbPromise;
}

export async function getAllEvents(): Promise<CalendarEvent[]> {
  const db = await getDB();
  return db.getAllFromIndex(STORE_NAME, 'by-date');
}

export async function getEventsByDate(date: string): Promise<CalendarEvent[]> {
  const db = await getDB();
  return db.getAllFromIndex(STORE_NAME, 'by-date', date);
}

export async function getEvent(id: string): Promise<CalendarEvent | undefined> {
  const db = await getDB();
  return db.get(STORE_NAME, id);
}

export async function saveEvent(event: CalendarEvent): Promise<void> {
  const db = await getDB();
  await db.put(STORE_NAME, event);
}

export async function deleteEvent(id: string): Promise<void> {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}
