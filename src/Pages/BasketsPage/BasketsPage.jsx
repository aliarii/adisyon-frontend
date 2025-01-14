import { Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BasketCard from "../../Components/BasketCard/BasketCard";
import { useTranslation } from "react-i18next";
import SpinningLoading from "../../Components/SpinningLoading";


const BasketsPage = () => {
  const { company, loading, error } = useSelector((store) => store.company);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (company && company.basketCategories) {
      const allBaskets = company.baskets;
      const closeBaskets = company.baskets.filter(basket => !basket.isActive);
      const openBaskets = company.baskets.filter(basket => basket.isActive);

      const newCategories = [
        { name: "All Baskets", baskets: allBaskets },
        ...(openBaskets.length > 0 ? [
          { name: "Open Baskets", baskets: openBaskets },
          { name: "Close Baskets", baskets: closeBaskets },
        ] : []),
        ...company.basketCategories,
      ];

      setCategories(newCategories);
      setSelectedCategory(newCategories[(openBaskets.length > 0 ? 1 : 0)]);

    }
  }, [company]);

  const handleCategorySelect = (category) => {
    console.log("Selected Category", category);
    console.log("Categories", categories);
    setSelectedCategory(category);
  };



  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredBaskets = selectedCategory
    ? selectedCategory.baskets
    : company?.baskets;

  return (
    <div className='flex flex-col w-full h-full mb-3 gap-y-2 overflow-auto'>

      {/* category bar */}
      <div className='min-h-[60px] h-[60px] w-full overflow-auto rounded-xl bg-light-2 dark:bg-dark-7 text-dark-7 dark:text-light-7'>
        <div className="flex flex-row w-full h-full p-2 gap-2 overflow-y-hidden overflow-x-auto">

          {categories.map((item) => {
            if (item.name === "Open Baskets" && item.baskets.length === 0) {
              return null;
            }
            const isSelected = selectedCategory && selectedCategory.name === item.name;
            return (
              <h2
                className={`self-center p-2 cursor-pointer whitespace-nowrap rounded-lg text-lg font-medium ${isSelected ? "bg-light-4 dark:bg-dark-5 dark:text-light-7" : "hover:bg-light-4 hover:dark:bg-dark-5 hover:dark:text-light-7"}`}
                key={item.name}
                onClick={() => handleCategorySelect(item)}
              >
                {t(item.name)}
              </h2>
            );
          })}

        </div>
      </div>

      {/* baskets */}
      <div className='w-full h-full p-2 overflow-auto rounded-xl bg-light-2 dark:bg-dark-7'>

        {loading ?
          <SpinningLoading />
          : (filteredBaskets?.length > 0 ?
            <Grid2 container spacing={1} columns={{ xs: 4, sm: 8, md: 12, lg: 20 }} >
              {filteredBaskets.map((basket, index) => (
                <BasketCard key={index} basket={basket} />
              ))}
            </Grid2>
            : <h2>{t("Not Found")}</h2>
          )
        }

      </div>
      {/* </div> */}
    </div>
  );
};

export default BasketsPage;
