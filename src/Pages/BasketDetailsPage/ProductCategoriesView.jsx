import React from 'react';
import { useTranslation } from 'react-i18next';


const ProductCategoriesView = ({ categories, selectedCategory, handleCategorySelect }) => {

    const { t } = useTranslation();

    return (
        <div className='flex flex-row md:flex-col w-full h-full rounded-xl bg-light-2 dark:bg-dark-7 '>

            <div className='hidden md:block px-3 py-2' >
                <h2>{t("Categories")}</h2>
            </div>

            <div className='hidden md:block mx-1 py-0.5 rounded-full bg-dark-1 dark:bg-light-10 text-dark-1 dark:text-light-10' />


            <div className='flex md:flex-col h-full gap-1 px-2 py-2 whitespace-nowrap overflow-auto text-sm md:text-lg'>
                {categories.map((category, index) => (
                    <span className={`flex justify-between p-1 gap-1 items-center text-center rounded-md cursor-pointer hover:bg-light-6 hover:dark:bg-dark-5 ${category === selectedCategory ? "bg-light-6 dark:bg-dark-5" : ""}`} key={index} onClick={() => handleCategorySelect(category)}>
                        <h2>{t(category.name)}</h2>
                    </span>
                ))}
            </div>
        </div>
    )
}

export default ProductCategoriesView