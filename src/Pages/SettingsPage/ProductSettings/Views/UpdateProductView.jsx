
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BtnMdDelete from '../../../../Components/Button/BtnMdDelete';
import BtnMdSave from '../../../../Components/Button/BtnMdSave';
import { getCompanyById } from '../../../../State/Company/Action';
import { deleteProduct, updateProduct } from '../../../../State/Product/Action';
import BtnMdCancel from '../../../../Components/Button/BtnMdCancel';
import { useTranslation } from 'react-i18next';



const UpdateProductView = ({ product, handleCancel }) => {
    const { company } = useSelector((store) => store.company)
    const dispatch = useDispatch();
    const [productName, setProductName] = useState(product.name);
    const [productPrice, setPrice] = useState(product.price);
    const { t } = useTranslation();

    const handlePriceChange = (event) => {
        const value = Number(event.target.value);
        setPrice(value >= 0 ? value : 0);
    }
    const handleProductUpdate = () => {
        const reqData = {
            jwt: localStorage.getItem('jwt'),
            data: {
                id: product.id,
                name: productName,
                price: productPrice,
            }
        }
        console.log("reqData", reqData);

        dispatch(updateProduct(reqData))
            .then(() => dispatch(getCompanyById(company.id, localStorage.getItem('jwt'))))
            .then(() => setProductName(''))
            .then(() => setPrice(0));
    }
    const handleProductDelete = () => {
        const reqData = {
            jwt: localStorage.getItem('jwt'),
            data: {
                id: product.id,
            }
        }
        console.log("reqData", reqData);

        dispatch(deleteProduct(reqData))
            .then(() => dispatch(getCompanyById(company.id, localStorage.getItem('jwt'))))
            .then(() => setProductName(''))
            .then(() => setPrice(0));
    }

    return (
        <div className='flex flex-col w-full h-full p-2 gap-2 rounded-lg bg-light-2 dark:bg-dark-7 overflow-auto'>
            <div className='flex justify-between items-end w-full min-h-8'>
                <h2>{t("Update")}: {product?.name}</h2>
                <BtnMdCancel clickEvent={() => handleCancel()} />
            </div>

            <div className='py-0.5 rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />

            <div className='flex flex-col w-full h-full overflow-auto'>
                <div className='flex flex-col w-full h-full gap-2 px-2 pb-2 overflow-auto'>
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
                        type='number'
                        autoCapitalize='off'
                        className='w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8 [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none'
                        placeholder={t('Enter Product Price')}
                        name='productPrice'
                        value={productPrice}
                        onChange={handlePriceChange}
                        onFocus={(e) => e.target.select()}
                    />
                    <div className='flex justify-end w-full gap-2'>
                        <BtnMdDelete clickEvent={handleProductDelete} />
                        <BtnMdSave clickEvent={handleProductUpdate} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateProductView