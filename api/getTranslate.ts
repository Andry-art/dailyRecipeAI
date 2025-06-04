import axios from "axios";

const PAT = "9877562403b647799271b42331504762";
const USER_ID = "openai";
const APP_ID = "chat-completion";
// Change these to whatever model and image URL you want to use
const MODEL_ID = "gpt-4o";
const MODEL_VERSION_ID = "abe20498ef014e3c98ade2f5c3ee5d9d";

export const getTranslate = async (title: string, product: string) => {
  try {
    const payload = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            text: {
              raw: `Create a sentence in English using the following format: 'Realistic photo of "${title}" prepared with ${product}, clearly showing the ingredients on a plate.' Translate ${title} and ${product} into English before inserting them into the sentence.`,
            },
          },
        },
      ],
    });
    const response = await axios.post(
      `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
      payload,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Key ${PAT}`,
        },
      }
    );
    const rawText = response?.data?.outputs?.[0]?.data?.text?.raw;

    return rawText;
  } catch (error) {
    console.log("getTranslate Error:", error.response.data);
    throw error;
  }
};
