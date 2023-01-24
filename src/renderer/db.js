import Dexie from 'dexie';

export const db = new Dexie('restDB');

db.version(1).stores({
    history: 'id, created_at'
  });