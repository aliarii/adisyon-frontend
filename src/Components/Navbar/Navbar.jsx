import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const Navbar = ({ openSideBar, setSideBar }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useTranslation();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="flex items-center justify-between z-[90] w-full p-2 rounded-xl bg-light-2 dark:bg-dark-7 text-dark-7 dark:text-light-7">
      <div className="flex items-center flex-none mr-3.5 mb-0 ">
        <div
          className={`flex items-center justify-center mr-3 min-w-11 min-h-11 w-11 h-11 text-center rounded-lg cursor-pointer bg-white dark:bg-dark-5 hover:bg-light-4 hover:dark:bg-light-5 hover:dark:text-dark-7`}
          onClick={() => setSideBar(!openSideBar)}
        >
          <MenuIcon />
        </div>

        <div className="text-lg font-medium">
          <h2>/ {t(capitalizeFirstLetter(currentPath.split("/")[2]))}</h2>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
