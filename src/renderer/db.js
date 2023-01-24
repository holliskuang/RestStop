import Dexie from 'dexie';

export default const db = new Dexie('restDB');

db.version(1).stores({
    history: 'id, created_at'
    collections: 'id, createdAt, name',
  });