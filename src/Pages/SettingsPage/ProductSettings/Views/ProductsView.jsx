import { Grid2 } from '@mui/material';
import React from 'react';
import BtnMdEdit from '../../../../Components/Button/BtnMdEdit';

import { useTranslation } from 'react-i18next';
import ProductCard from '../../../../Components/ProductCard/ProductCard';


const ProductsView = ({ name, products, handleUpdateProductSelect, handleAddNewProductSelect, handleUpdateCategorySelect }) => {
    const { t } = useTranslation();

    return (
        <div className='flex flex-col w-full h-full p-2 gap-2 rounded-lg bg-light-2 dark:bg-dark-7 overflow-auto'>

            <div className='flex justify-between items-end w-full min-h-8'>
                <h2>{t(name)}</h2>
                {name !== "All Products" ? <BtnMdEdit clickEvent={() => handleUpdateCategorySelect()} />
                    : ""}
            </div>

            <div className='py-0.5 rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />

            <Grid2 container spacing={1} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }} className='overflow-auto' >
                <Grid2 size={{ xs: 2, sm: 4, md: 3, lg: 4 }}>
                    <div className="flex flex-col justify-center items-center h-[calc(100vh*.151)] rounded-md cursor-pointer text-center bg-light-5 dark:bg-dark-5"
                        onClick={() => handleAddNewProductSelect()} >
                        <h2 className='text-center'>+</h2>
                        <h2 className='text-center'>{t("Add New Product")}</h2>
                    </div>
                </Grid2>
                {products?.length > 0 ?
                    (products.map((product, index) => (
                        <ProductCard key={index} product={product} handleSelect={handleUpdateProductSelect} />
                    )))
                    : ""}
            </Grid2>

        </div>
    )
}

export default ProductsView