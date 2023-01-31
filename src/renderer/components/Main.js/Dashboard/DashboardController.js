import { db } from '../../../db';
import { useSelector, useDispatch } from 'react-redux';
import { useLiveQuery } from 'dexie-react-hooks';

async function saveRequestToDB(id, request, folder) {
  await db.collections.add({ id: request.id, object: request, folder: folder });
}

async function getRequestsFromDB() {
  const currentFolder = useSelector((state) => state.currentReqRes.folder);
  const requests = useLiveQuery(async () => {
    return await db.collections.where('folder').equals(currentFolder).toArray();
  });
  return requests;
}

async function deleteCurrentRequest() {
  const currentFolder = useSelector((state) => state.currentReqRes.folder);
  await db.collections.where.folder.equals(currentFolder).delete();
}

async function getFoldersFromDB() {
  const uniqueFolders = await db.collections.orderBy('folder').uniqueKeys();
  return uniqueFolders;
}

export {  saveRequestToDB, getRequestsFromDB, deleteCurrentRequest };
