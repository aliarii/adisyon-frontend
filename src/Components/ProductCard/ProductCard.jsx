import { Grid2 } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

const ProductCard = ({ product, handleSelect }) => {
    const { t } = useTranslation();
    return (
        <Grid2 size={{ xs: 2, sm: 4, md: 3, lg: 4 }}>
            <div className="h-[calc(100vh*.151)] rounded-md cursor-pointer text-center bg-light-5 dark:bg-dark-5"
                onClick={() => handleSelect(product)} >
                <h2>{product.name}</h2>
                <h2>{t("$")}{product.price}</h2>
                <h2>{t(product.isActive ? "active" : "deactive")}</h2>
            </div>
        </Grid2>
    )
}

export default ProductCard