import { google, papago } from "./service";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { TranslateListItemData, TranslateService } from "./service/type";

export const useSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [itemList, setItemList] = useState<TranslateListItemData[]>(DEFAULT_ITEM_LIST);
  const [text, setText] = useState("");

  useEffect(() => {
    if (text) {
      setIsLoading(true);

      Promise.all([search(google, text), search(papago, text)])
        .then(setItemList)
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
      setText("");
      setItemList(DEFAULT_ITEM_LIST);
    }
  }, [text, papago, google, setItemList, setIsLoading, setText]);

  return {
    setText: debounce(setText, 200),
    isLoading,
    itemList,
  };
};
const search = (service: TranslateService, text: string) =>
  service
    .search({ source: "en", target: "ko", text })
    .catch((e: Error) => "error: " + e.message)
    .then(service.createListItem);
const DEFAULT_ITEM_LIST = [google.createListItem(""), papago.createListItem("")];
