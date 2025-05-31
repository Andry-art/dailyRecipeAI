import axios from "axios";
import { getTranslate } from "./getTranslate";

const PAT = "9877562403b647799271b42331504762";

const USER_ID = "gcp";
const APP_ID = "generate";

const MODEL_ID = "imagen-2";
const MODEL_VERSION_ID = "5463d7ae994e48a58a5641c2468b9ac5";

export const getImageAI = async (
  title: string,
  product: string,
  signal: AbortSignal
) => {
  try {
    const request = await getTranslate(title, product);

    const payload = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            text: {
              raw: request,
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
        signal,
      }
    );
    const imageUrl = `data:image/jpeg;base64,${response.data.outputs[0].data.image.base64}`;
    return imageUrl;
  } catch (error) {
    console.error("getImageAI Error:", error.response?.data);
    return null;
  }
};
