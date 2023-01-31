import { db } from '../../../db';
import { useSelector, useDispatch } from 'react-redux';
import { useLiveQuery } from 'dexie-react-hooks';
import { setFolder } from 'renderer/state/currentReqRes';

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

async function deleteRequestsFromFolder() {
  const currentFolder = useSelector((state) => state.currentReqRes.folder);
  await db.collections.where('folder').equals(currentFolder).delete();
}

async function deleteCurrentFolder() {
  const currentFolder = useSelector((state) => state.currentReqRes.folder);
  await db.collections.where('folder').equals(currentFolder).delete();
  const folders = getFoldersFromDB();
  if (folders.length > 0) {
    dispatch(setFolder(folders[0]));
  } else {
    dispatch(setFolder(''));
  }
}

async function getFoldersFromDB() {
  const uniqueFolders = await db.collections.orderBy('folder').uniqueKeys();
  return uniqueFolders;
}

async function deleteRequestFromDB(id) {
    await db.collections.where('id').equals(id).delete();
}

export {
  saveRequestToDB,
  getRequestsFromDB,
  deleteCurrentFolder,
  deleteRequestsFromFolder,
};
