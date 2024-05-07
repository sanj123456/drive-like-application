import { getFoldersFromLocalStorage } from "./storage";

export const getCurrentLocation = (path) => {
  const parts = path.split("/");
  const folderNames = [];

  const getLocalStorageData = getFoldersFromLocalStorage();

  parts.forEach((part) => {
    const folderId = parseInt(part);
    const folder = getLocalStorageData.find((item) => item.id === folderId);
    if (folder) {
      folderNames.push(folder);
    }
  });

  return folderNames;
};

export const generateItemName = (baseName, folders) => {
  let newName = baseName;
  let counter = 0;

  const names = new Set(folders.map((folder) => folder.name));

  while (names.has(newName)) {
    counter++;
    newName = `${baseName} (${counter})`;
  }
  return newName;
};

export function generateFolderNameChildren(baseName, folders, parentId) {
  let newName = baseName;
  let counter = 0;
  const parentFolder = folders.find((folder) => folder.id === parentId);

  if (parentFolder && parentFolder.children) {
    const childNames = new Set(
      parentFolder.children.map((child) => child.name)
    );

    while (childNames.has(newName)) {
      counter++;
      newName = `${baseName} (${counter})`;
    }
  }

  return newName;
}

export function Folder(name) {
  this.name = name;
  this.subFolder = [];
}
Folder.prototype.createFolder = function (folderName) {
  const newFolder = new Folder(folderName);
  this.subFolder.push(newFolder);
  return newFolder;
};
