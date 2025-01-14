import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown from '../../Components/Dropdown/CustomDropdown';
import { getReportByDay, getReportsByMonth, getReportByMonth, getReportBySelectedDay, getReportBySelectedMonth, getReportByYear } from "../../State/Report/Action";
import months from '../../Utils/months';
import generateYears from '../../Utils/years';
import { localDate, monthName } from "../../Utils/formatDate";
import SpinningLoading from "../../Components/SpinningLoading";


const ReportPage = () => {
  const { company } = useSelector((store) => store.company);
  const { reportByDay, reportByMonth, reportByYear, reportsByMonth, reportBySelectedDay, reportBySelectedMonth, loading } = useSelector((store) => store.report);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');

  const date = useMemo(() => new Date(), []);
  const currentDay = String(date.getDate()).padStart(2, '0');
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  const formattedCurrentDate = `${currentYear}-${currentMonth}-${currentDay}`
  const years = useMemo(() => generateYears(2000, currentYear), [currentYear]);

  const [selectedDay, setSelectedDay] = useState();
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonth - 1].id);
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());

  useEffect(() => {
    if (company) {
      dispatch(getReportByDay({ jwt, companyId: company.id, date: formattedCurrentDate }));
      dispatch(getReportByMonth({ jwt, companyId: company.id, year: currentYear, month: currentMonth }));
      dispatch(getReportByYear({ jwt, companyId: company.id, year: currentYear }));
    }
  }, [company, dispatch, formattedCurrentDate, jwt, currentMonth, currentYear])

  useEffect(() => {
    if (company) {
      dispatch(getReportsByMonth({ jwt, companyId: company.id, year: selectedYear, month: (selectedMonth) }));
      dispatch(getReportBySelectedMonth({ jwt, companyId: company.id, year: selectedYear, month: selectedMonth }));
    }
  }, [company, dispatch, selectedMonth, jwt, selectedYear]);

  useEffect(() => {
    if (company) {
      if (selectedDay !== undefined) {
        dispatch(getReportBySelectedDay({ jwt, companyId: company.id, date: selectedDay }));
      }
    }
  }, [company, dispatch, jwt, selectedDay]);

  useEffect(() => {
    if (reportsByMonth.length > 0) {
      if (selectedDay === undefined) {
        setSelectedDay(reportsByMonth[0].date);
      }
    } else {
      setSelectedDay(undefined);
    }
    //added selected day.
  }, [reportsByMonth, selectedDay]);

  const handleSelectMonth = (id) => {
    setSelectedDay(undefined);
    setSelectedMonth(id);
  };
  const handleSelectYear = (id) => {
    setSelectedDay(undefined);
    setSelectedYear(id)
  };
  const handleSelectDay = (date) => {
    setSelectedDay(date);
  };

  return (

    // <div className='flex flex-col w-full h-full mb-3 p-2 overflow-auto font-medium rounded-xl gap-2 bg-light-2 dark:bg-dark-7 text-dark-7 dark:text-light-7'>
    <div className='flex flex-col w-full h-full mb-3 font-medium gap-2 text-dark-7 dark:text-light-7 overflow-auto'>

      <div className="flex flex-col md:flex-row w-full h-full gap-2">
        <div className="flex flex-col w-full h-full p-2 rounded-xl bg-light-2 dark:bg-dark-7">
          {loading ?
            <SpinningLoading /> : <ReportCard report={reportByDay} />
          }
        </div>
        <div className="flex flex-col w-full h-full p-2 rounded-xl bg-light-2 dark:bg-dark-7">
          {loading ?
            <SpinningLoading /> : <ReportCard report={reportByMonth} />}
        </div>
        <div className="flex flex-col w-full h-full p-2 rounded-xl bg-light-2 dark:bg-dark-7">
          {loading ?
            <SpinningLoading /> : <ReportCard report={reportByYear} />}
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full h-full gap-2">
        <div className="flex flex-col p-2 h-full w-full min-h-52 gap-2 rounded-xl bg-light-2 dark:bg-dark-7 overflow-auto">

          <div className="flex justify-between items-center">
            <h2>{t("Daily Reports")}</h2>
            <div className="flex gap-1">
              <CustomDropdown items={months} selectedItemId={selectedMonth} handleSelect={handleSelectMonth} />
              <CustomDropdown items={years} selectedItemId={selectedYear} handleSelect={handleSelectYear} />
            </div>
          </div>
          <DailyReportsTable reportsByMonth={reportsByMonth} handleSelectDay={handleSelectDay} />
        </div>

        <div className="flex flex-col md:flex-row size-full gap-2">
          <div className="flex flex-col w-full h-full p-2 gap-2 rounded-xl bg-light-2 dark:bg-dark-7">
            <div className="text-center">
              <h2>{t("Selected Day")}</h2>
            </div>
            {selectedDay ?

              (loading ?
                <SpinningLoading /> : <ReportCard report={reportBySelectedDay} />)
              :
              <h2 className='w-full text-center'>{t("Not Found")}</h2>
            }
          </div>
          <div className="flex flex-col w-full h-full p-2 gap-2 rounded-xl bg-light-2 dark:bg-dark-7">
            <div className="text-center">
              <h2>{t("Selected Month")}</h2>
            </div>
            {reportsByMonth?.length > 0 ?

              (loading ?
                <SpinningLoading /> : <ReportCard report={reportBySelectedMonth} />)
              :
              <h2 className='w-full text-center'>{t("Not Found")}</h2>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;

const ReportCard = ({ report }) => {
  const { t } = useTranslation();

  const [visibleDate, setVisibleDate] = useState('');


  useEffect(() => {
    if (report?.date) {
      setVisibleDate(localDate(report?.date));
    }
    else if (report?.month) {
      setVisibleDate(monthName(report?.month));
    }
    else if (report?.year) {
      setVisibleDate(report.year);
    }
  }, [report])

  return (
    <div className="flex flex-col w-full h-full">
      <h2 className="text-xl font-bold">{t("$")}{report?.paidTotal}</h2>
      <h2 className="text-base font-normal">{t(visibleDate)}</h2>
      <div className="flex justify-between text-sm font-bold">
        <h2>{t("Open Baskets")}</h2>
        <h2>{t("$")}{report?.pendingOrdersTotalPrice}</h2>
      </div>
      <div className="flex justify-between text-sm font-bold">
        <h2>{t("Open Baskets")}</h2>
        <h2>{report?.pendingOrdersCount}</h2>
      </div>
      <div className="flex justify-between text-sm font-bold">
        <h2>{t("Completed Orders")}</h2>
        <h2>{report?.completedOrdersCount}</h2>
      </div>
      <div className="flex justify-between text-sm font-bold">
        <h2>{t("Cash Payments")}</h2>
        <h2>{t("$")}{report?.cashPaidTotal}</h2>
      </div>
      <div className="flex justify-between text-sm font-bold">
        <h2>{t("Credit Card Payments")}</h2>
        <h2>{t("$")}{report?.creditCardPaidTotal}</h2>
      </div>
    </div>
  )
}

const DailyReportsTable = ({ reportsByMonth, handleSelectDay }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col h-full w-full rounded-md text-xs uppercase text-left overflow-auto">
      <div className="flex items-center min-h-10 w-full px-3 bg-light-5 dark:bg-dark-5 sticky top-0 z-10">
        <h2 className="w-full">{t("Date")}</h2>
        <h2 className="w-full">{t("Cash")}</h2>
        <h2 className="w-full">{t("Credit Card")}</h2>
        <h2 className="w-full">{t("Total Price")}</h2>
      </div>

      <div className="flex flex-col h-full w-full bg-light-7 dark:bg-dark-6 overflow-auto">
        {reportsByMonth?.map((report, idx) => (
          <div key={idx} className="flex items-center min-h-8 w-full px-3 border-b dark:border-dark-7 cursor-pointer" onClick={() => handleSelectDay(report.date)}>
            <h2 className="size-full py-2 whitespace-nowrap">{report.date}</h2>
            <h2 className="size-full py-2">{t("$")}{report.cashPaidTotal}</h2>
            <h2 className="size-full py-2">{t("$")}{report.creditCardPaidTotal}</h2>
            <h2 className="size-full py-2">{t("$")}{report.paidTotal}</h2>
          </div>
        ))}

      </div>
    </div>
  )
}
