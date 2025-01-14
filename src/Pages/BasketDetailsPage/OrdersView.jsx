import React, { useEffect, useState } from "react";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Grid2 } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { deactivateBasket } from '../../State/Basket/Action';
import { useTranslation } from "react-i18next";
import BtnMdCancel from "../../Components/Button/BtnMdCancel";
import BtnMdSave from "../../Components/Button/BtnMdSave";
import { getCompanyById, getCompanyByUserId } from "../../State/Company/Action";
import {
  deleteOrder,
  getOrderByBasketId,
  getOrderById,
  payAllOrders,
  payAmount,
  paySelectedOrders,
  transferOrders,
  updateOrder,
} from "../../State/Order/Action";
import { createRecordItem } from "../../State/RecordItem/Action";

const OrdersView = () => {
  const { order } = useSelector((state) => state.order);
  const { basket } = useSelector((state) => state.basket);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [selectedPaymentWindow, setSelectedPaymentWindow] = useState(null);
  const [showPaymentWindow, setShowPaymentWindow] = useState(false);

  const windows = [
    (props) => (
      <PayOrdersWindow handleWindowSelect={handleWindowSelect} {...props} />
    ),
    (props) => (
      <PaySelectedOrdersWindow
        handleWindowSelect={handleWindowSelect}
        {...props}
      />
    ),
    (props) => (
      <PayAmountWindow handleWindowSelect={handleWindowSelect} {...props} />
    ),
    (props) => (
      <TransferOrdersWindow
        handleWindowSelect={handleWindowSelect}
        {...props}
      />
    ),
    (props) => (
      <EditOrdersWindow
        handleWindowSelect={handleWindowSelect}
        pendingOrders={pendingOrders}
        {...props}
      />
    ),
  ];

  const handleWindowSelect = (index, props = {}) => {
    if (index === null) {
      setSelectedPaymentWindow(null);
      setShowPaymentWindow(false);
    } else {
      setSelectedPaymentWindow(windows[index](props));
      setShowPaymentWindow(true);
    }
  };

  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    if (basket) dispatch(getOrderByBasketId(basket.id));
  }, [basket, dispatch]);

  useEffect(() => {
    const pendingItems =
      order?.orderItems?.filter((item) => item.status === "STATUS_PENDING") ||
      [];
    setPendingOrders(pendingItems);
  }, [order]);

  return (
    <div className="flex flex-col h-full gap-1 p-1 pt-0 overflow-auto">
      <div
        className={`flex flex-col h-5/6 w-full overflow-auto relative ${
          selectedPaymentWindow ? "overflow-hidden" : ""
        }`}
      >
        {showPaymentWindow && (
          <>
            <div className="hidden md:block">
              <MediumOrAboveScreenPayWindow>
                {selectedPaymentWindow}
              </MediumOrAboveScreenPayWindow>
            </div>

            <div className="visible md:hidden">
              <SmallScreenPayWindow onClose={() => handleWindowSelect(null)}>
                {selectedPaymentWindow}
              </SmallScreenPayWindow>
            </div>
          </>
        )}
        <div className="flex flex-col gap-1 size-full ">
          {pendingOrders.length > 0 ? (
            pendingOrders.map((item, index) => (
              <div key={index}>
                <OrderItem
                  item={item}
                  handleWindowSelect={handleWindowSelect}
                />
                <div className="mx-1 py-[0.25px] rounded-full bg-dark-1 dark:bg-light-10 text-dark-1 dark:text-light-10" />
              </div>
            ))
          ) : (
            <h2>{t("Not Found")}.</h2>
          )}
        </div>
      </div>
      {pendingOrders.length > 0 && (
        <div className="flex flex-col gap-1">
          {/* <hr className='border-light-10 rounded border-2' /> */}
          <div className="py-0.5 rounded-full bg-dark-1 dark:bg-light-10 text-dark-1 dark:text-light-10" />

          <div className="flex justify-between text-end">
            <h2>{t("Total Price")}:</h2>
            <h2>
              {t("$")}
              {order?.totalPrice}
            </h2>
          </div>
          {order?.payments?.length > 0 && (
            <div className="flex justify-between text-end text-sm">
              <h2>{t("Payment History")}:</h2>
              <h2>
                -{t("$")}
                {order?.payments
                  ?.reduce((total, item) => total + item.payAmount, 0)
                  .toFixed(2)}
              </h2>
            </div>
          )}
        </div>
      )}
      {pendingOrders.length > 0 ? (
        <div className="h-fit bg-light-6 dark:bg-dark-3 rounded-lg">
          <OrdersController
            handleWindowSelect={handleWindowSelect}
            pendingOrders={pendingOrders}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default OrdersView;

const OrderItem = ({ item, handleWindowSelect }) => {
  const { t } = useTranslation();
  const handleEditClick = () => handleWindowSelect(4, {});
  return (
    <div className="flex items-center justify-between p-1 size-full">
      <div className="flex h-full w-3/6 justify-start gap-2">
        <h2>x{item.quantity}</h2>
        <h2>{item.product.name}</h2>
      </div>
      <div className="flex w-3/6 justify-end gap-2">
        <h2>
          {t("$")}
          {item.product.price * item.quantity}
        </h2>
        <EditIcon
          className="self-center cursor-pointer"
          onClick={() => handleEditClick()}
        />
      </div>
    </div>
  );
};

const OrdersController = ({ handleWindowSelect, pendingOrders }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { basket } = useSelector((state) => state.basket);
  const auth = useSelector((store) => store.auth);
  const jwt = localStorage.getItem("jwt");

  const handlePayOrders = () => handleWindowSelect(0, { pendingOrders });
  const handlePaySelectedOrders = () =>
    handleWindowSelect(1, { pendingOrders });
  const handlePayAmount = () => handleWindowSelect(2);
  const handleTransferOrders = () => handleWindowSelect(3, { pendingOrders });

  const handleCancelOrders = () => {
    const reqData = {
      jwt,
      data: {
        id: basket?.order?.id,
      },
    };
    const recordReqData = {
      jwt,
      data: {
        currentBasketId: basket.id,
        recordItemType: "ORDER_CANCEL",
      },
    };
    dispatch(createRecordItem(recordReqData))
      .then(() => {
        return dispatch(deleteOrder(reqData));
      })
      .then(() => {
        return dispatch(getCompanyByUserId(auth.user, jwt));
      })
      .then(() => {
        navigate(`/adisyon-frontend/baskets`);
      });
  };

  // const handleDeactivateBasket = () => dispatch(deactivateBasket(jwt, basket?.id));

  return (
    <div className="flex flex-col size-full p-2 items-center justify-end gap-2 text-center text-light-1">
      <div className="flex flex-row size-full items-center justify-center gap-2">
        <div
          className="w-full bg-success p-1 rounded-lg cursor-pointer"
          onClick={handlePayOrders}
        >
          <h2>{t("Pay All")}</h2>
        </div>
        <div
          className="w-full bg-success p-1 rounded-lg cursor-pointer"
          onClick={handlePaySelectedOrders}
        >
          <h2>{t("Pay Selectively")}</h2>
        </div>
        <div
          className="w-full bg-success p-1 rounded-lg cursor-pointer"
          onClick={handlePayAmount}
        >
          <h2>{t("Pay Amount")}</h2>
        </div>
        {/* <div className='bg-red-500 p-1 rounded-lg cursor-pointer' onClick={handleCloseBasket}>Cancel</div> */}
      </div>
      <div className="flex flex-row size-full items-center justify-center gap-2">
        <div
          className="w-full bg-info p-1 rounded-lg cursor-pointer"
          onClick={handleTransferOrders}
        >
          <h2>{t("Transfer")}</h2>
        </div>
        <div
          className="w-full bg-danger p-1 rounded-lg cursor-pointer"
          onClick={handleCancelOrders}
        >
          <h2>{t("Cancel Order")}</h2>
        </div>
        {/* <div className='w-full bg-red-500 p-1 rounded-lg cursor-pointer' onClick={handleDeactivateBasket}></div> */}
      </div>
    </div>
  );
};

const EditOrdersWindow = ({ handleWindowSelect, pendingOrders }) => {
  const { t } = useTranslation();
  const [copyOrders, setCopyOrders] = useState(pendingOrders);
  const { order } = useSelector((store) => store.order);
  const { basket } = useSelector((store) => store.basket);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const updateOrderItem = (newOrderItem) => {
    const updatedOrders = copyOrders.map((item) =>
      item.id === newOrderItem.id
        ? {
            ...item,
            quantity: newOrderItem.quantity,
          }
        : item
    );
    setCopyOrders(updatedOrders);
  };

  const handleSave = () => {
    const orderId = order.id;
    const reqData = {
      jwt,
      data: {
        id: orderId,
        orderItems: copyOrders,
      },
    };
    const recordReqData = {
      jwt,
      data: {
        currentBasketId: basket.id,
        recordItemType: "ORDER_UPDATE",
        orderItems: copyOrders,
      },
    };
    dispatch(createRecordItem(recordReqData))
      .then(() => {
        return dispatch(updateOrder(reqData));
      })
      .then(() => {
        return dispatch(getOrderById(jwt, orderId));
      })
      .then(() => handleWindowSelect(null));
  };
  return (
    <div className="flex flex-col size-full p-2 overflow-auto">
      <h2 className="h-fit p-2">{t("Edit Order")}</h2>
      <div className="flex flex-col size-full gap-2 overflow-auto">
        <h2>{t("Orders")}</h2>
        <div className="w-full h-full px-2 flex flex-col gap-1 overflow-auto">
          {pendingOrders.map((item) => (
            <EditOrderItem
              order={item}
              key={item.id}
              orderItem={item}
              updateOrderItem={updateOrderItem}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-end h-fit pt-2 gap-2 text-light-1">
        <BtnMdSave clickEvent={() => handleSave()} />
        <BtnMdCancel clickEvent={() => handleWindowSelect(null)} />
      </div>
    </div>
  );
};

const EditOrderItem = ({ orderItem, updateOrderItem }) => {
  const [orgOrderItem] = useState(orderItem);
  const [tempOrderItem, setTempOrderItem] = useState(orderItem);
  const { t } = useTranslation();
  const updateTempOrderQuantity = (toAddQuantity) => {
    setTempOrderItem((prevOrder) => {
      const newQuantity = prevOrder.quantity + toAddQuantity;
      if (newQuantity >= 0) {
        return {
          ...prevOrder,
          quantity: newQuantity,
        };
      }
      return prevOrder; // No change if conditions are not met
    });
  };

  useEffect(() => {
    if (tempOrderItem) {
      updateOrderItem(tempOrderItem);
    }
  }, [tempOrderItem]);

  return (
    <div className="flex items-center justify-between px-2 py-1 rounded-lg bg-light-6 dark:bg-dark-2">
      <div className="w-3/6 flex items-center justify-start">
        <h2>{orgOrderItem.product.name}</h2>
      </div>
      <div className="w-3/6 flex items-center justify-end gap-2">
        <div className="w-24 flex justify-center items-center gap-1">
          <AddCircleIcon
            className="cursor-pointer"
            onClick={() => {
              updateTempOrderQuantity(1);
            }}
          />
          <h2 className="w-6 text-center">{tempOrderItem.quantity}</h2>
          <RemoveCircleIcon
            className="cursor-pointer"
            onClick={() => {
              updateTempOrderQuantity(-1);
            }}
          />
        </div>
        <h2 className="min-w-12">
          {t("$")}
          {tempOrderItem.quantity * orgOrderItem.product.price}
        </h2>
        <CancelIcon
          className="cursor-pointer"
          onClick={() => {
            updateTempOrderQuantity(-tempOrderItem.quantity);
          }}
        />
      </div>
    </div>
  );
};

const PayOrdersWindow = ({ handleWindowSelect, pendingOrders }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { basket } = useSelector((state) => state.basket);
  const auth = useSelector((store) => store.auth);
  const jwt = localStorage.getItem("jwt");

  const handlePayAllOrders = (type) => {
    const reqData = {
      jwt,
      data: {
        id: basket?.order?.id,
        paymentType: type === "Cash" ? "TYPE_CASH" : "TYPE_CREDIT_CARD",
      },
    };
    const recordReqData = {
      jwt,
      data: {
        currentBasketId: basket.id,
        recordItemType: "ORDER_PAY_ALL",
        paymentType: type === "Cash" ? "TYPE_CASH" : "TYPE_CREDIT_CARD",
      },
    };
    dispatch(createRecordItem(recordReqData))
      .then(() => {
        return dispatch(payAllOrders(reqData));
      })
      .then(() => {
        return dispatch(getCompanyByUserId(auth.user, jwt));
      })
      .then(() => {
        navigate(`/adisyon-frontend/baskets`);
      });
  };

  return (
    <div className="flex flex-col size-full p-2 overflow-auto">
      <h2 className="h-fit p-2">{t("Pay All")}</h2>
      <div className="flex flex-col size-full gap-2 overflow-auto">
        <h2>{t("Orders")}</h2>
        <div className="w-full h-full px-2  flex flex-col gap-1 overflow-auto">
          {pendingOrders.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-2 py-1 rounded-lg bg-light-6 dark:bg-dark-2"
            >
              <div className="flex h-full w-3/6 justify-start gap-2">
                <h2>{item.quantity + "x"}</h2>
                <h2>{item.product.name}</h2>
              </div>
              <div className="flex w-3/6 justify-end gap-2">
                <h2>
                  {t("$")}
                  {item.product.price * item.quantity}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-end py-1 px-2">
        {t("Total Price")}: {t("$")}
        {basket.order.totalPrice.toFixed(2)}
      </h2>
      <div className="h-fit p-2 text-light-1">
        <div className="flex gap-2">
          <button
            className="w-full mb-2 py-1 rounded-lg bg-success"
            onClick={() => handlePayAllOrders("Cash")}
          >
            <h2>{t("Cash")}</h2>
          </button>
          <button
            className="w-full mb-2 py-1 rounded-lg bg-success"
            onClick={() => handlePayAllOrders("CreditCard")}
          >
            <h2>{t("Credit Card")}</h2>
          </button>
        </div>
        <button
          className="w-full py-1 rounded-lg bg-danger"
          onClick={() => handleWindowSelect(null)}
        >
          <h2>{t("Cancel")}</h2>
        </button>
      </div>
    </div>
  );
};

const PaySelectedOrdersWindow = ({ handleWindowSelect, pendingOrders }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector((state) => state.order);
  const { basket } = useSelector((state) => state.basket);
  const auth = useSelector((store) => store.auth);

  const [copyOrders, setCopyOrders] = useState([]);

  useEffect(() => {
    const updatedOrders = pendingOrders.map((item) => ({
      ...item,
      quantity: 0,
    }));
    setCopyOrders(updatedOrders);
  }, [pendingOrders]);

  const updateOrderItem = (newOrderItem) => {
    const updatedOrders = copyOrders.map((item) =>
      item.id === newOrderItem.id
        ? {
            ...item,
            quantity: newOrderItem.quantity,
          }
        : item
    );
    setCopyOrders(updatedOrders);
  };

  const handlePaySelectedOrders = (type) => {
    const reqData = {
      jwt,
      data: {
        id: order.id,
        orderItems: copyOrders,
        paymentType: type === "Cash" ? "TYPE_CASH" : "TYPE_CREDIT_CARD",
      },
    };
    const recordReqData = {
      jwt,
      data: {
        currentBasketId: basket.id,
        recordItemType: "ORDER_PAY_SELECTIVELY",
        orderItems: copyOrders,
        paymentType: type === "Cash" ? "TYPE_CASH" : "TYPE_CREDIT_CARD",
      },
    };
    dispatch(createRecordItem(recordReqData))
      .then(() => {
        return dispatch(paySelectedOrders(reqData));
      })
      .then(() => handleWindowSelect(null))
      .then(() => {
        return dispatch(getCompanyByUserId(auth.user, jwt));
      })
      .then(() => {
        return dispatch(getOrderById(jwt, order.id));
      });
  };

  const calculateTotalPrice = () => {
    const total = copyOrders?.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );
    // const paid = order?.payments?.reduce((total, item) => total + item.payAmount, 0);
    return total;
  };
  return (
    <div className="flex flex-col size-full p-2 overflow-auto">
      <h2 className="h-fit p-2">{t("Pay Selectively")}</h2>
      <div className="flex flex-col size-full gap-2 overflow-auto">
        <h2>{t("Choose what you want to pay")}</h2>
        <div className="w-full h-full px-2  flex flex-col gap-1 overflow-auto">
          {pendingOrders.map((item) => (
            <PaySelectedOrderItem
              key={item.id}
              orderItem={item}
              updateOrderItem={updateOrderItem}
            />
          ))}
        </div>
      </div>
      <h2 className="text-end py-1 px-2">
        {t("Total Price")}: {t("$")}
        {calculateTotalPrice().toFixed(2)}
      </h2>
      <div className="h-fit p-2 text-light-1">
        <div className="flex gap-2">
          <button
            className="w-full mb-2 py-1 rounded-lg bg-success"
            onClick={() => handlePaySelectedOrders("Cash")}
          >
            <h2>{t("Cash")}</h2>
          </button>
          <button
            className="w-full mb-2 py-1 rounded-lg bg-success"
            onClick={() => handlePaySelectedOrders("CreditCard")}
          >
            <h2>{t("Credit Card")}</h2>
          </button>
        </div>
        <button
          className="w-full py-1 rounded-lg bg-danger"
          onClick={() => handleWindowSelect(null)}
        >
          <h2>{t("Cancel")}</h2>
        </button>
      </div>
    </div>
  );
};

const PaySelectedOrderItem = ({ orderItem, updateOrderItem }) => {
  const [orgOrderItem] = useState(orderItem);
  const [tempOrderItem, setTempOrderItem] = useState({
    ...orderItem,
    quantity: 0,
  });
  const { t } = useTranslation();

  const updateTempOrderQuantity = (toAddQuantity) => {
    setTempOrderItem((prevOrder) => {
      const newQuantity = prevOrder.quantity + toAddQuantity;
      if (newQuantity >= 0 && newQuantity <= orgOrderItem.quantity) {
        return {
          ...prevOrder,
          quantity: newQuantity,
        };
      }
      return prevOrder;
    });
  };

  useEffect(() => {
    if (tempOrderItem) {
      updateOrderItem(tempOrderItem);
    }
  }, [tempOrderItem]);
  return (
    <div className="flex items-center justify-between px-2 py-1 rounded-lg bg-light-6 dark:bg-dark-2">
      <div className="w-3/6 flex items-center justify-start">
        <h2>{orgOrderItem.product.name}</h2>
      </div>
      <div className="w-3/6 flex items-center justify-end gap-2 ">
        <div className="w-24 flex justify-center items-center gap-1">
          <AddCircleIcon
            className="cursor-pointer"
            onClick={() => {
              updateTempOrderQuantity(1);
            }}
          />
          <h2 className="w-6 text-center">{tempOrderItem.quantity}</h2>
          <RemoveCircleIcon
            className="cursor-pointer"
            onClick={() => {
              updateTempOrderQuantity(-1);
            }}
          />
        </div>
        <h2 className="min-w-12">
          {t("$")}
          {tempOrderItem.quantity * orgOrderItem.product.price}
        </h2>
      </div>
    </div>
  );
};

const PayAmountWindow = ({ handleWindowSelect }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector((state) => state.order);
  const { basket } = useSelector((state) => state.basket);
  const [errorMessage, setErrorMessage] = useState();
  const { t } = useTranslation();

  const [enteredQuantity, setEnteredQuantity] = useState(0);

  const handlePay = (type) => {
    if (
      enteredQuantity === 0 ||
      enteredQuantity < 0 ||
      enteredQuantity > order.totalPrice
    ) {
      handleWindowSelect(null);
    } else {
      const reqData = {
        jwt,
        data: {
          id: order.id,
          payAmount: enteredQuantity,
          paymentType: type === "Cash" ? "TYPE_CASH" : "TYPE_CREDIT_CARD",
        },
      };
      const recordReqData = {
        jwt,
        data: {
          currentBasketId: basket.id,
          recordItemType: "ORDER_PAY_AMOUNT",
          payAmount: enteredQuantity,
          paymentType: type === "Cash" ? "TYPE_CASH" : "TYPE_CREDIT_CARD",
        },
      };
      dispatch(createRecordItem(recordReqData))
        .then(() => {
          return dispatch(payAmount(reqData));
        })
        .then(() => {
          return handleWindowSelect(null);
        });
    }
  };

  const handleInputChange = (event) => {
    //const value = Number(event.target.value);
    const value = event.target.value;
    //setEnteredQuantity(value);

    if (value > order.totalPrice) {
      setErrorMessage("Must be equal or less than total.");
      setEnteredQuantity(0);
    } else if (value < 0) {
      setErrorMessage("Must be 0 or bigger then 0"); // Ensure it's non-negative
      setEnteredQuantity(0);
    } else {
      setErrorMessage(undefined);
      setEnteredQuantity(value);
    }
  };

  return (
    <div className="flex flex-col size-full p-2 overflow-auto">
      <h2 className="h-fit p-2">{t("Pay Amount")}</h2>
      <div className="flex flex-col size-full gap-2 overflow-auto">
        <h2>{t("Enter pay amount")}</h2>
        <div className="flex flex-col items-center justify-center w-full h-full px-2 overflow-auto">
          <h2 className="h-fit p-2">{t("Amount")}:</h2>
          <input
            className={`w-40 py-1 px-2 border text-center border-light-10 outline-none bg-white rounded-lg text-black [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none`}
            type="number"
            value={enteredQuantity}
            onChange={handleInputChange}
            onFocus={(e) => e.target.select()}
          />
          {errorMessage && (
            <h2 className="h-fit p-2 text-red-500">*{t(errorMessage)}</h2>
          )}
        </div>
      </div>
      <div className="h-fit p-2 text-light-1">
        <div className="flex gap-2">
          <button
            className="w-full mb-2 py-1 rounded-lg bg-success"
            onClick={() => handlePay("Cash")}
          >
            <h2>{t("Cash")}</h2>
          </button>
          <button
            className="w-full mb-2 py-1 rounded-lg bg-success"
            onClick={() => handlePay("CreditCard")}
          >
            <h2>{t("Credit Card")}</h2>
          </button>
        </div>
        <button
          className="w-full py-1 rounded-lg bg-danger"
          onClick={() => handleWindowSelect(null)}
        >
          <h2>{t("Cancel")}</h2>
        </button>
      </div>
    </div>
  );
};

const TransferOrdersWindow = ({ handleWindowSelect, pendingOrders }) => {
  const { company } = useSelector((store) => store.company);
  const { order } = useSelector((store) => store.order);
  const { basket } = useSelector((store) => store.basket);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const [curWindow, setCurWindow] = useState(0);
  const [copyOrders, setCopyOrders] = useState(pendingOrders);
  const [selectedBasket, setSelectedBasket] = useState(null);

  const updateOrderItem = (newOrderItem) => {
    const updatedOrders = copyOrders.map((item) =>
      item.id === newOrderItem.id
        ? {
            ...item,
            quantity: newOrderItem.quantity,
          }
        : item
    );
    setCopyOrders(updatedOrders);
  };
  const handleBasketSelect = (basket) => {
    setSelectedBasket(basket);
  };
  const handleCompleteTransfer = () => {
    const orderId = order.id;
    const targetBasketId = selectedBasket.id;
    const reqData = {
      jwt,
      data: {
        id: orderId,
        basketId: targetBasketId,
        orderItems: copyOrders,
      },
    };
    const recordReqData = {
      jwt,
      data: {
        currentBasketId: basket.id,
        targetBasketId: targetBasketId,
        recordItemType: "ORDER_TRANSFER",
        orderItems: copyOrders,
      },
    };
    dispatch(createRecordItem(recordReqData))
      .then(() => {
        return dispatch(transferOrders(reqData));
      })
      .then(() => {
        return dispatch(getCompanyById(company.id, jwt));
      })
      .then(() => {
        navigate(`/adisyon-frontend/baskets`);
      })
      .then(() => {
        navigate(`/adisyon-frontend/basket/${selectedBasket.name}`, {
          state: selectedBasket,
        });
      })
      .then(() => handleWindowSelect(null));
  };

  const getBasketDisplayName = (item) => {
    if (item.customName !== null) return item.customName;
    else {
      const [staticPart, dynamicPart] = item.name.split(" ");
      return t(staticPart) + " " + dynamicPart;
    }
  };

  const windows = [
    <div className="flex flex-col size-full gap-2 overflow-auto">
      <h2>{t("Select items")}</h2>
      <div className="w-full h-full px-2 flex flex-col gap-1 overflow-auto">
        {pendingOrders.map((item) => (
          <TransferOrderItem
            order={item}
            key={item.id}
            orderItem={item}
            updateOrderItem={updateOrderItem}
          />
        ))}
      </div>
      <div className="mx-2 flex justify-end gap-2 text-light-1">
        <button
          disabled={true}
          className="px-3 py-1 rounded-lg bg-success disabled:bg-dark-4 disabled:text-light-10"
        >
          <h2>{t("Prev")}</h2>
        </button>
        <button
          className="px-3 py-1 rounded-lg bg-success"
          onClick={() => setCurWindow(1)}
        >
          <h2>{t("Next")}</h2>
        </button>
      </div>
    </div>,
    <div className="flex flex-col h-full gap-2 overflow-auto">
      <h2>{t("Select table")}</h2>
      <div className="w-full h-full px-2 overflow-auto">
        <Grid2
          container
          spacing={0.5}
          columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
        >
          {/* {company ? company.baskets.filter((basket) => !basket.isActive).map((item, index) => ( */}
          {company
            ? company.baskets.map((item, index) => (
                <Grid2 key={index} size={{ xs: 2, sm: 4, md: 3, lg: 4 }}>
                  <div
                    className={`min-h-[82px] rounded-md cursor-pointer text-center bg-dark-3 hover:bg-white hover:dark:bg-dark-3 ${
                      selectedBasket === item ? "border-2" : ""
                    }`}
                    onClick={() => handleBasketSelect(item)}
                  >
                    <h2>{getBasketDisplayName(item)}</h2>
                  </div>
                </Grid2>
              ))
            : ""}
        </Grid2>
      </div>
      <div className="mx-2 flex justify-end gap-2 text-light-1">
        <button
          className="px-3 py-1 rounded-lg bg-success"
          onClick={() => setCurWindow(0)}
        >
          <h2>{t("Prev")}</h2>
        </button>
        <button
          disabled={selectedBasket ? false : true}
          className="px-3 py-1 rounded-lg bg-success disabled:bg-dark-4 disabled:text-light-10"
          onClick={() => setCurWindow(2)}
        >
          <h2>{t("Next")}</h2>
        </button>
      </div>
    </div>,
    <div className="flex flex-col w-full h-full gap-2 overflow-auto">
      <h2>{t("Selected orders")}</h2>
      <div className="size-full flex flex-col px-2 gap-1 overflow-auto">
        {copyOrders.map((order, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-2 py-1 rounded-lg bg-light-6 dark:bg-dark-2"
          >
            <div className="w-3/6 flex items-center justify-start">
              <h2>{order.product.name}</h2>
            </div>
            <div className="w-3/6 flex items-center justify-end gap-2">
              <div className="w-24 flex justify-center items-center gap-1">
                <h2 className="w-6 text-center">x{order.quantity}</h2>
              </div>
              <h2 className="min-w-12">
                {t("$")}
                {order.quantity * order.product.price}
              </h2>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center h-fit mx-2 p-3 gap-1 bg-light-6 dark:bg-dark-3 rounded-lg">
        <h2>
          {basket?.name} {"->"} {selectedBasket?.name}.
        </h2>
        <h2>{t("Do you want to tranfer?")}</h2>
      </div>
      <div className="mx-2 flex justify-end gap-2 text-light-1">
        <button
          className="px-3 py-1 rounded-lg bg-success"
          onClick={() => setCurWindow(1)}
        >
          <h2>{t("Prev")}</h2>
        </button>
        <button
          disabled={selectedBasket ? false : true}
          className="px-3 py-1 rounded-lg bg-success disabled:bg-dark-4 disabled:text-light-10"
          onClick={() => handleCompleteTransfer()}
        >
          <h2>{t("Transfer")}</h2>
        </button>
      </div>
    </div>,
  ];

  return (
    <div className="flex flex-col size-full p-2 overflow-auto">
      <h2 className="h-fit p-2">{t("Transfer")}</h2>
      {windows[curWindow]}
      <div className="h-fit p-2">
        <button
          className="w-full py-1 rounded-lg bg-danger text-light-1"
          onClick={() => handleWindowSelect(null)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const TransferOrderItem = ({ orderItem, updateOrderItem }) => {
  const [orgOrderItem] = useState(orderItem);
  const [tempOrderItem, setTempOrderItem] = useState(orderItem);
  const { t } = useTranslation();
  const updateTempOrderQuantity = (toAddQuantity) => {
    setTempOrderItem((prevOrder) => {
      const newQuantity = prevOrder.quantity + toAddQuantity;
      if (newQuantity >= 0 && newQuantity <= orgOrderItem.quantity) {
        return {
          ...prevOrder,
          quantity: newQuantity,
        };
      }
      return prevOrder; // No change if conditions are not met
    });
  };

  useEffect(() => {
    if (tempOrderItem) {
      updateOrderItem(tempOrderItem);
    }
  }, [tempOrderItem]);

  return (
    <div className="flex items-center justify-between px-2 py-1 rounded-lg bg-light-6 dark:bg-dark-2">
      <div className="w-3/6 flex items-center justify-start">
        <h2>{orgOrderItem.product.name}</h2>
      </div>
      <div className="w-3/6 flex items-center justify-end gap-2">
        <div className="w-24 flex justify-center items-center gap-1">
          <AddCircleIcon
            className="cursor-pointer"
            onClick={() => {
              updateTempOrderQuantity(1);
            }}
          />
          <h2 className="w-6 text-center">{tempOrderItem.quantity}</h2>
          <RemoveCircleIcon
            className="cursor-pointer"
            onClick={() => {
              updateTempOrderQuantity(-1);
            }}
          />
        </div>
        <h2 className="min-w-12">
          {t("$")}
          {tempOrderItem.quantity * orgOrderItem.product.price}
        </h2>
      </div>
    </div>
  );
};

const SmallScreenPayWindow = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40">
      <div
        className="flex items-center justify-center size-full text-center cursor-default"
        onClick={onClose}
      >
        {/* onClick={(e) => e.stopPropagation()} to prevent the close function execution */}
        <div
          className="bg-dark-5 rounded-xl h-3/5 w-3/4"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const MediumOrAboveScreenPayWindow = ({ children }) => {
  return (
    <div className="absolute bg-black bg-opacity-40 p-5 size-full text-center rounded-b-lg cursor-default">
      <div className="bg-light-3 dark:bg-dark-5 rounded-xl size-full">
        {children}
      </div>
    </div>
  );
};
