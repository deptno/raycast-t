import * as papago from "./service/papago";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { TranslateListItemData } from "./service/type";

export const useSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [itemList, setItemList] = useState<TranslateListItemData[]>(DEFAULT_ITEM_LIST);
  const [text, setText] = useState("");

  useEffect(() => {
    if (text) {
      setIsLoading(true);

      Promise.all([
        papago
          .search({ source: "en", target: "ko", text })
          .catch((e) => "error: " + e.message)
          .then(papago.createListItem),
      ])
        .then(setItemList)
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
      setText("");
      setItemList(DEFAULT_ITEM_LIST);
    }
  }, [text, papago, setItemList, setIsLoading, setText]);

  return {
    setText: debounce(setText, 200),
    isLoading,
    itemList,
  };
};

const DEFAULT_ITEM_LIST = [
  papago.createListItem('')
]
