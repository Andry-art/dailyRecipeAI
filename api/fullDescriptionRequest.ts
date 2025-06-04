import axios from "axios";
import { getLocales } from "expo-localization";

const PAT = "9877562403b647799271b42331504762";
const USER_ID = "openai";
const APP_ID = "chat-completion";
// Change these to whatever model and image URL you want to use
const MODEL_ID = "gpt-4o";
const MODEL_VERSION_ID = "abe20498ef014e3c98ade2f5c3ee5d9d";

export const fullDescriptionRequest = async (
  item: string,
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
            raw: `Answer in this language code: ${deviceLanguage}. You are a cooking assistant. Take the following short recipe and expand only the instruction into a detailed, step-by-step cooking description, while keeping the ingredients as a list.

Return your response strictly as a JSON object in this format:

{
  "products": ["<one ingredient per string>", "..."],
  "instruction": ["<one step per string>", "..."]
}

Guidelines:
- "products" must be a list of individual ingredients (one per string).
- "instruction" must be a list of clear, numbered steps (one per string).
- In the instruction, explicitly include the exact amount (by weight or quantity) of each ingredient used when possible.
- Ensure the full response stays within the token limit. If the instructions become too long, summarize steps while preserving clarity.

Input:  
${item}`,
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

    if (!rawText) {
      console.error("Empty or missing raw text in response.");
      throw new Error("Empty or missing raw text in response.");
    }
    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const unescaped = cleaned.replace(/\\"/g, '"');
    console.log("zxzxzxzxzxzx", unescaped);

    const parsedRecipes = JSON.parse(unescaped);

    return parsedRecipes;
  } catch (e) {
    console.log("fullDescriptionRequest error:", e.response.data);
    throw e;
  }
};
