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

export type TranslateService = {
  search(options: TranslateOption): Promise<string>
  createListItem(text: string): TranslateListItemData
}