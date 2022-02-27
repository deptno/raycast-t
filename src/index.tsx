import { Action, ActionPanel, getPreferenceValues, Icon, List, showToast, Toast, useNavigation } from "@raycast/api";
import { useSearch } from "./hook/useSearch";
import { TranslateListItem } from "./component/TranslateListItem";
import { Configure } from "./component/Configure";
import { HistoryList } from "./component/HistoryList";
import { useCallback } from "react";
import { get, set } from "./util/storage";
import { StorageKey } from "./constnat";
import { useRefresh } from "./hook/useRefresh";

export default function Command() {
  const { source, target } = getPreferenceValues();
  const { refreshCount, refresh } = useRefresh();
  const { isLoading, text, setText, itemList } = useSearch(source, target);
  const onSave = useCallback(() => {
    get<string[]>(StorageKey.words, [])
      .then((words) => [text, ...words])
      .then((values) => set(StorageKey.words, values))
      .then(refresh)
      .catch(() => {
        return showToast({
          style: Toast.Style.Failure,
          title: "저장 실패",
        });
      });
  }, [text]);
  const onDelete = useCallback((text) => {
    get<string[]>(StorageKey.words, [])
      .then((words) => {
        const index = words.indexOf(text);
        if (index !== -1) {
          return [...words.splice(0, index), ...words.splice(index + 1, words.length - 1)];
        }

        return words;
      })
      .then((words) => set(StorageKey.words, words))
      .then(refresh);
  }, []);
  const { push } = useNavigation();

  return (
    <List navigationTitle={"T"} isLoading={isLoading} onSearchTextChange={setText} searchBarPlaceholder="원문" throttle>
      <List.Section title={text} subtitle="번역문">
        {itemList.map((item) => (
          <TranslateListItem key={item.key} item={item} onSave={onSave} />
        ))}
      </List.Section>
      <List.Section title="설정">
        <List.Item
          title="설정"
          accessoryIcon={Icon.Gear}
          icon={Icon.Gear}
          accessoryTitle="서비스 키 입력"
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <Action
                  title="보기"
                  onAction={() => {
                    push(<Configure />);
                  }}
                />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />
      </List.Section>
      <List.Section title="저장된 검색 결과" subtitle="기록" key={refreshCount}>
        <HistoryList onSelect={setText} onDelete={onDelete} />
      </List.Section>
    </List>
  );
}
