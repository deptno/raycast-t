import { Action, ActionPanel, getPreferenceValues, Icon, List, useNavigation } from "@raycast/api";
import { useSearch } from "./hook/useSearch";
import { TranslateListItem } from "./component/TranslateListItem";
import { Configure } from "./component/Configure";
import { HistoryList } from "./component/HistoryList";
import { useHistory } from "./hook/useHistory";

export default function Command() {
  const { source, target } = getPreferenceValues();
  const { isLoading, text, setText, itemList } = useSearch(source, target);
  const { histories, onSave, onDelete } = useHistory(text);
  const { push } = useNavigation();

  return (
    <List navigationTitle={"T"} isLoading={isLoading} onSearchTextChange={setText} searchBarPlaceholder="원문" throttle>
      <List.Section title={text} subtitle="번역문">
        {itemList.map((item) => (
          <TranslateListItem key={item.key} item={item} onSave={onSave} />
        ))}
      </List.Section>
      <List.Section title="저장된 검색 결과" subtitle={`기록(${histories.length})`}>
        <HistoryList items={histories} onSelect={setText} onDelete={onDelete} />
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
    </List>
  );
}
