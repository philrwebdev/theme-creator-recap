import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import { useState } from "react";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

import "./App.css";

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  function handleAddColor(newColor) {
    if (newColor.id === undefined) {
      setColors([{ id: uid(), ...newColor }, ...colors]);
    } else {
      setColors([newColor, ...colors]);
    }
  }

  function handleDeleteColor(id) {
    setColors(colors.filter((color) => color.id !== id));
  }

  function handleEditMode(colorEdited) {
    setColors(
      colors.map((color) => {
        if (color.id === colorEdited.id) return colorEdited;
        return color;
      })
    );
  }

  return (
    <>
      <h1>Theme Creator</h1>

      <ColorForm onAddColor={handleAddColor} colorEditedMode={false} />

      {colors.length > 0 ? (
        colors.map((color) => {
          return (
            <Color
              key={color.id}
              color={color}
              id={color.id}
              onDeleteColor={handleDeleteColor}
              onEditMode={handleEditMode}
            />
          );
        })
      ) : (
        <>
          <br />
          <h2>No colors defined... Add one!</h2>
        </>
      )}
    </>
  );
}

export default App;
