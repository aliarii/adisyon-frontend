import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UserDetailsView from './Views/UserDetailsView';
import AddNewUserView from './Views/AddNewUserView';
import UsersTable from './Views/UsersTable';
import { useTranslation } from 'react-i18next';


const UserSettingsPage = () => {
    const { company } = useSelector((store) => store.company)
    const { t } = useTranslation();

    const handleCancelClick = () => {
        setCurrentView(views[0]({ fullName: undefined, userName: undefined, }));
    }
    const views = [
        (employee) => <UserDetailsView {...employee} handleCancelClick={handleCancelClick} />,
        () => <AddNewUserView handleCancelClick={handleCancelClick} />
    ]

    const [currentView, setCurrentView] = useState(views[0]);

    const handleEditClick = (employee) => {
        setCurrentView(views[0](employee));
    }

    const handleNewUserClick = () => {
        setCurrentView(views[1]);
    }
    return (

        <div className='flex flex-col md:flex-row w-full h-full gap-2 overflow-auto'>

            <div className='flex flex-col w-full h-full p-2 gap-2 rounded-lg bg-light-2 dark:bg-dark-7 overflow-auto'>
                <div className='hidden md:flex justify-between items-end w-full min-h-8'>
                    <h2>{t("Users")}</h2>
                </div>

                <div className='hidden md:block py-0.5 rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />

                <div className='flex flex-col w-full h-full gap-2 overflow-auto'>
                    <h2 className={`text-center rounded-md cursor-pointer text-light-1 bg-success`} onClick={handleNewUserClick}>+ {t("Add New User")}</h2>
                    <UsersTable company={company} handleEditClick={handleEditClick} />

                </div>
            </div>
            {currentView}
        </div>
    )
}

export default UserSettingsPage






