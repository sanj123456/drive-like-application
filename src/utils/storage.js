export const saveFoldersToLocalStorage = (folders) => {
  localStorage.setItem("folders", JSON.stringify(folders));
};

export const getFoldersFromLocalStorage = () => {
  const folders = localStorage.getItem("folders");
  return folders ? JSON.parse(folders) : [];
};
