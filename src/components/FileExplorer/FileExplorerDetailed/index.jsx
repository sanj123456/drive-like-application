import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFoldersFromLocalStorage, saveFoldersToLocalStorage } from "utils/storage";
import "../fileExplorer.scss";
import { MenuIcon } from "assets/icons";
import { MdDelete, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import Modal from "components/common/Modals";
import FormControl from "components/common/FormControl";
import { GoFileDirectoryFill } from "react-icons/go";
import { FaFileLines } from "react-icons/fa6";
import { Button } from "components/common/Buttons";
import { AppContext } from "Context";

const FileExplorerDetailed = () => {
  const { id } = useParams();
  console.log(id, "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [modalOpen, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const fileFolders = getFoldersFromLocalStorage();
  const {showMenu,setShowMenu,folders, setFolders} = useContext(AppContext)
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFileClick = (file) => {
    console.log("File clicked:", file.name);
    setSelectedFile(file);
  };

  const deleteChildItem = (childId) => {
    const updatedFolders =
      folders &&
      folders.map((folder) => {
        if (folder.id === Number(id)) {
          const updatedChildren =
            folder.children &&
            folder.children.filter((child) => child.id !== childId);
          return { ...folder, children: updatedChildren };
        }
        return folder;
      });

    setFolders(updatedFolders || []);
    saveFoldersToLocalStorage(updatedFolders || []);
  };

  const renameChildItem = (childId, newName) => {
    const updatedFolders = folders.map((folder) => {
      if (folder.id === Number(id)) {
        const updatedChildren = folder.children.map((child) => {
          if (child.id === childId) {
            return { ...child, name: newName };
          }
          return child;
        });
        return { ...folder, children: updatedChildren };
      }
      return folder;
    });

    setFolders(updatedFolders);
    saveFoldersToLocalStorage(updatedFolders);
  };

  const handleFileDelete = (event, file) => {
    // if (selectedFile) {
    //   onFileDelete(selectedFile);
    //   setSelectedFile(null);
    // }
    event.stopPropagation(); // Stop event propagation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      deleteChildItem(file.id);
    }
  };

  const handleFileRename = () => {
    renameChildItem(selectedFile.id, inputValue);
    setOpenMenu(false);
    setOpenModal(false);
  };

  const openRenameModal = (file) => {
    setOpenModal(true);
  };

  const toggleDropdown = (event, file) => {
    event.stopPropagation();
    setOpenMenu(!openMenu);
    setSelectedFile(selectedFile === file ? null : file);
  };

  const handleFolderClick = (file) => {
    console.log(file, "File");

    if (id) {
      navigate(`/folder/${id}/${file.id}`);
    } else {
      console.log(file);
      navigate(`folder/${file.id}`);
    }
    // if (file.children && file.children.length > 0) {
    //   navigate(`/folder/${file.id}/${file.children[0].id}`);
    //   console.log("Folder clicked:", file);
    // } else {
    //   console.log("No children found for folder:", file);
    // }
  };

  const handleMenuToggle = (file) => {
    setOpenMenu(!openMenu);
    setSelectedFile(selectedFile === file ? null : file);
  };

  // Function to render a single file or folder
  const renderFileOrFolder = (item) => (
    <div
      key={item.id}
      onDoubleClick={() =>
        item.type === "folder" ? handleFolderClick(item) : handleFileClick(item)
      }
      className={`file ${
        selectedFile && selectedFile.id === item.id ? "selected" : ""
      }`}
    >
      <div className="file-folder">
        {item.type === "folder" ? (
          <span className="folder-icon">
            <GoFileDirectoryFill color="#f8d775" />
          </span>
        ) : (
          <span className="file-icon">
            <FaFileLines color="#f8d775" />
          </span>
        )}
        <span className="file-name">{item.name}</span>
      </div>
      <span className="menu-toggle" onClick={() => handleMenuToggle(item)}>
        <MenuIcon color="#5f6368" />
        {selectedFile && selectedFile.id === item.id && openMenu && (
          <ul className="dropdown-menu">
            <li onClick={() => setOpenModal(true)}>
              <MdOutlineDriveFileRenameOutline
                fill="#5f6368"
                onClick={() => setSelectedFile(item)}
              />
              Rename
            </li>
            <li onClick={(event) => handleFileDelete(event, item)}>
              <MdDelete fill="#5f6368" />
              Delete
            </li>
          </ul>
        )}
      </span>
    </div>
  );

  // Function to recursively render all files and folders
  const renderFilesAndFolders = (item) => {
    console.log(item, "ITEMS");
    if (item.children && item.children.length > 0) {
      return (
        <div className="files">
          {item.children.map((child) => renderFilesAndFolders(child))}
        </div>
      );
    } else {
      return renderFileOrFolder(item);
    }
  };

  // Find the selected item based on the provided ID
  const selectedItem = fileFolders.find((item) => item.id === parseInt(id));

  return (
    <div className="file-explorer">
      {selectedItem && renderFilesAndFolders(selectedItem)}
      <Modal
        title="Rename"
        isOpen={modalOpen}
        onClose={() => setOpenModal(false)}
      >
        <FormControl value={inputValue} onChange={handleInputChange} />
        <div className="modal-footer">
          <Button onClick={handleFileRename}>Save</Button>
        </div>
      </Modal>
    </div>
  );
};

export default FileExplorerDetailed;
