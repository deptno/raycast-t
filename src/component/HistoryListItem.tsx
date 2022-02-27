import { Action, ActionPanel, List } from "@raycast/api";
import { FunctionComponent } from "react";

export const HistoryListItem: FunctionComponent<Props> = (props) => {
  const { item, onSelect, onDelete } = props
  return (
    <List.Item
      title={item}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action
              title="보기"
              onAction={() => onSelect(item)}
            />
            <Action
              title="삭제"
              onAction={() => onDelete(item)}
            />
            <Action.CopyToClipboard title="복사" content={item} shortcut={{ modifiers: ["cmd"], key: "." }} />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
};

type Props = {
  item: string
  onSelect(text: string): void
  onDelete(text: string): void
}