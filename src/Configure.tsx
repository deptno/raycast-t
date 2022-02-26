import { Action, ActionPanel, Form } from "@raycast/api";
import { FunctionComponent } from "react";
import { useConfigure } from "./useConfigure";

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
        </ActionPanel>
      }
      isLoading={isLoading}
    >
      <Form.Description title="파파고" text="https://papago.naver.com" />
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