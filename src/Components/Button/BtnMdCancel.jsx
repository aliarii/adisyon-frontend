import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

const BtnMdCancel = ({ clickEvent, btnText }) => {
    const { t } = useTranslation();
    return (
        <div className='flex justify-center items-center w-24 h-8 gap-1 rounded-lg cursor-pointer text-light-1 bg-danger' onClick={clickEvent}>
            <h2>{btnText ? `${t(btnText)}` : `${t("Cancel")}`}</h2>
            <CloseIcon />
        </div>
    )
}

export default BtnMdCancel