import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BtnMdDelete from '../../../../Components/Button/BtnMdDelete';
import BtnMdSave from '../../../../Components/Button/BtnMdSave';
import { deleteBasketCategory, updateBasketCategory } from '../../../../State/BasketCategory/Action';
import { getCompanyById } from '../../../../State/Company/Action';
import BtnMdCancel from '../../../../Components/Button/BtnMdCancel';
import { useTranslation } from 'react-i18next';

const UpdateCategoryView = ({ id, name, baskets, handleCancel }) => {
    const { company } = useSelector((store) => store.company)
    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState(name);
    const [notSelectedBaskets, setNotSelectedBaskets] = useState(
        company?.baskets?.filter(
            (companyBasket) => !baskets.some((selectedBasket) => selectedBasket.id === companyBasket.id)
        ) || []
    );
    const [selectedBaskets, setSelectedBaskets] = useState(baskets);
    const { t } = useTranslation();

    const handleCategorySave = () => {
        const reqData = {
            jwt: localStorage.getItem('jwt'),
            data: {
                id: id,
                name: categoryName,
                addedBaskets: selectedBaskets,
                removedBaskets: notSelectedBaskets,
            }
        }
        console.log("reqData", reqData);

        dispatch(updateBasketCategory(reqData))
            .then(() => dispatch(getCompanyById(company.id, localStorage.getItem('jwt'))))
            .then(() => setCategoryName(''))
            .then(() => setNotSelectedBaskets([]))
            .then(() => setSelectedBaskets([]));
    }
    const handleCategoryDelete = () => {
        const reqData = {
            jwt: localStorage.getItem('jwt'),
            data: {
                id: id,
            }
        }
        console.log("reqData", reqData);
        dispatch(deleteBasketCategory(reqData))
            .then(() => dispatch(getCompanyById(company.id, localStorage.getItem('jwt'))))
    }
    const handleBasketAdd = (basket) => {
        setNotSelectedBaskets(notSelectedBaskets.filter(p => p.id !== basket.id));
        setSelectedBaskets([...selectedBaskets, basket]);
    }
    const handleBasketRemove = (basket) => {
        setSelectedBaskets(selectedBaskets.filter(p => p.id !== basket.id));
        setNotSelectedBaskets([...notSelectedBaskets, basket]);
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
                <h2>{t("Update Category")}: {name}</h2>
                <BtnMdCancel clickEvent={() => handleCancel()} />
            </div>

            <div className='py-0.5 rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />

            <div className='flex flex-col w-full h-full overflow-auto'>

                <div className='flex flex-col w-full h-full gap-2 overflow-auto'>
                    <div className='flex flex-col w-full gap-2 px-2 pb-2'>
                        <h2 >{t("Category Name")}:</h2>
                        <input
                            type='text'
                            autoCapitalize='off'
                            className='w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8'
                            placeholder={t('Enter Category Name')}
                            name='categoryName'
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </div>
                    <div className='flex w-full h-full gap-1 overflow-auto'>
                        <div className='flex flex-col w-full h-full p-2 rounded-lg bg-light-4 dark:bg-dark-5 overflow-auto'>
                            <h2 className='whitespace-nowrap overflow-hidden text-ellipsis'>{t("All Baskets")}</h2>
                            <div className='my-1 py-0.5 rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />
                            <div className='bg-light-2 dark:bg-dark-7 p-1 h-full rounded overflow-auto'>
                                {notSelectedBaskets?.map((basket) => (
                                    <h2 key={basket.id} className='cursor-pointer rounded pl-1 hover:bg-light-5 hover:dark:bg-dark-5' onClick={() => handleBasketAdd(basket)}>{getBasketDisplayName(basket)}</h2>
                                ))}
                            </div>
                        </div>

                        <div className='flex flex-col h-full justify-center'>
                            <ArrowRightAltIcon />
                            <ArrowRightAltIcon className='rotate-180' />
                        </div>

                        <div className='flex flex-col w-full p-2 rounded-lg bg-light-4 dark:bg-dark-5 overflow-auto'>
                            <h2 className='whitespace-nowrap overflow-hidden text-ellipsis'>{t("Selected Baskets")}</h2>
                            <div className='my-1 py-0.5 rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />
                            <div className='bg-light-2 dark:bg-dark-7 p-1 h-full rounded overflow-auto'>
                                {selectedBaskets?.map((basket) => (
                                    <h2 key={basket.id} className='cursor-pointer rounded pl-1 hover:bg-light-5 hover:dark:bg-dark-5' onClick={() => handleBasketRemove(basket)}>{getBasketDisplayName(basket)}</h2>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-end w-full gap-2'>
                        <BtnMdDelete clickEvent={handleCategoryDelete} />
                        <BtnMdSave clickEvent={handleCategorySave} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateCategoryView