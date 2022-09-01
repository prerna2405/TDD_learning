import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import {replaceCamelCaseWithSpaces} from "./App";

test('button has the correct initial color', () => {
  render(<App/>);

  // find an element with the role of button and the text of "Change to Midnight Blue"
  const colorButton= screen.getByRole("button", { name: 'Change to Midnight Blue' });

  //expect the background color to be Medium Violet Red
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });

  //click button
  fireEvent.click(colorButton);

  //expect the background color to be Midnight Blue
  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });

  //expect the button text to be "Change to Medium Violet Red"
  expect(colorButton.textContent).toBe("Change to Medium Violet Red")
});


test("initial conditions", ()=>{

  render(<App/>);

  // check that the button starts out enabled
  const colorButton = screen.getByRole("button", { name: "Change to Midnight Blue" });

  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');

  expect(checkbox).not.toBeChecked();

});

test("checkbox functionality", ()=>{
  render(<App/>);
  const colorButton = screen.getByRole("button", {name: "Change to Midnight Blue"});
  const checkbox = screen.getByRole("checkbox", { name: 'Disable button' });

  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();
  expect(colorButton).toHaveStyle({ backgroundColor:'gray' })

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });

  fireEvent.click(colorButton);
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });
});

describe('spaces before camel-case capital letters', ()=>{
  test('Works for no inner capital letters', () => {
    expect(replaceCamelCaseWithSpaces("Red")).toBe("Red");
  });

  test("Works with one inner capital letter", () => {
    expect(replaceCamelCaseWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });

  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelCaseWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  })

})
