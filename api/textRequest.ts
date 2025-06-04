import axios from "axios";
import { getLocales } from "expo-localization";
import { fixBrokenJsonArray } from "./photoRequest";

const PAT = "9877562403b647799271b42331504762";
const USER_ID = "openai";
const APP_ID = "chat-completion";
// Change these to whatever model and image URL you want to use
const MODEL_ID = "gpt-4o";
const MODEL_VERSION_ID = "abe20498ef014e3c98ade2f5c3ee5d9d";

export const textRequest = async (
  textIngredients: string,
  signal: AbortSignal
) => {
  const deviceLanguage = getLocales()[0].languageCode;

  const payload = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          text: {
            raw: `Generate up to 10 recipes based primarily on the ingredients listed below. You may add a small number of common base ingredients (such as salt, water, oil, pepper), but do not introduce any uncommon or specialized ingredients not in the list.

Respond strictly as a JSON array in the following format:

[
  {
    "title": "",
    "products": "",
    "instruction": ""
  }
]

Each recipe must:
- Include a short, relevant title.
- Use only the listed ingredients and at most a few basic ones (e.g. salt, pepper, water, oil).
- Contain practical and concise cooking instructions in "instruction".

Avoid duplicate or unrealistic recipes. Keep instructions short but complete.

If the input text does not contain any usable ingredients, return an empty array: []

Return only the array — no extra text or explanation. Answer in this language code: ${deviceLanguage}

Input ingredients:  
${textIngredients}`,
          },
        },
      },
    ],
  });
  try {
    const response = await axios.post(
      `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
      payload,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Key ${PAT}`,
        },
        signal,
      }
    );
    const rawText = response?.data?.outputs?.[0]?.data?.text?.raw;
    console.log("=======rawText", rawText);
    if (!rawText) {
      console.error("Empty or missing raw text in response.");
      throw new Error("Empty or missing raw text in response.");
    }
    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const unescaped = cleaned.replace(/\\"/g, '"');

    let parsedRecipes;
    try {
      parsedRecipes = JSON.parse(unescaped);
    } catch (parseError) {
      console.warn(
        "textRequest Standard JSON.parse failed, trying to fix broken JSON..."
      );
      try {
        parsedRecipes = fixBrokenJsonArray(unescaped);
      } catch (fixError) {
        console.error("textRequest fixBrokenJsonArray failed:", fixError);
        throw fixError;
      }
    }

    if (parsedRecipes.length) {
      return parsedRecipes;
    } else {
      throw Error;
    }
  } catch (e) {
    console.log("textRequest error:", e.response.data);
    throw e;
  }
};
