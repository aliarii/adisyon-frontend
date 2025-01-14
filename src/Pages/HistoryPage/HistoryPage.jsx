
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import BtnMdCancel from '../../Components/Button/BtnMdCancel';
import CustomDropdown from '../../Components/Dropdown/CustomDropdown';
import { getReceiptsByDay } from '../../State/Receipt/Action';
import generateDays from '../../Utils/days';
import { combinedDateTime } from '../../Utils/formatDate';
import months from '../../Utils/months';
import generateYears from '../../Utils/years';
import SpinningLoading from '../../Components/SpinningLoading';

const HistoryPage = () => {
    const { company } = useSelector((store) => store.company)
    const { receipts, loading } = useSelector((store) => store.receipt)
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');

    const date = useMemo(() => new Date(), []);
    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    const [selectedMonth, setSelectedMonth] = useState(months[currentMonth - 1].id);
    const [selectedYear, setSelectedYear] = useState(currentYear.toString());

    const years = useMemo(() => generateYears(2000, currentYear), [currentYear]);
    const days = useMemo(() => generateDays(selectedMonth, selectedYear), [selectedMonth, selectedYear]);
    const [selectedDay, setSelectedDay] = useState(() => (days.length > 0 ? days[currentDay - 1]?.id : null));



    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [showDetailView, setShowDetailView] = useState(false);

    useEffect(() => {
        if (company) {
            if (!days[selectedDay - 1]) {
                setSelectedDay(days[days.length - 1].id);
                return;
            }
            dispatch(getReceiptsByDay({ jwt, companyId: company.id, year: selectedYear, month: selectedMonth, day: selectedDay }))
        }
    }, [company, dispatch, jwt, selectedMonth, selectedYear, selectedDay, days])


    const handleSelectDay = (id) => {
        setSelectedDay(id);
    };
    const handleSelectMonth = (id) => {
        setSelectedMonth(id);
    };
    const handleSelectYear = (id) => {
        setSelectedYear(id)
    };

    const handleReceiptSelect = (receipt) => {
        setSelectedReceipt(receipt);
        setShowDetailView(receipt !== null ? true : false);
    }


    return (

        <div className='flex flex-col md:flex-row w-full h-full mb-3 text-dark-7 dark:text-light-7 text-lg font-medium overflow-auto gap-2'>
            <div className='flex flex-col w-full h-full p-2 gap-2 rounded-xl bg-light-2 dark:bg-dark-7 '>

                <div className='flex flex-col md:flex-row justify-between items-center min-h-8 gap-2'>
                    <h2 >{t("Receipts")}</h2>
                    <div className="flex justify-between h-full gap-1 pb-2 md:pb-0">
                        <CustomDropdown items={days} selectedItemId={selectedDay} handleSelect={handleSelectDay} />
                        <CustomDropdown items={months} selectedItemId={selectedMonth} handleSelect={handleSelectMonth} />
                        <CustomDropdown items={years} selectedItemId={selectedYear} handleSelect={handleSelectYear} />
                    </div>
                </div>

                <div className='py-0.5 rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />

                <div className='flex flex-col w-full h-full gap-2 overflow-auto'>

                    {loading ?
                        <SpinningLoading />
                        :
                        receipts?.length > 0 ? (
                            receipts?.map((receipt, index) => (
                                <ReceiptItem key={index} receipt={receipt} handleReceiptSelect={handleReceiptSelect} selectedReceipt={selectedReceipt} />
                            ))
                        ) : (
                            <h2>{t("Not Found")}</h2>
                        )}
                </div>

            </div>
            {showDetailView && (
                <>
                    <div className='hidden md:inline w-full'>
                        <ReceiptDetail receipt={selectedReceipt} onClose={() => handleReceiptSelect(null)} />
                    </div>
                    <div className='visible md:hidden'>
                        <SmallScreenDetailWindow>
                            <ReceiptDetail receipt={selectedReceipt} onClose={() => handleReceiptSelect(null)} />
                        </SmallScreenDetailWindow>
                    </div>
                </>
            )

            }

        </div>
    )
}

export default HistoryPage

const ReceiptItem = ({ receipt, handleReceiptSelect, selectedReceipt }) => {
    const { t } = useTranslation();

    const uniquePaymentTypes = new Set();

    // Loop through all orders and payments, and add each payment type to the Set
    receipt.orders.forEach(order => {
        order.payments.forEach(payment => {
            uniquePaymentTypes.add(payment.paymentType);
        });
    });

    const getBasketDisplayName = (name) => {
        if (!name)
            return;
        if (name.includes("Basket")) {
            const [staticPart, dynamicPart] = name.split(' ');
            return t(staticPart) + " " + dynamicPart;
        }
        else
            return name;
    }
    return (
        <div className={`flex flex-col w-full p-2 ${selectedReceipt === receipt ? "bg-light-7 dark:bg-dark-3" : "bg-light-4 dark:bg-dark-5"} rounded-lg cursor-pointer`} onClick={() => handleReceiptSelect(receipt)}>
            <div className='flex justify-between'>
                <h2>{getBasketDisplayName(receipt.basketName)}</h2>
                <h2>{t("$")}{receipt.totalPrice}</h2>
            </div>
            <div className='flex w-full gap-2 font-medium text-sm overflow-auto'>

                {/* Map through unique payment types and render them */}
                {[...uniquePaymentTypes].map((paymentType) => (
                    <h2 key={paymentType} className='p-1 bg-info rounded-md text-light-1 whitespace-nowrap'>
                        {paymentType === "TYPE_CREDIT_CARD" ? `${t("Credit Card")}` : `${t("Cash")}`}
                    </h2>
                ))}
            </div>
            <div className='flex justify-end gap-2 font-medium text-sm'>
                <h2>{combinedDateTime(receipt.basketOpenDate)}</h2>
                <h2>/</h2>
                <h2>{combinedDateTime(receipt.createdDate)}</h2>
            </div>
        </div>
    );
};

const ReceiptDetail = ({ receipt, onClose }) => {
    const { t } = useTranslation();

    const getBasketDisplayName = (name) => {
        if (!name)
            return;
        if (name.includes("Basket")) {
            const [staticPart, dynamicPart] = name.split(' ');
            return t(staticPart) + " " + dynamicPart;
        }
        else
            return name;

    }
    return (
        <div className='flex flex-col w-full h-full p-2 gap-2 rounded-xl bg-light-2 dark:bg-dark-7 '>
            <div className='flex justify-between items-center min-h-8'>
                <h2>{t("Receipt Detail")}</h2>
                <BtnMdCancel clickEvent={onClose} btnText={"Close"} />
            </div>

            <div className='py-0.5 rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />
            <div className='flex flex-col w-full h-full gap-2 overflow-auto'>

                <div className='flex justify-between items-center w-full gap-2 px-2'>
                    <div className='flex flex-col items-start w-1/5'>
                        <h2>{t("name")}</h2>
                        <h2 className='font-thin'>{getBasketDisplayName(receipt.basketName)}</h2>
                    </div>
                    <div className='flex flex-col items-center w-3/5'>
                        <h2>{t("Open - Close Dates")}</h2>
                        <h2 className='font-thin'>{combinedDateTime(receipt.basketOpenDate)} / {combinedDateTime(receipt.basketCloseDate)}</h2>
                    </div>
                    <div className='flex flex-col items-end w-1/5'>
                        <h2>{t("User")}</h2>
                        <h2 className='font-thin'>Ali</h2>
                    </div>
                </div>

                <div className='py-[0.25px] rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />

                <div className='flex justify-between px-2'>
                    <h2>{t("Orders")}</h2>
                    <h2>{t("Price")}</h2>
                </div>

                <div className='py-[0.25px] rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />

                <div className='flex flex-col gap-1 h-full overflow-auto'>
                    {receipt.orders.map((order) => (
                        order.orderItems.map((orderItem, index) => {

                            return (
                                <div key={index} className='flex flex-col w-full px-2 '>
                                    <div className='flex justify-between font-normal'>
                                        <h2>{orderItem.quantity}x {orderItem.product.name}</h2>
                                        <h2>{t("$")}{orderItem.totalPrice}</h2>
                                    </div>
                                    <div className='flex justify-between font-thin text-base'>
                                        <h2>{combinedDateTime(orderItem.createdDate)}</h2>
                                        <h2>Ali</h2>
                                    </div>
                                </div>
                            )
                        })
                    ))}
                </div>

                <div className='py-[0.25px] rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />

                <div className='flex justify-between px-2'>
                    <h2>{t("Payments")}</h2>
                    <h2>{t("Price")}</h2>
                </div>

                <div className='py-[0.25px] rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />

                <div className='flex flex-col gap-1 h-full overflow-auto'>
                    {receipt.orders.map((order) => (
                        order.payments.map((payment, index) => {

                            return (
                                <div key={index} className='flex flex-col w-full px-2'>
                                    <div className='flex justify-between font-normal'>
                                        <h2>{payment.paymentType === "TYPE_CREDIT_CARD" ? `${t("Credit Card")}` : `${t("Cash")}`}</h2>
                                        <h2>{t("$")}{payment.payAmount}</h2>
                                    </div>
                                    <div className='flex justify-between font-thin text-base'>
                                        <h2>{combinedDateTime(payment.completedDate)}</h2>
                                        <h2>Ali</h2>
                                    </div>
                                </div>
                            )
                        })
                    ))}
                </div>

                <div className='py-[0.25px] rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />

                <div className='flex justify-end px-2 gap-2 font-bold'>
                    <h2>{t("Total Price")}:</h2>
                    <h2 className='text-end min-w-20'>{t("$")}{receipt.totalPrice}</h2>
                </div>
            </div>
        </div>
    );
};


const SmallScreenDetailWindow = ({ children }) => {
    return (
        <div className="fixed inset-0 z-50 size-full bg-black bg-opacity-20">
            <div className='flex items-center justify-center size-full pt-[88px] pb-3 px-6 text-center cursor-default' >
                <div className='bg-dark-5 rounded-xl h-full'>
                    {children}
                </div>
            </div>
        </div>
    );
}