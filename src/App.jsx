import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import { useState } from "react";

import "./App.css";

function App() {
  const [colors, setColors] = useState(initialColors);

  function handleAddColor(newColor) {
    setColors([newColor, ...colors]);
  }

  function handleDeleteColor(id, confirmed) {
    if (confirmed) {
      setColors(colors.filter((color) => color.id !== id));
    }
  }

  return (
    <>
      <h1>Theme Creator</h1>

      <ColorForm onAddColor={handleAddColor} />

      {colors.length > 0 ? (
        colors.map((color) => {
          return (
            <Color
              key={color.id}
              color={color}
              id={color.id}
              onDeleteColor={handleDeleteColor}
            />
          );
        })
      ) : (
        <>
          <br />
          <h2>No color themes defined... Add one!</h2>
        </>
      )}
    </>
  );
}

export default App;
