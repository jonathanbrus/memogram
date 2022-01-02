import { fbStore } from "../data/firebase/fire_store";
import { fireStorage } from "../data/firebase/fire_storage";

const collectionName = "posts";

const createOne = async ({ uid, title, caption, images, tags }) => {
  const { urls } = await fireStorage.uploadFiles({ files: images });

  const result = await fbStore.createOneAutoId({
    collectionName,
    data: { uid, title, caption, images: urls, tags, favorite: false },
  });

  if (result.error) {
    console.log({ error: result.error });
  }

  return result;
};

const updateOne = async ({ id, title, caption, images, tags, favorite }) => {
  const result = await fbStore.updateOne({
    collectionName,
    id: id,
    data: { title, caption, images, tags, favorite },
  });

  if (result.error) {
    console.log({ error: result.error });
  }

  return result;
};

const deleteOne = async ({ id }) => {
  const result = await fbStore.deleteOne({
    collectionName,
    id: id,
  });

  if (result.error) {
    console.log({ error: result.error });
  }

  return result;
};

const getAll = async ({ uid }) => {
  const result = await fbStore.getDocsByUid({ collectionName, uid: uid });

  if (result.error) {
    console.log({ error: result.error });
  }

  return { posts: result.docs };
};

export const postsSerice = {
  createOne: createOne,
  updateOne: updateOne,
  deleteOne: deleteOne,
  getAll: getAll,
};
