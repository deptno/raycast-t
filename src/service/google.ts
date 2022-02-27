import { base64 } from "../util/base64";
import { TranslateListItemData, TranslateOption } from "./type";
import translate from "@vitalets/google-translate-api";

export const search = async (options: TranslateOption) => {
  const { source: from, target: to, text } = options;

  return translate(text, { from, to }).then((response) => response.text);
};
export const createListItem = (text: string): TranslateListItemData => {
  return {
    text,
    service: "Google",
    key: base64(text) || "google",
    icon: ICON,
  };
};

const ICON = "https://www.google.com/favicon.ico";
