import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import ThemeForm from "./Components/ThemeForm/ThemeForm";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";

import "./App.css";

const initialThemes = [
  { name: "Default theme", id: "t1", colors: ["c1", "c2", "c3", "c4", "c5"] },
  { name: "Second theme", id: "t2", colors: ["c6", "c7", "c8", "c9"] },
];

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });
  // const [colors, setColors] = useState(initialColors);
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });
  // const [themes, setThemes] = useState(initialThemes);
  const [currentThemeId, setCurrentThemeId] = useState(initialThemes[0].id);

  const currentTheme = themes.find((theme) => theme.id === currentThemeId);
  const currentColors = currentTheme.colors.map((colorId) =>
    colors.find((color) => color.id === colorId)
  );

  function handleChangeTheme(id) {
    setCurrentThemeId(id);
  }

  function handleAddTheme(newName) {
    const newId = uid();
    setThemes([{ id: newId, colors: [], name: newName }, ...themes]);
    setCurrentThemeId(newId);
  }

  function handleDeleteTheme(id) {
    setColors(
      colors.filter((color) => !currentTheme.colors.includes(color.id))
    );
    setThemes(themes.filter((theme) => theme.id !== id));
    setCurrentThemeId(initialThemes[0].id);
  }

  function handleEditTheme(id, newName) {
    setThemes(
      themes.map((theme) => {
        if (theme.id === id) return { ...theme, name: newName };
        return theme;
      })
    );
  }

  function handleAddColor(newColor) {
    const newId = uid();
    setColors([{ id: newId, ...newColor }, ...colors]);
    setThemes(
      themes.map((theme) => {
        if (theme.id === currentThemeId) {
          return { ...theme, colors: [newId, ...theme.colors] };
        } else {
          return theme;
        }
      })
    );
  }

  function handleDeleteColor(id, currentThemeId) {
    setThemes(
      themes.map((theme) => {
        if (theme.id === currentThemeId) {
          return {
            ...theme,
            colors: theme.colors.filter((color) => color !== id),
          };
        } else {
          return theme;
        }
      })
    );
    setColors(colors.filter((color) => color.id !== id));
  }

  function handleEditColor(colorEdited) {
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

      <ThemeForm
        themes={themes}
        currentColors={currentColors}
        currentThemeId={currentThemeId}
        onAddTheme={handleAddTheme}
        onDeleteTheme={handleDeleteTheme}
        onEditTheme={handleEditTheme}
        onChangeTheme={handleChangeTheme}
      />

      <ColorForm onAddColor={handleAddColor} />

      {currentColors.length > 0 ? (
        currentColors.map((color) => {
          return (
            <Color
              key={color.id}
              color={color}
              id={color.id}
              onDeleteColor={handleDeleteColor}
              onEditColor={handleEditColor}
              currentThemeId={currentThemeId}
            />
          );
        })
      ) : (
        <>
          <br />
          <h2>No colors defined... Add some!</h2>
        </>
      )}
    </>
  );
}

export default App;
