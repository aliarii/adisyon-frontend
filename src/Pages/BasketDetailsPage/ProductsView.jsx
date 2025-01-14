import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from '@mui/icons-material/Search';
import { Grid2 } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../State/Cart/Action";
import { useTranslation } from 'react-i18next';
import ProductCard from "../../Components/ProductCard/ProductCard";

const ProductsView = ({ products, searchItem, handleSearchInputChange, handleViewSelect }) => {

    const { cart } = useSelector((store) => store.cart);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const jwt = localStorage.getItem("jwt");

    const handleProductSelect = (product) => {
        const reqData = {
            jwt,
            data: {
                productId: product.id,
                cartId: cart.id,
                quantity: 1,
            },
        };
        dispatch(addProductToCart(reqData)).then(handleViewSelect);
    }
    return (
        <div className='flex flex-col w-full h-full rounded-xl bg-light-2 dark:bg-dark-7 text-dark-7 dark:text-light-7 text-sm md:text-lg overflow-auto'>

            <div className='flex justify-between items-center w-full px-2 py-2 '>
                <h2 className="w-full ">{t("Products")}</h2>

                <div className="flex justify-center items-center w-full max-w-56 gap-2 rounded-lg bg-light-5 dark:bg-dark-5">

                    <input type="text" className='pl-2 w-full bg-transparent border-none outline-none placeholder-dark-7 dark:placeholder-light-7 ' name='search' value={searchItem} onChange={handleSearchInputChange} placeholder={`${t("Search")}`} />

                    {searchItem === "" ? <SearchIcon /> : <CloseIcon className='cursor-pointer hover:dark:text-dark-7 hover:rounded-full hover:bg-dark-5 hover:dark:bg-light-1' onClick={() => { handleSearchInputChange({ target: { value: "" } }) }} />}
                </div>
            </div>

            <div className='mx-1 py-0.5 rounded-full bg-dark-1 dark:bg-light-10 text-dark-1 dark:text-light-10' />

            <div className='px-2 py-2 overflow-auto '>
                {products?.length > 0 ?

                    <Grid2 container spacing={1} columns={{ xs: 6, sm: 8, md: 12, lg: 16 }} >
                        {products?.map((product, index) => (
                            <ProductCard key={index} product={product} handleSelect={handleProductSelect} />
                        ))}
                    </Grid2> : <h2> {t("Not Found")} </h2>

                }
            </div>
        </div>
    )
}

export default ProductsView