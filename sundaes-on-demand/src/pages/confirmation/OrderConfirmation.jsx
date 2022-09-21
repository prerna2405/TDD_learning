import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirmation({ setOrderPhase }) {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((res) => {
        setOrderNumber(res.data.orderNumber);
      })
      .catch((err) => {
        setError(true);
      });
  }, []);

  if (error) {
    return <AlertBanner />;
  }

  const handleClick = () => {
    resetOrder();

    setOrderPhase("inProgress");
  };

  if (orderNumber) {
    return (
      <>
        <h1>Thank you!</h1>
        <h3>Your order number is {orderNumber}</h3>
        <p>as per our terms and conditions, nothing will happen now</p>
        <button onClick={() => handleClick()}>Create new order</button>
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
