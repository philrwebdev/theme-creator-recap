import { useState, useEffect } from "react";

export default function CopyThemeButton({ colors }) {
  const [themeCopied, setThemeCopied] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (themeCopied) {
      timeoutId = setTimeout(() => {
        setThemeCopied(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [themeCopied]);

  async function handleThemeCopy() {
    const themeCss = `:root {${colors
      .map((color, index) => {
        const lineEnd = index < colors.length - 1 ? ",\n" : ",";
        const col = `${
          "--" + color.role.replace(" ", "-") + ":" + color.hex + ",\n"
        }`;
        const contrast = `${
          "--" +
          color.role.replace(" ", "-") +
          "-contrast:" +
          color.contrastText +
          lineEnd
        }`;
        return `${col + contrast}`;
      })
      .join("")}
    }`;

    try {
      await navigator.clipboard.writeText(themeCss);
      setThemeCopied(true);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <button
      type="button"
      className="color-form_submit"
      onClick={handleThemeCopy}
    >
      {themeCopied ? "Theme-CSS copied to clipboard!" : "Copy theme"}
    </button>
  );
}
