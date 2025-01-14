import SaveIcon from '@mui/icons-material/Save';
import React from 'react';
import { useTranslation } from 'react-i18next';

const BtnMdSave = ({ clickEvent }) => {
    const { t } = useTranslation();
    return (
        <div className='flex justify-center items-center w-24 h-8 gap-1 rounded-lg cursor-pointer text-light-1 bg-success' onClick={clickEvent}>
            <h2>{t("Save")}</h2>
            <SaveIcon />
        </div>
    )
}

export default BtnMdSave