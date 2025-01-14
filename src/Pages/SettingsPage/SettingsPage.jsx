import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanySettingsPage from "./CompanySettings/CompanySettingsPage";
import ProductSettingsPage from "./ProductSettings/ProductSettingsPage";
import BasketSettingsPage from "./BasketSettings/BasketSettingsPage";
import UserSettingsPage from "./UserSettings/UserSettingsPage";
import ProfileSettingsPage from "./ProfileSettings/ProfileSettingsPage";
import { useTranslation } from "react-i18next";

const settingsPages = [
  {
    name: "Company Settings",
    element: <CompanySettingsPage />,
    path: "company",
  },
  {
    name: "Product Settings",
    element: <ProductSettingsPage />,
    path: "product",
  },
  { name: "Basket Settings", element: <BasketSettingsPage />, path: "basket" },
  { name: "User Settings", element: <UserSettingsPage />, path: "user" },
  {
    name: "Profile Settings",
    element: <ProfileSettingsPage />,
    path: "profile",
  },
];

const SettingsPage = ({ settingsIndex }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setSelectedSettingsPage(settingsPages[settingsIndex]);
  }, [settingsIndex]);

  const [selectedSettingsPage, setSelectedSettingsPage] = useState(
    settingsPages[0]
  );

  const handleNavigate = (settings) => {
    setSelectedSettingsPage(settings);
    navigate(`/adisyon-frontend/settings/${settings.path}`);
  };
  return (
    <div className="flex flex-col md:flex-row w-full h-full mb-3 gap-2 overflow-auto rounded-xl text-lg font-medium text-dark-7 dark:text-light-7">
      <div className="flex flex-col w-full md:w-[calc(20%)] min-w-36 p-2 bg-light-2 dark:bg-dark-7 rounded-lg overflow-auto ">
        <h2 className="hidden md:block py-1">{t("Settings")}</h2>
        <div className="hidden md:block my-1 py-0.5 rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10" />

        <div className="flex flex-row md:flex-col h-full">
          {settingsPages.map((item, index) => (
            <div
              className={`flex justify-between items-center py-2 cursor-pointer rounded-lg ${
                selectedSettingsPage?.name === item.name
                  ? "bg-light-4 dark:bg-dark-5"
                  : ""
              }`}
              key={index}
              onClick={() => handleNavigate(item)}
            >
              <h2 className="mr-2 md:mr-0 ml-2 whitespace-nowrap overflow-hidden text-ellipsis">
                {t(item.name)}
              </h2>
              {selectedSettingsPage?.name === item.name && (
                <div className="hidden md:inline-flex justify-center">
                  <ChevronRightIcon />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col h-full w-full md:w-[calc(80%)] gap-2 text-lg font-medium text-dark-7 dark:text-light-7 overflow-auto">
        <div className="hidden md:flex justify-between items-center w-full p-2 bg-light-2 dark:bg-dark-7 rounded-lg">
          <h2 className="whitespace-nowrap">{t(selectedSettingsPage?.name)}</h2>
        </div>
        <div className="flex flex-col size-full overflow-auto">
          {selectedSettingsPage?.element}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
