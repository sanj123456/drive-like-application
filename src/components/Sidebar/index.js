import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import "./sidebar.scss";
import { Button } from "components/common/Buttons";
import { AiOutlineFileAdd, AiOutlineFolderAdd } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { GoFileDirectoryFill } from "react-icons/go";
import { FaFileLines } from "react-icons/fa6";
import Accordion from "components/common/Accordion";

const Sidebar = ({
  folders,
  onCreateFile,
  onCreateFolder,
  showMenu,
  toggleMenu,
}) => {
  const handleCreateFolder = () => {
    onCreateFolder();
    toggleMenu();
  };
  const navigate = useNavigate();
  const handleCreateFile = () => {
    onCreateFile();
    toggleMenu();
  };
  const handleNavigate = (data) => {
    navigate(`/folder/${data}`);
  };
  return (
    <div className="side-nav">
      <div className="add-new sidebar-item">
        <Button className="uploader-button" onClick={toggleMenu}>
          <CiCirclePlus /> New
        </Button>
        {showMenu && (
          <ul className="dropdown-menu">
            <li onClick={handleCreateFolder}>
              <label>
                <AiOutlineFolderAdd />
                New Folder
              </label>
            </li>
            <li onClick={handleCreateFile}>
              <label htmlFor="file-upload">
                <AiOutlineFileAdd /> File Create
              </label>
            </li>
          </ul>
        )}
      </div>
      <ul className="directories">
        {folders &&
          folders.map((folder) => (
            <li key={folder.id} className="sidebar-item">
              {folder.type === "folder" && folder.children.length > 0 ? (
                <Accordion
                  title={folder.name}
                  itemType={folder.type}
                  navigation={() => handleNavigate(folder.id)}
                >
                  <div className="accordion-body">
                    {folder.children.map((val, i) => (
                      <Link to={`/folder/${val.id}`} key={i}>
                        <div className="sub-item">
                          {val.type === "folder" ? (
                            <span className="folder-icon">
                              <GoFileDirectoryFill color="#f8d775" />
                            </span>
                          ) : (
                            <span className="file-icon">
                              <FaFileLines color="#f8d775" />
                            </span>
                          )}
                          {val.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </Accordion>
              ) : (
                <Link to={`/folder/${folder.id}`}>
                  {folder.type === "folder" ? (
                    <span className="folder-icon">
                      <GoFileDirectoryFill color="#f8d775" />
                    </span>
                  ) : (
                    <span className="file-icon">
                      <FaFileLines color="#f8d775" />
                    </span>
                  )}
                  {folder.name}
                </Link>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
