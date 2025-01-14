import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyById, updateCompany } from '../../../State/Company/Action';
import BtnMdSave from '../../../Components/Button/BtnMdSave';
import { useTranslation } from 'react-i18next';
import { separateDateTime } from '../../../Utils/formatDate';

const CompanySettingsPage = () => {
    const { company } = useSelector((store) => store.company)
    const [companyName, setCompanyName] = useState('');
    const [companyNameError, setCompanyNameError] = useState('');
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        if (company)
            setCompanyName(company.name);
    }, [company])

    const handleNameChange = (event) => {
        const value = event.target.value;
        setCompanyName(value);
        setCompanyNameError("");
    }
    const handleCompanyUpdate = () => {

        const reqData = {
            jwt: localStorage.getItem('jwt'),
            data: {
                id: company.id,
                name: companyName
            }
        }
        if (companyName === '') {
            setCompanyNameError("Enter Company Name.");
        }
        else {
            dispatch(updateCompany(reqData))
                .then(() => dispatch(getCompanyById(company.id, localStorage.getItem('jwt'))));
        }
    }

    return (
        <div className='size-full bg-light-2 dark:bg-dark-7 rounded-lg overflow-auto'>

            <div className='flex flex-col w-full h-full p-2 gap-2 bg-light-2 dark:bg-dark-7 rounded-lg overflow-auto'>

                <div className='flex justify-between items-end w-full min-h-8'>
                    <h2>{t("Company")}</h2>
                </div>

                <div className='py-0.5 rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />

                <div className='flex flex-col w-full h-full gap-2 px-2 overflow-auto'>
                    <h2>{t("Company Name")}:</h2>
                    <input
                        type='text'
                        autoCapitalize='off'
                        className='w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8'
                        placeholder={`${t('Enter Company Name')}`}
                        name='categoryName'
                        value={companyName}
                        onChange={handleNameChange}
                    />
                    {companyNameError && <h2 className='-mt-2 text-sm text-red-500'>*{companyNameError}</h2>}
                    <h2>{t("Company Creation Date")}: {separateDateTime(company?.createdDate).date}</h2>
                    {company?.updatedDate && <h2>{t("Company Updated Date")}: {separateDateTime(company?.updatedDate).date}</h2>}

                    <h2>{t("Owner Name")}: {company?.owner.fullName}</h2>
                    <h2>{t("Owner Email")}: {company?.owner.email}</h2>
                    <h2>{t("Owner Created Date")}: {separateDateTime(company?.owner.createdDate).date}</h2>
                    <div className='flex justify-end w-full gap-2'>

                        <BtnMdSave clickEvent={handleCompanyUpdate} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanySettingsPage
