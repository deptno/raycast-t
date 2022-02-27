import fetch from "node-fetch";
import { base64 } from "../util/base64";
import { TranslateListItemData, TranslateOption } from "./type";
import { LocalStorage } from "@raycast/api";
import { URLSearchParams } from "url";

export const search = async (options: TranslateOption): Promise<string> => {
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
    .then((response) => {
      if ('errorCode' in response) {
        if (response.errorCode === '024') {
          throw new Error(`설정 -> ${Object.values(PapagoKey).join(', ')}`)
        }
        throw new Error(`[${response.errorCode}] ${response.errorMessage}`)
      }
      return response
    })
    .then((response) => response.message.result.translatedText);
};
export const createListItem = (text: string): TranslateListItemData => {
  return {
    text,
    service: "파파고",
    key: base64(text) || id,
    icon: ICON,
  };
};
export const id = "papago"
export const getSiteTranslationUrl = (options: TranslateOption, url: string) => {
  const params =  new URLSearchParams()
  params.append('source', options.source)
  params.append('locale', options.target)
  params.append('target', options.target)
  params.append('url', url)

  return `https://papago.naver.net/website${params.toString()}`
}

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
} | ErrorResponse
type ErrorResponse = {
  errorCode: string
  errorMessage: string
}