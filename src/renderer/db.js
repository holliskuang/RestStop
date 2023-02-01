import { unstable_useId } from '@mui/material';
import Dexie from 'dexie';
import { v4 as uuidv4 } from 'uuid';

const db = new Dexie('restDB');


db.version(1).stores({
  history: 'id, object, created_at',
  collections: 'id, object, folder',
  folder: 'id, name',
});
db.on('populate', (a) => {
  // Use provided transaction to populate database with initial data
  a.folder.add({ id: 1 , name: 'Home Folder' });
});

export { db };
