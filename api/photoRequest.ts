import axios from "axios";
import { getLocales } from "expo-localization";

const PAT = "9877562403b647799271b42331504762";
const USER_ID = "openai";
const APP_ID = "chat-completion";
// Change these to whatever model and image URL you want to use
const MODEL_ID = "gpt-4o";
const MODEL_VERSION_ID = "abe20498ef014e3c98ade2f5c3ee5d9d";

export const fixBrokenJsonArray = (jsonText: string) => {
  const objectRegex = /\{[^}]*\}/g;
  const matches = jsonText.match(objectRegex);

  if (!matches || matches.length === 0) {
    throw new Error("No valid objects found in broken JSON");
  }

  const validArray = `[${matches.join(",")}]`;

  try {
    return JSON.parse(validArray);
  } catch (e) {
    console.error("Even fixed JSON is invalid:", validArray);
    throw e;
  }
};

export const photoRequest = async (
  imageBase64: string,
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
          image: {
            base64: imageBase64,
          },
          text: {
            raw: `Generate up to 10 recipes based on the ingredients visible in the image. You may only use the ingredients identified in the image, plus a few common household ingredients (e.g., salt, pepper, water, oil, sugar, butter) if necessary to make the recipe complete.

Respond strictly as a JSON array in the following format:

[
  {
    "title": "",
    "products": "",
    "instruction": ""
  }
]

Guidelines:
- Each recipe must include a short, relevant title.
- "products" must list only ingredients seen in the image or basic common ones.
- "instruction" should be concise but clear, describing how to prepare the dish.
- Avoid unrealistic or duplicated recipes.

Return only the array — no extra text or explanation. Answer in this language code: ${deviceLanguage}`,
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
    console.log("zxzxzxzxz", rawText);
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
      console.warn("Standard JSON.parse failed, trying to fix broken JSON...");
      try {
        parsedRecipes = fixBrokenJsonArray(unescaped);
      } catch (fixError) {
        console.error("fixBrokenJsonArray failed:", fixError);
        throw fixError;
      }
    }

    return parsedRecipes;
  } catch (e) {
    console.log("photoRequest error:", e.response.data);
    throw e;
  }
};

const fff = [
  {
    title: "Лосось с брокколи и лимоном",
    products: "Лосось, брокколи, лимон, оливковое масло, соль, перец",
    instruction:
      "Запеките лосось с брокколи и ломтиками лимона в духовке при 180°C в течение 20-25 минут. Сбрызните оливковым маслом, посолите и поперчите.",
  },
  {
    title: "Яичница с сыром и шпинатом",
    products: "Яйца, сыр, шпинат, сливочное масло, соль, перец",
    instruction:
      "Обжарьте шпинат на сливочном масле. Взбейте яйца с солью и перцем. Залейте шпинат яйцами и готовьте до желаемой степени готовности. Посыпьте тертым сыром.",
  },
  {
    title: "Салат с апельсином, орехами и зеленью",
    products: "Апельсин, орехи, шпинат, зелень, оливковое масло, соль, перец",
    instruction:
      "Нарежьте апельсин кусочками. Смешайте шпинат, зелень, орехи, оливковое масло, соль и перец. Добавьте апельсины и перемешайте.",
  },
  {
    title: "Запеченный лосось с цуккини и помидорами",
    products: "Лосось, цуккини, помидоры, оливковое масло, соль, перец, лимон",
    instruction:
      "Нарежьте цуккини и помидоры. Смешайте с оливковым маслом, солью и перцем. Выложите на противень, сверху положите лосось, сбрызните лимонным соком и запекайте в духовке при 200°C около 15 минут.",
  },
];

const xxx = [
  {
    title: "Салат с семгой и шпинатом",
    products:
      "семга, шпинат, помидоры черри, лимон, оливковое масло, соль, перец",
    instruction:
      "Нарежьте семгу ломтиками, поджарьте на сковороде до готовности. Смешайте шпинат и разрезанные пополам помидоры черри, заправьте оливковым маслом с лимонным соком, выложите семгу, посолите и поперчите.",
  },
  {
    title: "Запечённая семга с брокколи",
    products: "семга, брокколи, сливочное масло, лимон, соль, перец",
    instruction:
      "Выложите на противень семгу и брокколи, сверху положите кусочек сливочного масла, сбрызните лимонным соком, посолите и поперчите. Запекайте при 180°C 20 минут.",
  },
  {
    title: "Омлет с овощами и сыром",
    products: "яйца, кабачок, помидоры черри, сыр, масло, соль, перец",
    instruction:
      "Взбейте яйца с солью и перцем. На сковороде обжарьте нарезанный кабачок и помидоры черри, залейте яичной смесью, посыпьте тёртым сыром, готовьте под крышкой 5–7 минут.",
  },
];
