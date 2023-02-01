import { db } from '../../../db';
import { useSelector, useDispatch } from 'react-redux';
import { useLiveQuery } from 'dexie-react-hooks';
import { setFolder } from 'renderer/state/currentReqRes';
import { v4 as uuid } from 'uuid';
import { setFolder } from '../../../currentReqRes';
import moment from 'moment';

async function saveRequestToDB(id, request, folder) {
  await db.collections.add({ id: request.id, object: request, folder: folder });
  await db.history.add({
    id: request.id,
    object: request,
    created_at: moment().format('ddd, h:mm A'),
  });
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
  return await db.collections.where('folder').equals(currentFolder).delete();
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
  const uniqueFolders = await db.folder.toArray();
  return uniqueFolders;
}

async function deleteRequestFromDB(id) {
  await db.collections.where('id').equals(id).delete();
}

async function addFolderToDB(name) {
  const id = uuid();
  await db.folder.add({ id: id, name: name });
}
export {
  saveRequestToDB,
  getRequestsFromDB,
  deleteCurrentFolder,
  deleteRequestsFromFolder,
  addFolderToDB,
  getFoldersFromDB,
};
