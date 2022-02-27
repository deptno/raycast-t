import { google, papago } from "../service";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { TranslateListItemData, TranslateOption, TranslateService } from "../service/type";

export const useSearch = (source: string, target: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [itemList, setItemList] = useState<TranslateListItemData[]>(DEFAULT_ITEM_LIST);
  const [text, setText] = useState("");
  const options: TranslateOption = useMemo(() => ({ source, target, text }), [text, source, target]);
  const getSiteTranslationUrl = (serviceName: string) => {
    const service = [google, papago].find((service) => serviceName === service.id);

    return service?.getSiteTranslationUrl(options, serviceName);
  };

  useEffect(() => {
    if (text) {
      setIsLoading(true);

      Promise.all([search(google, options), search(papago, options)])
        .then(setItemList)
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
      setText("");
      setItemList(DEFAULT_ITEM_LIST);
    }
  }, [options, papago, google, setItemList, setIsLoading, setText]);

  return {
    setText: debounce(setText, 200),
    text,
    isLoading,
    itemList,
    getSiteTranslationUrl,
  };
};
const search = (service: TranslateService, options: TranslateOption) =>
  service
    .search(options)
    .catch((e: Error) => `💀 ${e.message}`)
    .then(service.createListItem);
const DEFAULT_ITEM_LIST = [google.createListItem(""), papago.createListItem("")];
