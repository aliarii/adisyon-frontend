import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BtnMdSave from '../../../../Components/Button/BtnMdSave';
import { getCompanyById } from '../../../../State/Company/Action';
import { createProduct } from '../../../../State/Product/Action';
import BtnMdCancel from '../../../../Components/Button/BtnMdCancel';
import { useTranslation } from 'react-i18next';



const AddNewProductView = ({ id, name, handleCancel }) => {
    const { company } = useSelector((store) => store.company)
    const dispatch = useDispatch();
    const [productName, setProductName] = useState('');
    const [productPrice, setPrice] = useState(0);
    const { t } = useTranslation();

    const handlePriceChange = (event) => {
        const value = Number(event.target.value);
        setPrice(value >= 0 ? value : 0);
    }
    const handleProductSave = () => {
        const reqData = {
            jwt: localStorage.getItem('jwt'),
            data: {
                name: productName,
                price: productPrice,
                companyId: company.id,
                productCategoryId: name === "All Products" ? null : id,
            }
        }
        console.log("reqData", reqData);

        dispatch(createProduct(reqData))
            .then(() => dispatch(getCompanyById(company.id, localStorage.getItem('jwt'))))
            .then(() => setProductName(''))
            .then(() => setPrice(0));
    }
    return (
        <div className='flex flex-col w-full h-full p-2 gap-2 rounded-lg bg-light-2 dark:bg-dark-7 overflow-auto'>
            <div className='flex justify-between items-end w-full min-h-8'>
                <h2>{t("Add New Product")}</h2>
                <BtnMdCancel clickEvent={() => handleCancel()} />
            </div>

            <div className='py-0.5 rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />

            <div className='flex flex-col w-full h-full overflow-auto'>
                <div className='flex flex-col w-full gap-2 px-2 pb-2 overflow-auto'>

                    <div className='flex flex-col w-full gap-2 '>
                        <h2>{t("Product Name")}:</h2>
                        <input
                            type='text'
                            autoCapitalize='off'
                            className='w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8'
                            placeholder={t('Enter Product Name')}
                            name='productName'
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        <h2>{t("Product Price")}:</h2>
                        <input
                            type='text'
                            autoCapitalize='off'
                            className='w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8'
                            placeholder={t('Enter Product Price')}
                            name='productPrice'
                            value={productPrice}
                            onChange={handlePriceChange}
                            onFocus={(e) => e.target.select()}
                        />
                    </div>
                    <div className='flex justify-end w-full gap-2'>
                        <BtnMdSave clickEvent={handleProductSave} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewProductView