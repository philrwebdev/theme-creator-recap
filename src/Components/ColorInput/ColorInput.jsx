import { useState } from "react";
import "../ColorInput/ColorInput.css";

export default function ColorInput({ id, defaultValue }) {
  const [inputValue, setInputValue] = useState(defaultValue);

  function handleInputValue(event) {
    setInputValue(event.target.value);
  }

  return (
    <>
      <input
        type="text"
        id={id}
        name={id}
        value={inputValue}
        onChange={handleInputValue}
      />
      <input
        type="color"
        value={inputValue}
        onChange={handleInputValue}
        className="color-input_color-picker"
      />
    </>
  );
}
