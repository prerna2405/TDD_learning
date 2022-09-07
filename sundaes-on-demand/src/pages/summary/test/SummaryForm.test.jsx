import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("Terms and Conditions are unchecked by default", () => {
  render(<SummaryForm />);

  const TNC_checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(TNC_checkbox).not.toBeChecked();

  const submit_button = screen.getByRole("button", { name: /confirm order/i });
  expect(submit_button).toBeDisabled();
});

test("Terms and Conditions functionality", async () => {
  render(<SummaryForm />);

  const user = userEvent.setup();

  const TNC_checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const submit_button = screen.getByRole("button", { name: /confirm order/i });

  await user.click(TNC_checkbox);
  expect(submit_button).toBeEnabled();

  await user.click(TNC_checkbox);
  expect(submit_button).toBeDisabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);
  const user = userEvent.setup();
  const TNC_checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  //popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  //popover appears upon mouseover of checkbox label
  await user.hover(TNC_checkbox);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  //popover disappears when we mouse out
  await user.unhover(TNC_checkbox);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
