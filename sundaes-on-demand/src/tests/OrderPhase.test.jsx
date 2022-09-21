import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import App from "../App";

test("order phases for the happy path", () => {
  render(<App />);

  // add icecream scoops and toppings

  // find and click the order button

  // check summary information according to the order

  // accept the terms and conditions and click button to confirm the order

  // confirm order number on the confirmation page

  // click "new order" button on the confirmation page

  // check that scoops and toppings subtotals have been reset
});
