import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';

const BtnMdEdit = ({ clickEvent }) => {
    const { t } = useTranslation();
    return (
        <div className='flex justify-center items-center w-24 h-8 gap-1 rounded-lg cursor-pointer text-light-1 bg-info' onClick={clickEvent}>
            <h2>{t("Edit")}</h2>
            <EditIcon />
        </div>
    )
}

export default BtnMdEdit