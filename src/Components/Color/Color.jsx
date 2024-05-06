import { useState, useEffect } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";
import ContrastCheck from "../ContrastCheck";

export default function Color({ color, onDeleteColor, onEditColor, currentThemeId }) {
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (copied) {
      timeoutId = setTimeout(() => {
        setCopied(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [copied]);

  function handleExitEditMode() {
    setEditMode(false);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopied(true);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <button type="button" className="color_copy" onClick={handleCopy}>
        {copied ? "Copied to clipboard!" : "Copy"}
      </button>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      <ContrastCheck colors={[color.hex, color.contrastText]} />
      <br />

      {deleteMode ? (
        <>
          <h3 className="color-card-confirm">Really delete?</h3>
          <button type="button" onClick={() => setDeleteMode(false)}>
            Cancel
          </button>
        </>
      ) : (
        ""
      )}

      {!editMode ? (
        <>
          <button
            type="button"
            className="color_delete"
            onClick={() =>
              deleteMode ? onDeleteColor(color.id, currentThemeId) : setDeleteMode(true)
            }
          >
            Delete
          </button>
          <button
            type="button"
            className="color_edit"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        </>
      ) : (
        ""
      )}

      {editMode ? (
        <ColorForm
          onEditColor={onEditColor}
          initialData={color}
          editMode={editMode}
          onExitEditMode={handleExitEditMode}
        />
      ) : (
        ""
      )}
    </div>
  );
}
