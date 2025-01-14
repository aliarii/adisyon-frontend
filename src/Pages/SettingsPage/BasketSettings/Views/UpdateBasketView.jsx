import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BtnMdDelete from '../../../../Components/Button/BtnMdDelete';
import BtnMdSave from '../../../../Components/Button/BtnMdSave';
import { deleteBasket, updateBasket } from '../../../../State/Basket/Action';
import { getCompanyById } from '../../../../State/Company/Action';
import BtnMdCancel from '../../../../Components/Button/BtnMdCancel';
import { useTranslation } from 'react-i18next';


const UpdateBasketView = ({ basket, handleCancel }) => {
    const { company } = useSelector((store) => store.company)
    const dispatch = useDispatch();

    const [basketName, setBasketName] = useState(basket.name);
    const { t } = useTranslation();

    const handleBasketUpdate = () => {
        const reqData = {
            jwt: localStorage.getItem('jwt'),
            data: {
                id: basket.id,
                name: basketName,
            }
        }
        console.log("reqData", reqData);

        dispatch(updateBasket(reqData))
            .then(() => dispatch(getCompanyById(company.id, localStorage.getItem('jwt'))))
            .then(() => setBasketName(''));
    }
    const handleBasketDelete = () => {
        const reqData = {
            jwt: localStorage.getItem('jwt'),
            data: {
                id: basket.id,
            }
        }
        console.log("reqData", reqData);

        dispatch(deleteBasket(reqData))
            .then(() => dispatch(getCompanyById(company.id, localStorage.getItem('jwt'))))
            .then(() => setBasketName(''));
    }
    const getBasketDisplayName = (basket) => {
        if (!basket)
            return;
        if (basket.customName !== null)
            return basket.customName;
        else {
            const [staticPart, dynamicPart] = basket.name.split(' ');
            return t(staticPart) + " " + dynamicPart;
        }
    }
    return (
        <div className='flex flex-col w-full h-full p-2 gap-2 rounded-lg bg-light-2 dark:bg-dark-7 overflow-auto'>
            <div className='flex justify-between items-end w-full min-h-8'>
                <h2>{t("Update")}: {getBasketDisplayName(basket)}</h2>
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
                        <BtnMdDelete clickEvent={handleBasketDelete} />
                        <BtnMdSave clickEvent={handleBasketUpdate} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UpdateBasketView