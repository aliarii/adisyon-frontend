import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

const BtnMdDelete = ({ clickEvent }) => {
    const { t } = useTranslation();
    return (
        <div className='flex justify-center items-center w-24 h-8 gap-1 rounded-lg cursor-pointer text-light-1 bg-danger' onClick={clickEvent}>
            <h2>{t("Delete")}</h2>
            <DeleteIcon />
        </div>
    )
}

export default BtnMdDelete