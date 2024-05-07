import React, { useEffect, useState, useRef, useContext } from "react";
import "./fileExplorer.scss";
import { MenuIcon } from "assets/icons";
import { FaFileLines } from "react-icons/fa6";
import { MdDelete, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import Modal from "components/common/Modals";
import FormControl from "components/common/FormControl";
import { getFoldersFromLocalStorage, saveFoldersToLocalStorage } from "utils/storage";
import { useNavigate, useParams } from "react-router-dom";
import { GoFileDirectoryFill } from "react-icons/go";
import { Button } from "components/common/Buttons";
import { AppContext } from "Context";
const FileExplorer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { id } = useParams();
  const [openMenu, setOpenMenu] = useState(false);
  const [modalOpen, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState();
  const filesFolders = getFoldersFromLocalStorage();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const {showMenu,setShowMenu,folders, setFolders} = useContext(AppContext)

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    // if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    //   setSelectedFile(null);
    // }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFolderClick = (file) => {
    if (id) {
      navigate(`/folder/${id}/${file.id}`);
    } else {
      console.log(file);
      navigate(`folder/${file.id}`);
    }
  };

  const handleFileClick = (file) => {
    console.log("File clicked:", file.name);
    setSelectedFile(file);
  };
  console.log(selectedFile, "SELECTED FILE");

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
      deleteItem(file.id);
    }
  };

  const deleteItem = (id) => {
    const updatedFolders = folders.filter((item) => item.id !== id);
    setFolders(updatedFolders);
    saveFoldersToLocalStorage(updatedFolders);
  };

  const renameItem = (id, newName) => {
    const updatedFolders = folders.map((item) => {
      if (item.id === id) {
        return { ...item, name: newName };
      }
      return item;
    });
    setFolders(updatedFolders);
    saveFoldersToLocalStorage(updatedFolders);
  };

  const handleFileRename = () => {
    renameItem(selectedFile.id, inputValue);
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

  return (
    <div
      className={`file-explorer ${
        filesFolders.length === 0
          ? "h-100 flex justify-center items-center"
          : ""
      }`}
    >
      {filesFolders.length === 0 && (
        <div className="h-100 flex justify-center items-center">
          No files currently
        </div>
      )}
      {filesFolders.length > 0 && (
        <div className="files">
          {filesFolders.map((file) => (
            <div
              key={file.id}
              onDoubleClick={() =>
                file.type === "folder"
                  ? handleFolderClick(file)
                  : handleFileClick(file)
              }
              className={`file ${
                selectedFile && selectedFile.id === file.id ? "selected" : ""
              }`}
            >
              <div className="folder-file">
                {file.type === "folder" ? (
                  <span className="folder-icon">
                    <GoFileDirectoryFill color="#f8d775" />
                  </span>
                ) : (
                  <span className="file-icon">
                    <FaFileLines color="#f8d775" />
                  </span>
                )}
                <span className="file-name">{file.name}</span>
              </div>
              <span
                ref={dropdownRef}
                className="menu-toggle"
                onClick={(event) => toggleDropdown(event, file)}
              >
                <MenuIcon color="#5f6368" />
                {selectedFile && selectedFile.id === file.id && openMenu && (
                  <ul className="dropdown-menu">
                    <li onClick={() => openRenameModal(file)}>
                      <MdOutlineDriveFileRenameOutline
                        fill="#5f6368"
                        onClick={() => setSelectedFile(file)}
                      />
                      Rename
                    </li>
                    <li onClick={(event) => handleFileDelete(event, file)}>
                      <MdDelete fill="#5f6368" />
                      Delete
                    </li>
                  </ul>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
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

export default FileExplorer;
