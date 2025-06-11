export const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export const VOICE_OPTIONS: Record<string, { label: string; value: string }[]> =
  {
    en: [
      { label: "English (af)", value: "af" },
      { label: "English (am)", value: "am" },
      { label: "English (bf)", value: "bf" },
      { label: "English (bm)", value: "bm" },
    ],
    esp: [
      { label: "Spanish (ef)", value: "ef" },
      { label: "Spanish (em)", value: "em" },
    ],
    fr: [{ label: "French (ff)", value: "ff" }],
    itl: [
      { label: "Italian (if)", value: "if" },
      { label: "Italian (im)", value: "im" },
    ],
    pr: [
      { label: "Portuguese (pf)", value: "pf" },
      { label: "Portuguese (pm)", value: "pm" },
    ],
  };
