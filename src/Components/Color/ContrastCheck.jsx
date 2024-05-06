import { useEffect, useState } from "react";

export default function ContrastCheck({ colors }) {
  const [contrastRating, setContrastRating] = useState();

  useEffect(() => {
    async function fetchContrastScore(colors) {
      const response = await fetch(
        "https://www.aremycolorsaccessible.com/api/are-they",
        {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({ colors: colors }),
        }
      );

      const data = await response.json();
      setContrastRating(data.overall);
    }

    fetchContrastScore(colors);
  });

  if (!contrastRating) {
    return <>loading..</>;
  }

  let emoji = "";

  switch (contrastRating) {
    case "Yup":
      emoji = "0x1F600";
      break;
    case "Kinda":
      emoji = "0x1F642";
      break;
    case "Nope":
      emoji = "0x1F631";
      break;
  }

  return (
    <p className="color-card_contrast-score">
      Overall contrast rating: {contrastRating} {String.fromCodePoint(emoji)}
    </p>
  );
}
