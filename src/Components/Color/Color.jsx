import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";

export default function Color({ color, onDeleteColor, onEditMode }) {
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  function handleExitEditMode() {
    setEditMode(false);
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

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      {deleteMode ? renderConfirm() : ""}

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

      {editMode ? (
        <ColorForm
          onAddColor={onEditMode}
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
