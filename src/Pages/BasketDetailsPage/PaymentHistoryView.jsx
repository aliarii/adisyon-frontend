import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBasketById } from '../../State/Basket/Action';
import { useTranslation } from 'react-i18next';
import { separateDateTime } from '../../Utils/formatDate';

const PaymentHistoryView = () => {
    const { basket } = useSelector((state) => state.basket);
    const { order } = useSelector((state) => state.order);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [completedOrders, setCompletedOrders] = useState([]);

    useEffect(() => {
        if (basket) {
            const temp = basket.completedOrders
                .sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate));
            setCompletedOrders(temp.length > 0 ? temp : []);
        }
        else
            setCompletedOrders([]);
    }, [basket])

    useEffect(() => {
        if (basket) {
            const reqData = {
                jwt: localStorage.getItem('jwt'),
                id: basket.id,
            }
            dispatch(getBasketById(reqData))
        }
    }, [])


    const groupedOrders = completedOrders.reduce((acc, item) => {
        const date = separateDateTime(item.completedDate);

        const existingGroup = acc.find(group => group.date === date);
        if (existingGroup) {
            existingGroup.items.push(item);
        } else {
            acc.push({ date: date, items: [item] });
        }

        return acc;
    }, []);


    return (

        <div className='flex flex-col size-full gap-1 p-1 overflow-auto'>
            <div className='flex flex-col gap-1 size-full overflow-auto'>
                <h2>{t("Paid Products")}</h2>
                <div className='-mt-1 py-0.5 rounded-full bg-dark-1 dark:bg-light-10 text-dark-1 dark:text-light-10' />
                <div className='flex flex-col size-full gap-1 overflow-auto'>

                    {groupedOrders.length > 0 ?
                        groupedOrders.map((group, index) => (
                            <div className='flex flex-col w-full' key={index}>
                                {/* <h2 className='text-end'>{group.date.date}</h2> */}
                                <div className='flex justify-between items-center'>
                                    <h2 >{group.date.date}</h2>
                                    <h2 >{group.date.time}</h2>
                                </div>

                                <div className='py-[0.25px] rounded-full bg-dark-1 dark:bg-light-10 text-dark-1 dark:text-light-10' />

                                {group.items.map((item, idx) => (
                                    <div key={idx} className='flex flex-col text-sm md:text-base'>
                                        <div className='px-1 w-full' >
                                            {item.orderItems.map((itemOrder, idx) => (
                                                <div key={idx} className='flex flex-row justify-between'>
                                                    <div className='flex flex-row gap-2' >
                                                        <h2>{"x" + itemOrder.quantity}</h2>
                                                        <h2>{itemOrder.product.name}</h2>
                                                    </div>
                                                    <div>
                                                        <h2>{t("$")}{itemOrder.totalPrice.toFixed(2)}</h2>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='flex justify-end w-full bg-light-6 dark:bg-dark-4 rounded-md px-1'>
                                            <h2>{t("Total Price")}:</h2>
                                            <h2 className='min-w-20 text-end'>{t("$")}{item.totalPrice.toFixed(2)}</h2>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                        : <h2>{t("Not Found")}.</h2>
                    }
                </div>
            </div>
            <div className='flex flex-col gap-1 size-full overflow-auto'>
                <h2 >{t("Credit Card - Cash")}</h2>
                <div className='-mt-1 py-0.5 rounded-full bg-dark-1 dark:bg-light-10 text-dark-1 dark:text-light-10' />

                <div className='flex flex-col size-full gap-1 overflow-auto'>
                    {order?.payments?.length > 0 && (
                        order?.payments?.map((item) =>
                        (
                            <div key={item.id} className='flex flex-col w-full'>
                                <div className='flex justify-between items-center'>
                                    <h2 >{separateDateTime(item.completedDate).date}</h2>
                                    <h2 >{separateDateTime(item.completedDate).time}</h2>
                                </div>


                                <div className='flex justify-between bg-light-6 dark:bg-dark-4 rounded-md px-1 text-sm md:text-base'>
                                    <h2>{item.paymentType === "TYPE_CREDIT_CARD" ? `${t("Credit Card")}` : `${t("Cash")}`}</h2>
                                    <p>{t("$")}{item.payAmount.toFixed(2)}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default PaymentHistoryView
