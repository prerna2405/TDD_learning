import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import { useState } from "react";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  const displayScreen = () => {
    switch (orderPhase) {
      case "inProgress":
        return <OrderEntry setOrderPhase={setOrderPhase} />;
      case "review":
        return <OrderSummary setOrderPhase={setOrderPhase} />;
      case "complete":
        return <OrderConfirmation setOrderPhase={setOrderPhase} />;
      default:
        return <OrderEntry setOrderPhase={setOrderPhase} />;
    }
  };

  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page need provider */}
        {displayScreen()}
      </OrderDetailsProvider>
      {/* confirmation page does not need provider */}
    </Container>
  );
}

export default App;
