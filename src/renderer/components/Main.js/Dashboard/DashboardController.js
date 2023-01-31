import { db } from '../../../db';
import { useSelector, useDispatch } from 'react-redux';

async function saveRequestToDB(id, request, folder) {
  await db.collections.add({ id: request.id, object: request, folder: folder });
}

async function getRequestsFromDB() {
  const currentFolder = useSelector((state) => state.currentFolder.folder);
  const requests = await db.collections
    .where('folder')
    .equals(currentFolder)
    .toArray();
  return requests;
}
async function deleteCurrentRequest() {
  const currentFolder = useSelector((state) => state.currentFolder.folder);
  await db.collections.where.folder.equals(currentFolder).delete();
}

async function getFoldersFromDB() {
  let uniqueFolders = [];
  const requests = await db.collections.toArray();
  const folders = requests.map((request) => request.folder);
  folders.map((folder) => {
    if (!uniqueFolders.includes(folder)) {
      uniqueFolders.push(folder);
    }
  });
  return uniqueFolders;
}

export { saveRequestToDB, getRequestsFromDB, deleteCurrentRequest };
