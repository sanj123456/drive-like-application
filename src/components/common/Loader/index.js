import React, { useState, useEffect } from "react";

export const Loader = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return showLoader ? <div className="loader"></div> : null;
};
