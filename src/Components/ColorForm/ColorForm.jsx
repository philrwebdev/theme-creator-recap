import "../Color/Color.css";
import "../ColorForm/ColorForm.css";

import ColorInput from "../ColorInput/ColorInput";

export default function ColorForm({
  onAddColor,
  // onEditColor,
  initialData = {
    role: "Primary main",
    hex: "#595959",
    contrastText: "#FFFFFF",
  },
  editMode,
  onExitEditMode,
}) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (editMode) {
      data.id = initialData.id;
    }

    onAddColor(data);

    if (editMode) {
      onExitEditMode();
    }
  }

  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <br />

      <fieldset className="color-form_field">
        <legend className="color-form_field_legend">
          {editMode ? "Edit color" : "Create your color"}
        </legend>
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
          {editMode ? "Edit" : "Add Color"}
        </button>

        {editMode ? (
          <button
            type="button"
            className="color-form_cancel-edit"
            onClick={onExitEditMode}
          >
            Cancel
          </button>
        ) : (
          ""
        )}
        <br />
      </fieldset>
      <br />
    </form>
  );
}
