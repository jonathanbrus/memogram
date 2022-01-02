export const trimName = (name) => {
  const index = name.indexOf(" ");

  return index !== -1 ? name.substring(0, index) : name;
};
