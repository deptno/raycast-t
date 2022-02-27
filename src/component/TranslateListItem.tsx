import { Action, ActionPanel, Detail, List, showToast, Toast, useNavigation } from "@raycast/api";
import { TranslateListItemData } from "../service/type";
import { FunctionComponent, useCallback } from "react";

export const TranslateListItem: FunctionComponent<Props> = (props) => {
  const { item, onSave } = props;
  const { push } = useNavigation();
  const onAction = useCallback(() => {
    if (item.text) {
      // todo: support URL
      return push(
        <Detail
          markdown={item.text}
          navigationTitle={item.service}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <Action.CopyToClipboard title="복사" content={item.text} shortcut={{ modifiers: ["cmd"], key: "." }} />
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
            <Action title="저장" onAction={onSave} />
            <Action.CopyToClipboard title="복사" content={item.text} shortcut={{ modifiers: ["cmd"], key: "." }} />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
};

type Props = {
  item: TranslateListItemData;
  onSave(): void;
};
