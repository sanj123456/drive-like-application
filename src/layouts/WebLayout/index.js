import Breadcrumbs from "components/BreadCrumbs";
import Sidebar from "components/Sidebar";
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  getFoldersFromLocalStorage,
  saveFoldersToLocalStorage,
} from "utils/storage";
import "./layout.scss";
import { useParams } from "react-router-dom";
import {
  Folder,
  generateFolderNameChildren,
  generateItemName,
} from "utils/helper";
import { AppContext } from "Context";

const WebLayout = ({ children }) => {
  const { id } = useParams();
  const folder = new Folder("root");
  const {showMenu,setShowMenu,folders, setFolders} = useContext(AppContext)
  // const [folders, setFolders] = useState([]);
  const [navbarHeight, setNavHeight] = useState(null);
  // const [showMenu, setShowMenu] = useState(false);

  const navbarRef = useRef();
  useEffect(() => {
    const storedFolders = getFoldersFromLocalStorage();
    setFolders(storedFolders);
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const createFile = () => {
    const baseName = "New File";
    const storedFiles =
      folders.find((folder) => folder.id === Number(id))?.children || [];
    const newFileName = generateItemName(baseName, storedFiles);

    const newFile = { id: Date.now(), name: newFileName, type: "file" };
    if (id) {
      const updatedFolders = folders.map((folder) => {
        if (folder.id === Number(id)) {
          return { ...folder, children: [...(folder.children || []), newFile] };
        }
        return folder;
      });
      setFolders(updatedFolders);
      saveFoldersToLocalStorage(updatedFolders);
    } else {
      setFolders([...folders, newFile]);
      saveFoldersToLocalStorage([...folders, newFile]);
    }
    toggleMenu();
  };

  const createFolder = () => {
    const baseName = "New Folder";
    const storedFolders = getFoldersFromLocalStorage();
    const newFolderName = id ?? generateItemName(baseName, storedFolders);
    const newFolderNameChildren =
      id && generateFolderNameChildren(baseName, storedFolders, Number(id));

    const newFolder = {
      id: Date.now(),
      name: newFolderName,
      type: "folder",
      children: [],
    };
    if (id) {
      const childFolder = {
        id: Date.now(),
        name: newFolderNameChildren,
        type: "folder",
        children: [], // Nested folder can have its own children
      };
      const updatedFolders = storedFolders.map((folder) => {
        if (folder.id === Number(id)) {
          return { ...folder, children: [...folder.children, childFolder] };
        }
        return folder;
      });

      setFolders(updatedFolders);
      saveFoldersToLocalStorage(updatedFolders);
    } else {
      setFolders([...folders, newFolder]);
      saveFoldersToLocalStorage([...folders, newFolder]);
    }
    toggleMenu();
  };

  

  

  

  useEffect(() => {
    if (navbarRef.current) {
      const height = navbarRef.current.clientHeight;
      setNavHeight(height);
    }
  }, [navbarHeight]);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (child.type.name === "FileExplorer") {
      return React.cloneElement(child, {
        folders: folders,
      });
    } else if (child.type.name === "FileExplorerDetailed") {
      return React.cloneElement(child, {
        folders: folders,
      });
    }
    return child;
  });

  return (
    <React.Fragment>
      <header className="header" ref={navbarRef}>
        <Breadcrumbs />
      </header>
      <div
        className="app-layout"
        style={{
          marginTop: `${navbarHeight}px`,
          height: `calc(100vh - ${navbarHeight}px)`,
        }}
      >
        <aside className="sidebar">
          <Sidebar
            folders={folders}
            onCreateFolder={createFolder}
            onCreateFile={createFile}
            showMenu={showMenu}
            toggleMenu={toggleMenu}
          />
        </aside>
        <main className="main-layout">{childrenWithProps}</main>
      </div>
    </React.Fragment>
  );
};

export default WebLayout;
