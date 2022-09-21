import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phases for the happy path", async () => {
  render(<App />);

  const user = userEvent.setup();

  // add icecream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);

  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  await user.click(hotFudgeCheckbox);

  // find and click the order button
  const submitOrderButton = screen.getByRole("button", {
    name: /submit order/i,
  });
  await user.click(submitOrderButton);

  // check summary information according to the order
  const scoopsTotal = screen.getByText("Scoops: $", { exact: false });
  expect(scoopsTotal).toHaveTextContent("2.00");

  const toppingsTotal = screen.getByText("Toppings: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("3.00");

  // accept the terms and conditions and click button to confirm the order
  const tnc = screen.getByRole("checkbox", { name: /terms and conditions/i });
  await user.click(tnc);

  const submit_button = screen.getByRole("button", { name: /confirm order/i });
  await user.click(submit_button);

  // confirm order number on the confirmation page
  const orderNumberText = await screen.findByText("Your order number is", {
    exact: false,
  });
  expect(orderNumberText).toHaveTextContent("1234567890");

  // click "new order" button on the confirmation page
  const newOrderButton = await screen.findByRole("button", {
    name: /create new order/i,
  });
  await user.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");
});
