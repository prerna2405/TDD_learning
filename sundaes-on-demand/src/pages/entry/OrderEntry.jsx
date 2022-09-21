import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderEntry({ setOrderPhase }) {
  const [OrderDetails] = useOrderDetails();

  // disable order button if there aren't any scoops in order
  const orderDisabled = OrderDetails.totals.scoops === "$0.00";

  return (
    <div>
      <h1>Design your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {OrderDetails.totals.grandTotal}</h2>
      <button disabled={orderDisabled} onClick={() => setOrderPhase("review")}>
        Submit Order
      </button>
    </div>
  );
}
