import { fbStore } from "../data/firebase/fire_store";

const collectionName = "users";

const createOne = async ({ uid, name, email }) => {
  const result = await fbStore.createOne({
    collectionName,
    id: uid,
    data: { name, email },
  });

  if (result.error) {
    console.log({ error: result.error });
  }

  return result;
};

const updateOne = async ({ uid, name, email }) => {
  const result = await fbStore.updateOne({
    collectionName,
    id: uid,
    data: { name, email },
  });

  if (result.error) {
    console.log({ error: result.error });
  }

  return result;
};

const deleteOne = async ({ uid }) => {
  const result = await fbStore.deleteOne({
    collectionName,
    id: uid,
  });

  if (result.error) {
    return { error: result.error };
  }

  return result;
};

const getOne = async ({ uid }) => {
  const result = await fbStore.getOneDoc({ collectionName, id: uid });

  if (result.error) {
    return result;
  }

  return result;
};

export const users = {
  createOne: createOne,
  updateOne: updateOne,
  deleteOne: deleteOne,
  getOne: getOne,
};
