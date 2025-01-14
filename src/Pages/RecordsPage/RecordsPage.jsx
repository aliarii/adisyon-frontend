import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import CustomDropdown from '../../Components/Dropdown/CustomDropdown';
import { getRecordItemsByDay } from '../../State/RecordItem/Action';
import generateDays from '../../Utils/days';
import { separateDateTime } from '../../Utils/formatDate';
import months from '../../Utils/months';
import generateYears from '../../Utils/years';
import recordFilters from '../../Utils/recordFilters';
import SpinningLoading from '../../Components/SpinningLoading';

const useContainerHeight = (ref) => {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const updateHeight = () => {
            if (ref.current) {
                setHeight(ref.current.clientHeight);
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        return () => window.removeEventListener('resize', updateHeight);
    }, [ref]);

    return height;
};

const RecordsPage = () => {
    const { company } = useSelector((store) => store.company)
    const { records, loading } = useSelector((store) => store.record)
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const jwt = localStorage.getItem("jwt");
    const date = useMemo(() => new Date(), []);
    const currentDay = date.getDate();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    const years = useMemo(() => generateYears(2000, currentYear), [currentYear]);

    const [selectedMonth, setSelectedMonth] = useState(months[currentMonth].id);
    const [selectedYear, setSelectedYear] = useState(currentYear.toString());
    const [selectedRecordType, setSelectedRecordType] = useState("ALL");

    const days = useMemo(() => generateDays(selectedMonth, selectedYear), [selectedMonth, selectedYear]);
    const [selectedDay, setSelectedDay] = useState(() => (days.length > 0 ? days[currentDay - 1]?.id : null));

    const reversedRecords = useMemo(() => records.slice().reverse(), [records]);
    const filteredRecords = useMemo(() => {
        if (!Array.isArray(reversedRecords))
            return [];
        if (selectedRecordType === "ALL")
            return reversedRecords;
        if (selectedRecordType === "PAYMENT_RECEIVED")
            return reversedRecords.filter(record =>
                ["ORDER_PAY_ALL", "ORDER_PAY_SELECTIVELY", "ORDER_PAY_AMOUNT"].includes(record.recordItemType)
            );
        return reversedRecords.filter(record => record.recordItemType === selectedRecordType);
    }, [reversedRecords, selectedRecordType]);

    const containerRef = useRef(null);
    const containerHeight = useContainerHeight(containerRef);

    useEffect(() => {
        if (company) {
            if (!days[selectedDay - 1]) {
                setSelectedDay(days[days.length - 1].id);
                return;
            }
            dispatch(getRecordItemsByDay({ jwt, companyId: company.id, year: selectedYear, month: selectedMonth, day: selectedDay, }))
        }
    }, [company, dispatch, jwt, selectedMonth, selectedYear, selectedDay, days])


    const handleSelectDay = (id) => {
        setSelectedDay(id);
        setSelectedRecordType("ALL");
    };
    const handleSelectMonth = (id) => {
        setSelectedMonth(id);
        setSelectedRecordType("ALL");
    };
    const handleSelectYear = (id) => {
        setSelectedYear(id)
        setSelectedRecordType("ALL");
    };
    const handleSelectRecordType = (id) => {
        setSelectedRecordType(id);
    };

    const detectRecordItemType = (record) => {
        const key = record.id;
        switch (record.recordItemType) {
            case "ORDER_ADD":
                return <OrderAddRecordItem key={key} record={record} />
            case "ORDER_REMOVE":
                return <OrderRemoveRecordItem key={key} record={record} />
            case "ORDER_UPDATE":
                return <OrderUpdateRecordItem key={key} record={record} />
            case "ORDER_CANCEL":
                return <OrderCancelRecordItem key={key} record={record} />
            case "ORDER_COMPLETE":
                return <OrderCompleteRecordItem key={key} record={record} />
            case "ORDER_TRANSFER":
                return <OrderTransferRecordItem key={key} record={record} />
            case "ORDER_PAY_ALL":
            case "ORDER_PAY_SELECTIVELY":
            case "ORDER_PAY_AMOUNT":
                return <OrderPaymentReceivedRecordItem key={key} record={record} />
            default:
                return <h2 key={9999999}>{t("Not Found")}</h2>;
        }
    }

    const Row = ({ index, style }) => {
        const record = filteredRecords[index];
        return (
            <div style={{ ...style }}>
                {detectRecordItemType(record)}
            </div>
        );
    };
    return (
        <div
            className="flex flex-col md:flex-row w-full h-full mb-3 text-dark-7 dark:text-light-7 text-lg font-medium overflow-auto gap-2"

        >
            <div className='flex flex-col w-full h-full p-2 gap-2 rounded-xl bg-light-2 dark:bg-dark-7 ' ref={containerRef}>

                <div className='flex flex-col md:flex-row justify-between items-center min-h-8 gap-2'>
                    <h2 >{t("Records")}</h2>
                    <div className="flex flex-col md:flex-row justify-between h-full gap-1 pb-6 md:pb-0">
                        <div className='flex items-center justify-end gap-1'>
                            <CustomDropdown items={recordFilters} selectedItemId={selectedRecordType} handleSelect={handleSelectRecordType} />
                        </div>

                        <div className='flex items-center justify-end gap-1'>
                            <CustomDropdown items={days} selectedItemId={selectedDay} handleSelect={handleSelectDay} />
                            <CustomDropdown items={months} selectedItemId={selectedMonth} handleSelect={handleSelectMonth} />
                            <CustomDropdown items={years} selectedItemId={selectedYear} handleSelect={handleSelectYear} />
                        </div>
                    </div>
                </div>

                <div className='py-0.5 rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />
                <div className='flex flex-col w-full h-full gap-1 overflow-auto text-sm font-normal md:text-lg md:font-semibold'>

                    {loading ? (
                        <SpinningLoading />
                    ) : filteredRecords?.length > 0 ? (
                        containerHeight > 0 && (
                            <List
                                height={containerHeight}
                                itemCount={filteredRecords.length}
                                itemSize={105}
                                width="100%"
                            >
                                {Row}
                            </List>
                        )
                    ) : (
                        <h2>{t("Not Found")}</h2>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RecordsPage


const OrderAddRecordItem = ({ record }) => {
    const { t } = useTranslation();
    return (
        <div className='flex w-full h-[100px] p-2 bg-light-4 dark:bg-dark-5 rounded-lg' >
            <div className='flex flex-col w-fit text-nowrap'>
                <h2>{t("Orders Added")}</h2>
                <h2>{t("User")}</h2>
                <h2>{t("Orders")}</h2>
            </div>
            <div className='flex flex-col pl-2 w-full overflow-auto'>
                <div className='flex justify-between'>
                    <h2>: {getBasketDisplayName(record.currentBasketName, t)}</h2>
                    <h2>{separateDateTime(record.createdDate).time}</h2>
                </div>
                <h2>: {record.userName}</h2>
                <div className='flex w-full gap-1 overflow-auto'>
                    <h2>:</h2>
                    <div className='flex w-full gap-1 overflow-auto text-light-1'>
                        {record.recordItemProducts.map((item, idx) => (
                            <h2 key={idx} className='bg-success px-1 rounded-md'>{" "} {item.currentQuantity}x {item.name}</h2>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

//  {Array.from(Array(100)).map((_, idx) => (
//                     <h2 key={idx}>{idx}</h2>
//                 ))} 

const OrderRemoveRecordItem = ({ record }) => {
    const { t } = useTranslation();
    return (
        <div className='flex w-full h-[100px] p-2 bg-light-4 dark:bg-dark-5 rounded-lg' >
            <div className='flex flex-col w-fit text-nowrap'>
                <h2>{t("Orders Removed")}</h2>
                <h2>{t("User")}</h2>
                <h2>{t("Orders")}</h2>
            </div>
            <div className='flex flex-col pl-2 w-full overflow-auto'>
                <div className='flex justify-between'>
                    <h2>: {getBasketDisplayName(record.currentBasketName, t)}</h2>
                    <h2>{separateDateTime(record.createdDate).time}</h2>
                </div>
                <h2>: {record.userName}</h2>
                <div className='flex w-full gap-1 overflow-auto'>
                    <h2>:</h2>
                    <div className='flex w-full gap-1 overflow-auto text-light-1'>
                        {record.recordItemProducts.map((item, idx) => (
                            <h2 key={idx} className='bg-danger px-1 rounded-md'>{item.oldQuantity}x {item.name}</h2>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const OrderUpdateRecordItem = ({ record }) => {
    const { t } = useTranslation();
    return (
        <div className='flex w-full h-[100px] p-2 bg-light-4 dark:bg-dark-5 rounded-lg' >
            <div className='flex flex-col w-fit text-nowrap'>
                <h2>{t("Orders Updated")}</h2>
                <h2>{t("User")}</h2>
                <h2>{t("Orders")}</h2>
            </div>
            <div className='flex flex-col pl-2 w-full overflow-auto'>
                <div className='flex justify-between'>
                    <h2>: {getBasketDisplayName(record.currentBasketName, t)}</h2>
                    <h2>{separateDateTime(record.createdDate).time}</h2>
                </div>
                <h2>: {record.userName}</h2>
                <div className='flex w-full gap-1 overflow-auto'>
                    <h2>:</h2>
                    <div className='flex w-full gap-1 overflow-auto text-light-1'>
                        {record.recordItemProducts.map((item, idx) => (
                            <h2 key={idx} className='bg-success px-1 rounded-md text-nowrap'>{item.name} ({item.oldQuantity}x{" -> "}{item.currentQuantity}x)</h2>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const OrderCancelRecordItem = ({ record }) => {
    const { t } = useTranslation();
    return (
        <div className='flex w-full h-[100px] p-2 bg-light-4 dark:bg-dark-5 rounded-lg' >
            <div className='flex flex-col w-fit text-nowrap'>
                <h2>{t("Orders Canceled")}</h2>
                <h2>{t("User")}</h2>
                <h2>{t("Orders")}</h2>
            </div>
            <div className='flex flex-col pl-2 w-full overflow-auto'>
                <div className='flex justify-between'>
                    <h2>: {getBasketDisplayName(record.currentBasketName, t)}</h2>
                    <h2>{separateDateTime(record.createdDate).time}</h2>
                </div>
                <h2>: {record.userName}</h2>
                <div className='flex w-full gap-1 overflow-auto'>
                    <h2>:</h2>
                    <div className='flex w-full gap-1 overflow-auto text-light-1'>
                        {record.recordItemProducts.map((item, idx) => (
                            <h2 key={idx} className='bg-danger px-1 rounded-md'>{item.oldQuantity}x {item.name}</h2>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
const OrderCompleteRecordItem = ({ record }) => {
    const { t } = useTranslation();
    return (
        <div className='flex w-full h-[100px] p-2 bg-light-4 dark:bg-dark-5 rounded-lg' >
            <div className='flex flex-col w-fit text-nowrap'>
                <h2>{t("Orders Completed")}</h2>
                <h2>{t("User")}</h2>
                <h2>{t("Orders")}</h2>
            </div>
            <div className='flex flex-col pl-2 w-full overflow-auto'>
                <div className='flex justify-between'>
                    <h2>: {getBasketDisplayName(record.currentBasketName, t)}</h2>
                    <h2>{separateDateTime(record.createdDate).time}</h2>
                </div>
                <h2>: {record.userName}</h2>
                <div className='flex w-full gap-1 overflow-auto'>
                    <h2>:</h2>
                    <div className='flex w-full gap-1 overflow-auto text-light-1'>
                        {record.recordItemProducts.map((item, idx) => (
                            <h2 key={idx} className='bg-success px-1 rounded-md'>{item.currentQuantity}x {item.name}</h2>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
const OrderTransferRecordItem = ({ record }) => {
    const { t } = useTranslation();

    return (
        <div className='flex w-full h-[100px] p-2 bg-light-4 dark:bg-dark-5 rounded-lg' >
            <div className='flex flex-col w-fit text-nowrap'>
                <h2>{t("Orders Moved")}</h2>
                <h2>{t("User")}</h2>
                <h2>{t("Orders")}</h2>
            </div>
            <div className='flex flex-col pl-2 w-full overflow-auto'>
                <div className='flex justify-between'>
                    <h2>: {getBasketDisplayName(record.currentBasketName, t)} {"->"} {getBasketDisplayName(record.targetBasketName, t)}</h2>
                    <h2>{separateDateTime(record.createdDate).time}</h2>
                </div>
                <h2>: {record.userName}</h2>
                <div className='flex w-full gap-1 overflow-auto'>
                    <h2>:</h2>
                    <div className='flex w-full gap-1 overflow-auto text-light-1'>
                        {record.recordItemProducts.map((item, idx) => (
                            <h2 key={idx} className='bg-success px-1 rounded-md'>{" "} {item.currentQuantity}x {item.name}</h2>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const OrderPaymentReceivedRecordItem = ({ record }) => {
    const { t } = useTranslation();

    return (
        <div className='flex w-full h-[100px] p-2 bg-light-4 dark:bg-dark-5 rounded-lg' >
            <div className='flex flex-col w-fit text-nowrap'>
                <h2>{t("Payment Received")}</h2>
                <h2>{t("User")}</h2>
                <h2>{t("Payment Type")}</h2>
            </div>
            <div className='flex flex-col pl-2 w-full overflow-auto'>
                <div className='flex justify-between'>
                    <h2>: {getBasketDisplayName(record.currentBasketName, t)}</h2>
                    <h2>{separateDateTime(record.createdDate).time}</h2>
                </div>
                <h2>: {record.userName}</h2>
                <div className='flex w-full gap-1 overflow-auto'>
                    <h2>:</h2>
                    <h2 className='px-1 rounded-md text-light-1 bg-info' >{t("$")}{record.payAmount} - {t(record.paymentType === "TYPE_CASH" ? "Cash" : "Credit Card")}</h2>
                </div>
            </div>
        </div>
    )
}

const getBasketDisplayName = (name, t) => {
    const [staticPart, dynamicPart] = name.split(' ');
    return t(staticPart) + " " + dynamicPart;
}