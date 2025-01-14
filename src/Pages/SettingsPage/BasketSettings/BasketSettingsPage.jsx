import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BasketsView from './Views/BasketsView';
import AddNewBasketView from './Views/AddNewBasketView';
import AddNewCategoryView from './Views/AddNewCategoryView';
import UpdateCategoryView from './Views/UpdateCategoryView';
import UpdateBasketView from './Views/UpdateBasketView';
import { useTranslation } from 'react-i18next';



const BasketSettingsPage = () => {

    const { company } = useSelector((store) => store.company)
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedView, setSelectedView] = useState(null);
    const [selectedViewId, setSelectedViewId] = useState(0);
    const { t } = useTranslation();

    const views = [
        { id: 1, element: (selectedCategory) => <BasketsView  {...selectedCategory} handleUpdateBasketSelect={handleUpdateBasketSelect} handleAddNewBasketSelect={handleAddNewBasketSelect} handleUpdateCategorySelect={handleUpdateCategorySelect} /> },

        { id: 2, element: (category) => <AddNewCategoryView  {...category} handleCancel={handleCancel} /> },

        { id: 3, element: (props) => <UpdateCategoryView {...props} handleCancel={handleCancel} /> },

        { id: 4, element: (props) => <AddNewBasketView {...props} handleCancel={handleCancel} /> },

        { id: 5, element: (props) => <UpdateBasketView {...props} handleCancel={handleCancel} /> },
    ]


    useEffect(() => {
        if (company && company.basketCategories) {
            const newCategories = [
                { name: "All Baskets", baskets: company.baskets },
                ...company.basketCategories,
            ];
            setCategories(newCategories);
            setSelectedCategory(newCategories[0]);
        }
    }, [company, dispatch]);

    useEffect(() => {
        if (selectedCategory) {
            handleViewSelect(0);
        }
    }, [selectedCategory]);


    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleAddNewCategorySelect = () => {
        setSelectedView(views[1].element(categories[0]))
        setSelectedViewId(1);
    };

    const handleUpdateCategorySelect = () => {
        handleViewSelect(2);
    }

    const handleAddNewBasketSelect = () => {
        handleViewSelect(3);
    }

    const handleUpdateBasketSelect = (basket) => {
        setSelectedView(views[4].element(({ basket })))
        setSelectedViewId(4);
    }

    const handleCancel = () => {
        handleViewSelect(0);
    }

    const handleViewSelect = (index) => {
        setSelectedView(views[index].element(selectedCategory))
        setSelectedViewId(index);
    }

    return (

        <div className='flex flex-col md:flex-row w-full h-full gap-2 overflow-auto'>
            <div className='flex flex-col w-full md:w-[calc(20%)] min-h-fit md:h-full p-2 gap-2 bg-light-2 dark:bg-dark-7 rounded-lg overflow-auto'>

                <div className='hidden md:flex justify-between items-end w-full min-h-8'>
                    <h2>{t("Categories")}</h2>
                </div>

                <div className='hidden md:block py-0.5 rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10 ' />

                <div className='flex flex-col w-full h-fit gap-2 overflow-auto'>

                    <h2 className={`text-center rounded-md cursor-pointer text-light-1 bg-success whitespace-nowrap overflow-hidden text-ellipsis`} onClick={() => handleAddNewCategorySelect()}>+ {t("Add New Category")}</h2>

                    <div className='flex md:flex-col gap-1 overflow-auto'>
                        {categories?.map((category, index) => (
                            <div className={`flex justify-between items-center rounded-md cursor-pointer hover:bg-light-4 hover:dark:bg-dark-5 ${selectedViewId !== 1 && category.name === selectedCategory.name ? "bg-light-4 dark:bg-dark-5" : ""}`} key={index} onClick={() => handleCategorySelect(category)}>

                                <h2 className='mr-2 md:mr-0 ml-2 whitespace-nowrap'>{t(category.name)}</h2>
                                {category === selectedCategory &&
                                    <div className='hidden md:inline-flex justify-center'>
                                        <ChevronRightIcon />
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='w-full md:w-[calc(80%)] h-full overflow-auto'>
                {selectedView}
            </div>
        </div>
    )
}

export default BasketSettingsPage










