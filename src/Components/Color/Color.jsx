import { useState, useEffect } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";

export default function Color({ color, onDeleteColor, onEditColor }) {
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

  function renderConfirm() {
    return (
      <>
        <h3 className="color-card-confirm">Really delete?</h3>
        <button type="button" onClick={() => setDeleteMode(false)}>
          Cancel
        </button>
      </>
    );
  }

  function renderDefaultButtons() {
    return (
      <>
        <button
          type="button"
          className="color_delete"
          onClick={() =>
            deleteMode ? onDeleteColor(color.id) : setDeleteMode(true)
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
    );
  }

  function renderCopyButton() {
    return (
      <button type="button" className="color_copy" onClick={handleCopy}>
        {copied ? "Copied to clipboard!" : "Copy"}
      </button>
    );
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
      {renderCopyButton()}
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>

      {deleteMode ? renderConfirm() : ""}

      {!editMode ? renderDefaultButtons() : ""}

      {editMode ? (
        <ColorForm
          onAddColor={onEditColor}
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
