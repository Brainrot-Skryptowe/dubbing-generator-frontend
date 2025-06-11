export const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export const VOICE_OPTIONS: Record<string, { label: string; value: string }[]> =
  {
    a: [
      { label: "English (af)", value: "af" },
      { label: "English (am)", value: "am" },
      { label: "English (bf)", value: "bf" },
      { label: "English (bm)", value: "bm" },
    ],
    e: [
      { label: "Spanish (ef)", value: "ef" },
      { label: "Spanish (em)", value: "em" },
    ],
    f: [{ label: "French (ff)", value: "ff" }],
    i: [
      { label: "Italian (if)", value: "if" },
      { label: "Italian (im)", value: "im" },
    ],
    p: [
      { label: "Portuguese (pf)", value: "pf" },
      { label: "Portuguese (pm)", value: "pm" },
    ],
  };
