import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BtnMdSave from '../../../../Components/Button/BtnMdSave';
import { createBasket } from '../../../../State/Basket/Action';
import { getCompanyById } from '../../../../State/Company/Action';
import BtnMdCancel from '../../../../Components/Button/BtnMdCancel';
import { useTranslation } from 'react-i18next';


const AddNewBasketView = ({ id, name, handleCancel }) => {
    const { company } = useSelector((store) => store.company)
    const dispatch = useDispatch();
    const [basketName, setBasketName] = useState('');
    const { t } = useTranslation();


    const handleBasketSave = () => {
        const reqData = {
            jwt: localStorage.getItem('jwt'),
            data: {
                name: basketName,
                company: company,
                basketCategoryId: name === "All Products" ? null : id,
            }
        }
        console.log("reqData", reqData);

        dispatch(createBasket(reqData))
            .then(() => dispatch(getCompanyById(company.id, localStorage.getItem('jwt'))))
            .then(() => setBasketName(''));
    }
    return (
        <div className='flex flex-col w-full h-full p-2 gap-2 rounded-lg bg-light-2 dark:bg-dark-7 overflow-auto'>
            <div className='flex justify-between items-end w-full min-h-8'>
                <h2>{t("Add New Basket")}</h2>
                <BtnMdCancel clickEvent={() => handleCancel()} />
            </div>

            <div className='py-0.5 rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />

            <div className='flex flex-col w-full h-full overflow-auto'>
                <div className='flex flex-col w-full h-full gap-2 px-2 pb-2 overflow-auto'>
                    <h2>{t("Basket Name")}:</h2>
                    <input
                        type='text'
                        autoCapitalize='off'
                        className='w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8'
                        placeholder={t('Enter Basket Name')}
                        name='basketName'
                        value={basketName}
                        onChange={(e) => setBasketName(e.target.value)}
                    />
                    <div className='flex justify-end w-full gap-2'>
                        <BtnMdSave clickEvent={handleBasketSave} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewBasketView