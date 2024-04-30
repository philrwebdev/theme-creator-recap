import "../Color/Color.css";
import "../ColorForm/ColorForm.css";

import { uid } from "uid";
import { useState } from "react";
import ColorInput from "../ColorInput/ColorInput";

export default function ColorForm({ onAddColor }) {
  const initialData = {
    id: uid(),
    role: "Primary main",
    hex: "#595959",
    contrastText: "#FFFFFF",
  };

  const [color, setColor] = useState(initialData.hex);
  const [contrast, setContrast] = useState(initialData.contrastText);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newColor = { id: uid(), ...data };

    onAddColor(newColor);
    event.target.reset();
  }

  function handleDeleteColor() {
    console.log(color.id);
    setColor(colors.filter((scheme) => scheme.id !== color));
    // setInputValue(event.target.value);
  }

  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <br />

      <fieldset className="color-form_field">
        <legend className="color-form_field_legend">Create your theme</legend>
        <label htmlFor="role">Role</label>
        <br />
        <input
          type="text"
          name="role"
          id="role"
          defaultValue={initialData.role}
        />
        <br />

        <label htmlFor="hex">Hex</label>
        <br />
        <ColorInput id="hex" defaultValue={initialData.hex} />
        <br />

        <label htmlFor="contrastText">Contrast Text</label>
        <br />
        <ColorInput id="contrastText" defaultValue={initialData.contrastText} />
        <br />
        <br />

        <button type="submit" className="color-form_submit">
          Add Theme
        </button>
        <br />
      </fieldset>
      <br />
    </form>
  );
}
