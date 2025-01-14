import React from "react";
import { useTranslation } from "react-i18next";

const SidebarItem = ({ onClick, current, item, open }) => {
  const { t } = useTranslation();
  return (
    <div>
      <div
        onClick={onClick}
        className={`flex rounded-xl p-2 cursor-pointer text-lg items-center font-medium gap-x-4 ${current === item.path.toLowerCase() ? "bg-light-4 text-dark-7 dark:bg-dark-7 dark:text-light-7" : ""} hover:bg-light-4 hover:dark:bg-dark-7 hover:dark:text-light-7`}>
        {item.icon}
        <h2 className={`${!open && "scale-0"}`}>
          {t(item.title)}
        </h2>
      </div>
    </div>
  );
};

export default SidebarItem;
