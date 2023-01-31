import Dexie from 'dexie';

const db = new Dexie('restDB');

db.version(1).stores({
  history: 'id, created_at',
  collections: 'id, object, folder',
});

export { db };
