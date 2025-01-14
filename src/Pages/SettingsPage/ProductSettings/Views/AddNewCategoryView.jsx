import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BtnMdCancel from '../../../../Components/Button/BtnMdCancel';
import BtnMdSave from '../../../../Components/Button/BtnMdSave';
import { getCompanyById } from '../../../../State/Company/Action';
import { createProductCategory } from '../../../../State/ProductCategory/Action';
import { useTranslation } from 'react-i18next';



const AddNewCategoryView = ({ products, handleCancel }) => {
    const { company } = useSelector((store) => store.company)
    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState('');
    const [notSelectedProducts, setNotSelectedProducts] = useState(products);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const { t } = useTranslation();

    const handleCategorySave = () => {
        const reqData = {
            jwt: localStorage.getItem('jwt'),
            data: {
                companyId: company.id,
                name: categoryName,
                products: selectedProducts,
            }
        }
        console.log("reqData", reqData);

        dispatch(createProductCategory(reqData))
            .then(() => dispatch(getCompanyById(company.id, localStorage.getItem('jwt'))))
            .then(() => setCategoryName(''))
            .then(() => setNotSelectedProducts([]))
            .then(() => setSelectedProducts([]));
    }

    const handleProductAdd = (product) => {
        setNotSelectedProducts(notSelectedProducts.filter(p => p.id !== product.id));
        setSelectedProducts([...selectedProducts, product]);
    }
    const handleProductRemove = (product) => {
        setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
        setNotSelectedProducts([...notSelectedProducts, product]);
    }
    return (
        <div className='flex flex-col w-full h-full p-2 gap-2 rounded-lg bg-light-2 dark:bg-dark-7 overflow-auto'>

            <div className='flex justify-between items-end w-full min-h-8'>
                <h2>{t("Add New Category")}</h2>
                <BtnMdCancel clickEvent={() => handleCancel()} />

            </div>

            <div className='py-0.5 rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />

            <div className='flex flex-col w-full h-full gap-2 overflow-auto'>
                <div className='flex flex-col w-full gap-2 px-2 pb-2'>
                    <h2>{t("Category Name")}:</h2>
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
                        <h2 className='whitespace-nowrap overflow-hidden text-ellipsis'>{t("All Products")}</h2>
                        <div className='my-1 py-0.5 rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />
                        <div className='bg-light-2 dark:bg-dark-7 p-1 h-full rounded overflow-auto'>
                            {notSelectedProducts?.map((product) => (
                                <h2 key={product.id} className='cursor-pointer rounded pl-1 hover:bg-light-5 hover:dark:bg-dark-5' onClick={() => handleProductAdd(product)}>{product.name}</h2>
                            ))}
                        </div>
                    </div>

                    <div className='flex flex-col h-full justify-center'>
                        <ArrowRightAltIcon />
                        <ArrowRightAltIcon className='rotate-180' />
                    </div>

                    <div className='flex flex-col w-full p-2 rounded-lg bg-light-4 dark:bg-dark-5 overflow-auto'>
                        <h2 className='whitespace-nowrap overflow-hidden text-ellipsis'>{t("Selected Products")}</h2>
                        <div className='my-1 py-0.5 rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />
                        <div className='bg-light-2 dark:bg-dark-7 p-1 h-full rounded overflow-auto'>
                            {selectedProducts?.map((product) => (
                                <h2 key={product.id} className='cursor-pointer rounded pl-1 hover:bg-light-5 hover:dark:bg-dark-5' onClick={() => handleProductRemove(product)}>{product.name}</h2>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex justify-end w-full gap-2'>
                    <BtnMdSave clickEvent={handleCategorySave} />
                </div>
            </div>
        </div>
    )
}

export default AddNewCategoryView