import { useState, useEffect } from "react";

export default function CopyButton({color}) {
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

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopied(true);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <button type="button" className="color_copy" onClick={handleCopy}>
      {copied ? "Copied to clipboard!" : "Copy"}
    </button>
  );
}
