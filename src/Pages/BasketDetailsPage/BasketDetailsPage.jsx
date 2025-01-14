import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { getBasketById } from "../../State/Basket/Action";
import { getCartByBasketId } from "../../State/Cart/Action";
import WaitingOrdersView from "./WaitingOrdersView";
import OrdersView from "./OrdersView";
import PaymentHistoryView from "./PaymentHistoryView";
import ProductCategoriesView from "./ProductCategoriesView";
import ProductsView from "./ProductsView";
import { useTranslation } from "react-i18next";

const BasketDetailsPage = () => {
  const location = useLocation();
  const basket = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { company } = useSelector((store) => store.company);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const views = [
    { id: 1, title: "Orders", element: (props) => <OrdersView {...props} /> },

    {
      id: 2,
      title: "Waiting Orders",
      element: (props) => (
        <WaitingOrdersView
          {...props}
          handleViewSelect={() => handleViewSelect(views[0])}
        />
      ),
    },

    {
      id: 3,
      title: "Payment History",
      element: (props) => <PaymentHistoryView {...props} />,
    },
  ];
  const [selectedView, setSelectedView] = useState(views[0]);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (basket) {
      const reqData = {
        jwt,
        id: basket.id,
      };
      dispatch(getBasketById(reqData));
      dispatch(getCartByBasketId(basket.id));
      getBasketDisplayName();
    }
  }, [basket, dispatch, jwt]);

  useEffect(() => {
    if (company && company.productCategories) {
      const newCategories = [
        { name: "All Products", products: company.products },
        ...company.productCategories,
      ];
      setCategories(newCategories);
      setSelectedCategory(newCategories[0]);
    }
  }, [company, dispatch]);

  const handleSearchInputChange = (e) => {
    handleCategorySelect(categories[0]);
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    if (searchTerm !== "") {
      const filteredItems = categories[0].products.filter((prod) =>
        prod.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filteredItems);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchItem("");
  };

  const handleViewSelect = (view) => {
    setSelectedView(view);
  };

  const getBasketDisplayName = () => {
    if (!basket) return;
    if (basket.customName !== null) return basket.customName;
    else {
      const [staticPart, dynamicPart] = basket.name.split(" ");
      return t(staticPart) + " " + dynamicPart;
    }
  };
  return (
    <div className="flex flex-col h-full gap-2">
      <div className="flex items-center justify-start z-[90] w-full p-2 gap-3 rounded-xl bg-light-2 dark:bg-dark-7 text-dark-7 dark:text-light-7">
        <ArrowBackIcon
          className={`p-2.5 min-h-11 min-w-11 rounded-lg cursor-pointer bg-white dark:bg-dark-5 hover:bg-light-4 hover:dark:bg-light-5 hover:dark:text-dark-7`}
          onClick={() => navigate("/adisyon-frontend/baskets")}
        />
        <h2 className="text-center whitespace-nowrap text-lg font-medium">
          {getBasketDisplayName()}
        </h2>
      </div>

      <div className="flex flex-col md:flex-row h-full w-full pb-3 gap-2 font-semibold text-lg text-dark-7 dark:text-light-7 overflow-auto">
        <div className="min-h-12 md:h-full w-full md:w-2/12 overflow-auto">
          <ProductCategoriesView
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategorySelect={handleCategorySelect}
          />
        </div>

        <div className="h-full md:h-full w-full md:w-7/12 overflow-auto">
          <ProductsView
            products={
              searchItem !== "" ? filteredProducts : selectedCategory?.products
            }
            searchItem={searchItem}
            handleSearchInputChange={handleSearchInputChange}
            handleViewSelect={() => handleViewSelect(views[1])}
          />
        </div>

        <div className="h-full md:h-full w-full md:w-3/12 overflow-auto">
          <div className="flex flex-col w-full h-full rounded-xl bg-light-2 dark:bg-dark-7 text-dark-7 dark:text-light-7 text-sm md:text-lg overflow-auto">
            <div className="flex justify-between items-center w-full min-h-11 px-2 py-2 overflow-auto">
              {views.map((view, index) => (
                <h2
                  className={`w-full text-center ${
                    selectedView.title === view.title
                      ? "bg-light-5 dark:bg-dark-5 rounded-lg"
                      : ""
                  } py-1 px-2 whitespace-nowrap text-sm cursor-pointer`}
                  key={index}
                  onClick={() => handleViewSelect(view)}
                >
                  {t(view.title)}
                </h2>
              ))}
            </div>

            <div className=" mx-1 py-0.5 rounded-full bg-dark-1 dark:bg-light-10 text-dark-1 dark:text-light-10" />

            {selectedView.element({})}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketDetailsPage;
