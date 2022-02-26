import fetch from "node-fetch";
import { base64 } from "../util/base64";
import { TranslateListItemData } from "./type";
import { LocalStorage } from "@raycast/api";

export const search = async (options: PapagoOption) => {
  const url = "https://openapi.naver.com/v1/papago/n2mt";
  const form = new URLSearchParams();
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    [PapagoKey["X-Naver-Client-Id"]]: await LocalStorage.getItem<string>(PapagoKey["X-Naver-Client-Id"]) ?? '',
    [PapagoKey["X-Naver-Client-Secret"]]: await LocalStorage.getItem<string>(PapagoKey["X-Naver-Client-Secret"]) ?? '',
  };

  form.append("source", options.source);
  form.append("target", options.target);
  form.append("text", options.text);

  return fetch(url, {
    headers,
    method: "post",
    body: form,
  })
    .then((response) => response.json() as Promise<PapagoResponse>)
    .then((response) => response.message.result.translatedText);
};
export const createListItem = (text: string): TranslateListItemData => {
  if (text) {
    return {
      text,
      service: "파파고",
      key: base64(text),
      icon: "https://papago.naver.com/static/img/icon_72x72.png",
    };
  }

  return EMPTY_LIST_ITEM
};
const EMPTY_LIST_ITEM = {
  text: "",
  service: "파파고",
  key: "papago",
  icon: "https://papago.naver.com/static/img/icon_72x72.png",
};

export type PapagoOption = {
  source: "en";
  target: "ko";
  text: string;
};
type PapagoResponse = {
  message: {
    result: {
      translatedText: string;
    };
  };
};

enum PapagoKey {
  "X-Naver-Client-Id" = "X-Naver-Client-Id",
  "X-Naver-Client-Secret" = "X-Naver-Client-Secret",
}