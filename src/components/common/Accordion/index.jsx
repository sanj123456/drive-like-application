import React, { useState } from "react";
import "./accordion.scss";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { GoFileDirectoryFill } from "react-icons/go";
import { FaFileLines } from "react-icons/fa6";

const Accordion = ({ title, children, itemType, navigation }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <div className="accordion-title" onClick={navigation}>
          {itemType === "folder" ? (
            <span className="folder-icon">
              <GoFileDirectoryFill color="#f8d775" />
            </span>
          ) : (
            <span className="file-icon">
              <FaFileLines color="#f8d775" />
            </span>
          )}
          {title}
        </div>
        <div className={`accordion-icon ${isOpen ? "open" : ""}`}>
          <MdOutlineKeyboardArrowDown />
        </div>
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default Accordion;
