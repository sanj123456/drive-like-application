import React from "react";
import "./breadcrumbs.scss";
import { MdArrowForwardIos } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCurrentLocation } from "utils/helper";

const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const breadCrumbItems = getCurrentLocation(location.pathname);

  const handleNavigate = (index) => {
    // Navigate back to the specific breadcrumb item by index
    navigate(-index);
  };

  return (
    <div className="breadcrumbs flex items-center">
      <Link to="/">Home</Link> <MdArrowForwardIos />
      {breadCrumbItems.map((folder, index) => (
        <React.Fragment key={folder.id}>
          {index === breadCrumbItems.length - 1 ? (
            <span>{folder.name}</span>
          ) : (
            <span onClick={() => handleNavigate(index + 1)}>{folder.name}</span>
          )}
          {index < breadCrumbItems.length - 1 && <MdArrowForwardIos />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
