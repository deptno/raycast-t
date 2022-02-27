import { Action, ActionPanel, Detail, List, showToast, Toast, useNavigation } from "@raycast/api";
import { TranslateListItemData } from "./service/type";
import { FunctionComponent, useCallback } from "react";

export const TranslateListItem: FunctionComponent<TranslateListItemData> = (item) => {
  const { push } = useNavigation();
  const onSave = useCallback(() => {
    return showToast({
      style: Toast.Style.Animated,
      title: "todo:",
    });
  }, []);
  const onAction = useCallback(() => {
    if (item.text) {
      return push(
        <Detail
          markdown={item.text}
          navigationTitle={item.service}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <Action title="저장" onAction={onSave} />
                <Action.CopyToClipboard title="Copy" content={item.text} shortcut={{ modifiers: ["cmd"], key: "." }} />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />
      );
    }

    return showToast({
      style: Toast.Style.Failure,
      title: "번역문이 없습니다.",
    });
  }, [item]);

  return (
    <List.Item
      title={item.text || "..."}
      icon={item.icon}
      accessoryTitle={item.service}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action title="보기" onAction={onAction} />
          </ActionPanel.Section>
          <ActionPanel.Section>
            <Action.CopyToClipboard title="Copy" content={item.text} shortcut={{ modifiers: ["cmd"], key: "." }} />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
};
