export type TranslateListItemData = {
  key: string;
  text: string;
  icon: string;
  service: string;
};

export type TranslateOption = {
  source: "en" | string;
  target: "ko" | string;
  text: string;
};
