export const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export const VOICE_OPTIONS: Record<string, { label: string; value: string }[]> =
  {
    a: [
      { label: "English (af)", value: "af_heart" },
      { label: "English (am)", value: "am_adam" },
      { label: "English (bf)", value: "bf_alice" },
      { label: "English (bm)", value: "bm_daniel" },
    ],
    e: [
      { label: "Spanish (ef)", value: "ef_dora" },
      { label: "Spanish (em)", value: "em_alex" },
    ],
    f: [{ label: "French (ff)", value: "ff_siwis" }],
    i: [
      { label: "Italian (if)", value: "if_sara" },
      { label: "Italian (im)", value: "im_nicola" },
    ],
    p: [
      { label: "Portuguese (pf)", value: "pf_dora" },
      { label: "Portuguese (pm)", value: "pm_alex" },
    ],
  };
