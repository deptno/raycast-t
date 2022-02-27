import { Action, ActionPanel, Detail, Icon, List, useNavigation } from "@raycast/api";
import { useSearch } from "./useSearch";
import { TranslateListItem } from "./TranslateListItem";
import { Configure } from "./Configure";

export default function Command() {
  const { isLoading, setText, itemList } = useSearch();
  const { push } = useNavigation()

  return (
    <List navigationTitle={"T"} isLoading={isLoading} onSearchTextChange={setText} searchBarPlaceholder="원문" throttle>
      <List.Section title="번역문" subtitle={"결과"}>
        {itemList.map((item) => (
          <TranslateListItem key={item.key} text={item.text} icon={item.icon} service={item.service} />
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
                    push(<Configure />)
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
