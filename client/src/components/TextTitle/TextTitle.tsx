import { useAppContext } from "../../store/app-context";
import { type ApiRequestBodyType } from "../../types/ApiRequestBodyType";
import { fetchGptResponse } from "../../api/fetchGptResponse";
import { useState, useEffect } from "react";

export default function TextTitle() {
  const [title, setTitle] = useState<string>();

  const { messagesToRequest, GPTModel } = useAppContext();

  useEffect(() => {
    if (messagesToRequest[1] && !title) {
      const apiRequestBody: ApiRequestBodyType = {
        model: GPTModel,
        messages: [
          {
            content: `Create a max 4-word title summarizing the text: ${messagesToRequest[1].message}`,
            role: "user",
          },
        ],
      };

      fetchGptResponse(apiRequestBody).then((data) => {
        const contentGPT: string = data.choices[0].message.content;
        setTitle(contentGPT);
      });
    }
    console.log(title);
  }, [messagesToRequest]);

  return <>{title}</>;
}
