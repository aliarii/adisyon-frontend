import EditIcon from '@mui/icons-material/Edit';

import React from 'react';
import { useTranslation } from 'react-i18next';


const UsersTable = ({ company, handleEditClick }) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col h-full w-full rounded-md text-xs uppercase text-left overflow-auto">
            <div className="flex items-center min-h-10 w-full px-1 bg-light-5 dark:bg-dark-5 sticky top-0 z-10">
                <h2 className="w-20 text-center ">#</h2>
                <h2 className="w-full ">{t("Full Name")}</h2>
                <h2 className="w-full ">{t("Username")}</h2>
                <h2 className="w-20 ">{t("Edit")}</h2>
            </div>

            <div className="flex flex-col h-full w-full bg-light-7 dark:bg-dark-6 overflow-auto">
                {company?.employees.map((employee, idx) => (
                    <div key={employee.id} className="flex items-center min-h-8 w-full px-1 border-b dark:border-dark-7">
                        <h2 className="w-20 py-2 text-center">{idx + 1}</h2>
                        <h2 className="w-full py-2">{employee.fullName}</h2>
                        <h2 className="w-full py-2">{employee.userName}</h2>
                        <h2 className='w-20 py-2 text-center'>
                            <EditIcon className='cursor-pointer' onClick={() => handleEditClick(employee)} />
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UsersTable