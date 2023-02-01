import Dexie from 'dexie';

const db = new Dexie('restDB');

db.version(1).stores({
  history: 'id, object, created_at',
  collections: 'id, object, folder',
  folder: 'id, name',
});

export { db };
