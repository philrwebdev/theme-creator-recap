import { useState } from "react";
import "../Color/Color.css";
import "../ColorForm/ColorForm.css";
import CopyThemeButton from "./CopyThemeButton";

export default function ThemeForm({
  themes,
  currentColors,
  currentThemeId,
  onAddTheme,
  onEditTheme,
  onDeleteTheme,
  onChangeTheme,
}) {
  const [mode, setMode] = useState("default");
  const [newName, setNewName] = useState("");

  return (
    <fieldset className="color-form_field">
      <legend className="color-form_field_legend">Themes</legend>

      {/* Theme List start */}
      {mode === "default" || mode === "delete" ? (
        <>
          <label htmlFor="selectTheme">Theme name</label>
          <br />
          <select
            name="selectTheme"
            id="selectTheme"
            value={currentThemeId}
            onChange={(event) => onChangeTheme(event.target.value)}
          >
            {themes.map((theme) => {
              return (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              );
            })}
          </select>
        </>
      ) : (
        ""
      )}
      {/* Theme list end */}

      {/* Default mode start */}
      {mode === "default" ? (
        <>
          <button
            type="button"
            className="color-form_submit"
            onClick={() => setMode("add")}
          >
            Add
          </button>
          <button
            type="button"
            className="color-form_submit"
            onClick={() => setMode("edit")}
            disabled={currentThemeId === "t1" ? true : false}
          >
            Edit
          </button>
          <button
            type="button"
            className="color-form_submit"
            onClick={() => setMode("delete")}
            disabled={currentThemeId === "t1" ? true : false}
          >
            Delete
          </button>
          <br/>
          <CopyThemeButton colors={currentColors} />
        </>
      ) : (
        ""
      )}

      {/* Default mode end */}

      {/* Add mode start */}
      {mode === "add" ? (
        <>
          <label htmlFor="name">Theme name</label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            onChange={(event) => {
              setNewName(event.target.value);
              console.log("newName onChange in Edit text field: ", newName);
            }}
          />
          <button
            type="button"
            className="color-form_submit"
            onClick={() => {
              onAddTheme(newName);
              setMode("default");
            }}
          >
            Add
          </button>
        </>
      ) : (
        ""
      )}
      {/* Add mode end */}

      {/* Edit mode start */}
      {mode === "edit" ? (
        <>
          <label htmlFor="name">{"Enter new theme name"}</label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            onChange={(event) => {
              setNewName(event.target.value);
            }}
          />

          <button
            type="button"
            className="color-form_submit"
            onClick={() => {
              onEditTheme(currentThemeId, newName);
              setMode("default");
            }}
          >
            Edit
          </button>
        </>
      ) : (
        ""
      )}
      {/* Edit mode end */}

      {/* Delete mode start */}
      {mode === "delete" ? (
        <>
          <button
            type="button"
            className="color-form_cancel-edit"
            onClick={() => {
              onDeleteTheme(currentThemeId);
              setMode("default");
            }}
          >
            Go delete
          </button>
        </>
      ) : (
        ""
      )}
      {/* Delete mode end */}

      {/* Cancel button start */}
      {mode !== "default" ? (
        <button
          type="button"
          className="color-form_cancel-edit"
          onClick={() => setMode("default")}
        >
          Cancel
        </button>
      ) : (
        ""
      )}
      {/* Cancel button end */}
      <br />
    </fieldset>
  );
}

function ThemeList({ themes, currentThemeId, onChangeTheme }) {
  return (
    <>
      <label htmlFor="selectTheme">Theme name</label>
      <br />
      <select
        name="selectTheme"
        id="selectTheme"
        value={currentThemeId}
        onChange={(event) => onChangeTheme(event.target.value)}
      >
        {themes.map((theme) => {
          return (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          );
        })}
      </select>
    </>
  );
}
