import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initApp } from "./index";

initApp();

const storage = getStorage();

const uploadFiles = async ({ files }) => {
  let urls = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    let storageRef = ref(storage, file.name);

    const result = await uploadBytes(storageRef, file);

    urls.push(await getDownloadURL(result.ref));
  }

  return { urls };
};

export const fireStorage = {
  uploadFiles: uploadFiles,
};
