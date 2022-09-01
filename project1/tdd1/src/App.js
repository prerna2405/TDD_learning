import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";


export function replaceCamelCaseWithSpaces(colorName){
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
}

function App() {
  const [buttonColor, setButtonColor] = useState("MediumVioletRed");
  const [disabled, setDisabled] = useState(false);
  const newButtonColor = buttonColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";

  return (
    <div>
      <button
        style={{ backgroundColor: disabled? 'gray': buttonColor }}
        disabled={disabled}
        onClick={() => setButtonColor(newButtonColor)}
      >
        Change to {replaceCamelCaseWithSpaces(newButtonColor)}
      </button>
      <input
        id="firstCheckbox"
        type="checkbox"
        defaultChecked={disabled}
        aria-checked={disabled}
        onChange={(e) => setDisabled(e.target.checked)}
      />
      <label htmlFor="firstCheckbox">Disable button</label>
    </div>
  );
}

export default App;
