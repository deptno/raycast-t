import { Action, ActionPanel, Form } from "@raycast/api";
import { FunctionComponent } from "react";
import { useConfigure } from "../hook/useConfigure";

export const Configure: FunctionComponent = () => {
  const { state, isLoading, onSubmit } = useConfigure();

  if (isLoading) {
    return null;
  }
  return (
    <Form
      navigationTitle="설정"
      actions={
        <ActionPanel>
          <Action.SubmitForm title="저장" onSubmit={onSubmit} />
          <Action.OpenInBrowser title="파파고 토큰 발급" url="https://developers.naver.com/apps/#/register" />
        </ActionPanel>
      }
    >
      <Form.Description title="파파고" text="없을시 하단 메뉴에서 토큰 발급" />
      {Object.entries(ID_PALCEHOLDER_PAIR).map(([id, placeholder]) => (
        <Form.TextField key={id} id={id} title={id} placeholder={placeholder} defaultValue={state[id]} />
      ))}
      <Form.Separator />
    </Form>
  );
};

const ID_PALCEHOLDER_PAIR = {
  "X-Naver-Client-Id": "xxxxxxxxxxxxxxxxxxxx",
  "X-Naver-Client-Secret": "xxxxxxxxxx",
};
