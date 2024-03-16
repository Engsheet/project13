export const getPbImageURL = (item, fileName) =>
  `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${item.id}/${fileName}`;
