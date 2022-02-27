import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { get } from "../util/storage";
import { StorageKey } from "../constnat";
import { HistoryListItem } from "./HistoryListItem";

export const HistoryList: FunctionComponent<Props> = (props) => {
  const { onSelect, onDelete } = props;
  const [historyList, setHistoryList] = useState<string[]>([]);
  const cut = useCallback((values: string[]) => values.slice(0, 10), []);

  useEffect(() => {
    get(StorageKey.words, []).then(cut).then(setHistoryList);
  }, [setHistoryList, cut]);

  return (
    <>
      {historyList.map((item) => {
        return <HistoryListItem key={item} item={item} onSelect={onSelect} onDelete={onDelete} />;
      })}
    </>
  );
};

type Props = {
  onSelect(text: string): void;
  onDelete(text: string): void;
};
