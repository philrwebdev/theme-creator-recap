import { useState } from "react";
import "./Color.css";

export default function Color({ color, id, onDeleteColor }) {
  const [confirmed, setConfirmed] = useState(false);

  function renderConfirm() {
    return (
      <>
        <h3 className="color-card-confirm">Really delete?</h3>
        <button type="button" onClick={() => setConfirmed(false)}>
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
      {confirmed ? renderConfirm() : ""}

      <button
        type="button"
        className="color_delete"
        onClick={() =>
          confirmed ? onDeleteColor(id, confirmed) : setConfirmed(true)
        }
      >
        Delete
      </button>
    </div>
  );
}
