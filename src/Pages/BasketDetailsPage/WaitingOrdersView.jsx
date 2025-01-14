
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
// import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, clearCart, deleteProductFromCart } from '../../State/Cart/Action';
import { createOrderByCart, updateOrderByCart } from '../../State/Order/Action';
import { activateBasket } from '../../State/Basket/Action';
import { useTranslation } from 'react-i18next';
import { createRecordItem } from '../../State/RecordItem/Action';


const WaitingOrdersView = ({ handleViewSelect }) => {
    const { cart } = useSelector((state) => state.cart);
    const { order } = useSelector((state) => state.order);
    const { basket } = useSelector((state) => state.basket);
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const handleProductSelect = (product, quantity) => {
        const reqData = {
            jwt,
            data: {
                productId: product.id,
                cartId: cart.id,
                quantity: quantity,
            },
        };
        dispatch(addProductToCart(reqData));
    }
    const handleProductRemove = (product) => {
        const reqData = {
            jwt,
            data: {
                id: product.id,
                cartId: cart.id,
            },
        };
        dispatch(deleteProductFromCart(reqData));
    }

    const handleApprove = () => {
        if (cart) {
            const reqData = {
                jwt,
                data: {
                    ...(order ? { orderId: order.id } : { basketId: basket.id })
                },
            };
            const recordReqData = {
                jwt,
                data: {
                    currentBasketId: basket.id,
                    recordItemType: "ORDER_ADD"
                },
            };

            const orderAction = order ? updateOrderByCart(reqData) : createOrderByCart(reqData);
            dispatch(createRecordItem(recordReqData))
                .then(() => {
                    return dispatch(orderAction);
                })
                .then(() => {
                    return dispatch(clearCart(jwt, cart.id));
                })
                .then(() => {
                    if (!basket.isActive) {
                        return dispatch(activateBasket(jwt, basket.id));
                    }
                })
                .then(handleViewSelect)
                .catch((error) => {
                    console.error("Error in handleApprove:", error);
                });
        }
    }
    return (
        <div className='flex flex-col h-full gap-1 p-1 pt-0 overflow-auto'>
            <div className='flex flex-col gap-1 size-full overflow-auto'>

                {cart?.cartProducts.length > 0 ? cart.cartProducts.map((item, index) => (
                    <div key={index}>
                        <WaitingOrderItem item={item} handleProductSelect={handleProductSelect} handleProductRemove={handleProductRemove} />
                        <hr className='border-light-10 rounded mx-1 border-2' />
                    </div>
                ))
                    : <h2>{t("Not Found")}.</h2>
                }

            </div>
            {cart && cart.cartProducts.length > 0 &&
                <div className='h-fit bg-light-6 dark:bg-dark-3 rounded-lg'>
                    <WaitingOrdersController handleApprove={handleApprove} />
                </div>
            }
        </div>
    )
}

export default WaitingOrdersView

const WaitingOrderItem = ({ item, handleProductSelect, handleProductRemove }) => {

    return (
        <div className="flex items-center justify-between p-1 size-full">
            <div className='flex w-2/6 items-center justify-start '>
                <h2>{item.product.name}</h2>
            </div>
            <div className='flex w-4/6 items-center justify-evenly gap-1'>
                <AddCircleIcon className='cursor-pointer text-light-10 hover:text-dark-5 hover:dark:text-light-1' onClick={() => { handleProductSelect(item.product, 1) }} />
                <input className='w-6 bg-transparent text-center' type="text" name={`${item.product.name}`} id={`${item.product.name}`} placeholder='1' value={item.quantity} onChange={() => { }}></input>
                <RemoveCircleIcon className='cursor-pointer text-light-10 hover:text-dark-5 hover:dark:text-light-1' onClick={() => { handleProductSelect(item.product, -1) }} />
                <h2>{item.product.price * item.quantity}$</h2>
                {/* <EditIcon /> */}
                <CancelIcon className='cursor-pointer text-light-10 hover:text-dark-5 hover:dark:text-light-1' onClick={() => { handleProductRemove(item) }} />
            </div>
        </div>
    );
};

const WaitingOrdersController = ({ handleApprove }) => {
    const { cart } = useSelector((state) => state.cart);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const jwt = localStorage.getItem("jwt");
    const id = cart.id;

    const handleClearClick = () => {
        dispatch(clearCart(jwt, id));
    }
    return (
        <div className="flex w-full p-2 items-center justify-end gap-2 text-center text-light-1">
            <div className='w-[calc(78.5%)] bg-green-600 p-1 rounded-lg cursor-pointer ' onClick={() => handleApprove()}>
                <h2>{t("Approve")}</h2>
            </div>
            <div className='w-[calc(22.5%)] bg-red-500 p-1 rounded-lg cursor-pointer' onClick={() => handleClearClick()}>
                <h2>{t("Clear")}</h2>
            </div>
        </div>
    );
};