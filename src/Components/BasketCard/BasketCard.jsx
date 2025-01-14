import { Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const BasketCard = ({ basket }) => {
  const [dateTime, setDateTime] = useState();
  const [bgColor, setBgColor] = useState("bg-dark-9");
  const [formattedDate, setFormattedDate] = useState({ value: 0, text: "" });
  const navigate = useNavigate();
  const { t } = useTranslation();



  useEffect(() => {
    if (basket.order) {
      setDateTime(basket.order.updatedDate || basket.order.createdDate);
      setFormattedDate(getFormattedDate(basket.order.updatedDate || basket.order.createdDate));
      setBgColor(getBgColor(basket.order.updatedDate || basket.order.createdDate));
    }
  }, [basket.order]);

  useEffect(() => {
    if (dateTime) {
      const interval = setInterval(() => {
        setFormattedDate(getFormattedDate(dateTime));
        setBgColor(getBgColor(dateTime));
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [dateTime]);

  const handleBasketSelect = () => {
    localStorage.setItem("sidebar", false);
    navigate(`/basket/${basket.name}`, { state: basket });
  };

  const getBasketDisplayName = () => {
    if (basket.customName !== null)
      return basket.customName;
    else {
      const [staticPart, dynamicPart] = basket.name.split(' ');
      return t(staticPart) + " " + dynamicPart;
    }
  }
  return (
    <Grid2 size={{ xs: 2, sm: 4, md: 3, lg: 4 }} className="cursor-pointer" onClick={handleBasketSelect}>
      <div className={`flex flex-col w-full h-full min-h-[180px] p-2 rounded-lg  ${basket.isActive ? `${bgColor} text-light-1` : "bg-dark-9 text-light-7"}`}>
        <div className="h-1/4 text-2xl font-semibold ">
          <h2>{getBasketDisplayName()}</h2>
        </div>
        {basket.isActive ? (
          <div className="h-3/4 w-full">
            <div className="flex flex-col justify-center gap-1 h-2/3 ">
              <h2 className="text-sm font-semibold">{formattedDate.value} {t(formattedDate.text)}</h2>
              <h2>employee</h2>
            </div>
            <div className="h-1/3 flex flex-col justify-center  font-semibold ">
              <h2>{t("Total Price")}: {t("$")}{basket.order.totalPrice}</h2>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Grid2>
  );
};

export default BasketCard;

// Function to format the date
const getFormattedDate = (date) => {

  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now - then) / 1000);


  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return { value: interval, text: "years ago" };
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return { value: interval, text: "months ago" };
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return { value: interval, text: "days ago" };
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return { value: interval, text: "hours ago" };
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return { value: interval, text: "minutes ago" };
  return { value: seconds, text: "seconds ago" };
};

// Function to get the background color based on how much time has passed
const getBgColor = (date) => {
  const now = new Date();
  const then = new Date(date);
  const diffInMs = now - then;
  const minutesSince = Math.floor(diffInMs / 60000);

  if (minutesSince < 30) return "bg-green-600";
  else if (minutesSince < 60) return "bg-yellow-500";
  else return "bg-red-600";
};

