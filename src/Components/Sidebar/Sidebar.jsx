/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from '@mui/icons-material/Logout';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';

import { useSelector } from "react-redux";
// import logo_img from "../../assets/haki_logo.png";
import { useAuth } from "../../Auth/AuthContext";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ openSideBar, setSideBar }) => {
  const { logout } = useAuth();
  const { company } = useSelector((store) => store.company);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState("baskets");

  const sidebarItems = [
    { title: "Baskets", icon: <TableRestaurantIcon />, path: "baskets", permission: "READ_BASKET" },
    { title: "History", icon: <ReceiptIcon />, path: "history", permission: "READ_HISTORY" },
    { title: "Reports", icon: <InsertChartIcon />, path: "reports", permission: "READ_REPORT" },
    { title: "Records", icon: <YoutubeSearchedForIcon />, path: "records", permission: "READ_LOG" },
    { title: "Settings", icon: <SettingsIcon />, path: "settings", permission: "READ_SETTINGS" },
  ];

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const firstSection = pathSegments[1];
    setCurrent(firstSection || "baskets");
  }, [location]);

  // useEffect(() => {
  //   if (!localStorage.getItem('theme')) {
  //     localStorage.theme = 'light';
  //   }
  // }, [])

  const handleNavigate = (item) => {
    setCurrent(item.path);
    navigate(`/${item.path}`);
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    localStorage.theme = localStorage.theme === 'dark' ? 'light' : 'dark';
  };

  const hasPermission = (permission) => {
    if (user?.userPermissions?.includes("READ_ALL")) {
      return true; // User has full access
    }
    return user?.userPermissions?.includes(permission); // Check for specific permission
  };
  return (
    <div
      className={`fixed flex flex-col w-64 h-full px-2.5 pt-5 pb-3 z-[92] top-0 left-0 gap-5 overflow-x-hidden ${openSideBar ? "visible" : "hidden"} bg-light-1 dark:bg-dark-10 text-dark-7 dark:text-light-7`}
    >
      <div className="flex items-center justify-between w-full min-h-[60px] px-2 bg-light-2 dark:bg-dark-8 rounded-xl text-center ">
        <h1 className={`cursor-pointer font-medium text-xl overflow-hidden text-ellipsis ${!openSideBar && "scale-0"}`} onClick={() => handleNavigate(sidebarItems[0])}>
          {company ? company.name : "Loading..."}
        </h1>

        <div className="flex items-center justify-center gap-2">
          <button
            className="flex items-center justify-center cursor-pointer right-12 top-11 h-8 w-8 rounded-full hover:bg-light-4 hover:dark:bg-light-5 hover:dark:text-dark-7"
            onClick={() => toggleTheme()}
          >
            <div className=" flex dark:hidden">
              <DarkModeIcon />
            </div>
            <div className=" hidden dark:flex">
              <LightModeIcon />
            </div>
          </button>

          <button
            className="flex items-center justify-center cursor-pointer right-3 top-11 h-8 w-8 rounded-full hover:bg-light-4 hover:dark:bg-light-5 hover:dark:text-dark-7"
            onClick={() => setSideBar(!openSideBar)}
          >
            <CloseIcon />
          </button>
        </div>

      </div>

      {/* Nav Links */}
      <div className="flex flex-col w-full h-full p-2 bg-light-2 dark:bg-dark-8 rounded-xl gap-y-2 overflow-auto ">
        {sidebarItems.map((item, index) => (
          hasPermission(item.permission) && (
            <SidebarItem
              onClick={() => handleNavigate(item)}
              key={index}
              current={current}
              item={item}
              open={openSideBar}
            />
          )
        ))}

      </div>

      {/* Profile */}
      <div className="flex justify-between items-center w-full min-h-[60px] p-2 rounded-xl bg-light-2 dark:bg-dark-8 text-lg font-medium">
        <div className="flex justify-start items-center gap-2 cursor-pointer" onClick={() => handleNavigate({ path: "settings/profile" })}>
          <AccountCircleIcon />
          <h2 className="uppercase">{user ? user.fullName : "Loading..."}</h2>
        </div>
        <div className="flex items-center p-2 rounded-full cursor-pointer hover:bg-light-4 hover:dark:bg-light-5 hover:dark:text-dark-7" onClick={logout}>
          <LogoutIcon />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
