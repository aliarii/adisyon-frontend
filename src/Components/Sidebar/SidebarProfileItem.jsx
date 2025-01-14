import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from '@mui/icons-material/Logout';
import React from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../Auth/AuthContext";

const SidebarProfileItem = ({ onClick }) => {
    const { logout } = useAuth();
    const { user } = useSelector((state) => state.auth)

    return (
        <div className={"flex rounded-md cursor-default hover:bg-light-white text-lg justify-between items-center font-medium gap-x-4 "}>
            <div className="flex justify-start items-center gap-2 cursor-pointer" onClick={onClick}>
                <AccountCircleIcon />
                <h2 className="uppercase">{user ? user.fullName : "Loading..."}</h2>
            </div>
            <div className="flex items-center p-2 rounded-full cursor-pointer hover:bg-light-4 hover:dark:bg-light-5 hover:dark:text-dark-7" onClick={logout}>
                <LogoutIcon />
            </div>
        </div>
    );
};

export default SidebarProfileItem;
