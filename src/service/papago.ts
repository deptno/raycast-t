import fetch from "node-fetch";
import { base64 } from "../util/base64";
import { TranslateListItemData, TranslateOption } from "./type";
import { LocalStorage } from "@raycast/api";

export const search = async (options: TranslateOption) => {
  const { source, target, text } = options;
  const url = "https://openapi.naver.com/v1/papago/n2mt";
  const form = new URLSearchParams();
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    [PapagoKey["X-Naver-Client-Id"]]: (await LocalStorage.getItem<string>(PapagoKey["X-Naver-Client-Id"])) ?? "",
    [PapagoKey["X-Naver-Client-Secret"]]:
      (await LocalStorage.getItem<string>(PapagoKey["X-Naver-Client-Secret"])) ?? "",
  };

  form.append("source", source);
  form.append("target", target);
  form.append("text", text);

  return fetch(url, {
    headers,
    method: "post",
    body: form,
  })
    .then((response) => response.json() as Promise<Response>)
    .then((response) => response.message.result.translatedText);
};
export const createListItem = (text: string): TranslateListItemData => {
  return {
    text,
    service: "파파고",
    key: base64(text) || "papago",
    icon: ICON,
  };
};

const ICON = "https://papago.naver.com/static/img/icon_72x72.png";

enum PapagoKey {
  "X-Naver-Client-Id" = "X-Naver-Client-Id",
  "X-Naver-Client-Secret" = "X-Naver-Client-Secret",
}

type Response = {
  message: {
    result: {
      translatedText: string;
    };
  };
};
