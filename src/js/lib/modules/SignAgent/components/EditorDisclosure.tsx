import {
  Content,
  ContextualHelp,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Heading,
  StatusLight,
  Text
} from "@react-spectrum/s2";

import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useProfile } from "../contexts";
import CodeEditor from "./CodeEditor";

export const EditorDisclosure = () => {
  const { activeProfile, setActiveProfile } = useProfile();
  const customCode = activeProfile.customCode || "";
  const updateCustomCode = (code: string) => {
    setActiveProfile((prevSettings) => ({
      ...prevSettings,
      customCode: code,
    }));
    console.log("Custom code updated:", code);
  };

  return (
    <Disclosure id="editor">
      <DisclosureTitle>
        <Heading
          level={5}
          styles={style({
            margin: 0,
            flex: 1
          })}>
          Custom Code
        </Heading>
        <StatusLight
          variant="informative"
        />
        <ContextualHelp variant="help" placement="bottom">
          <Content styles={style({
            marginTop: 0
          })}>
            <Text>
              Allows adding custom formatting commands. Recognized commands,
              numbers, and units will automatically highlight for readability.
            </Text>
            <div

              className={style({
                display: "block",
                textAlign: "start",
                minWidth: 160,
                padding: 16,
                marginTop: 4,
                borderWidth: 1,
                borderRadius: "sm",
                backgroundColor: "layer-1",
                borderStyle: "solid",
                borderColor: "transparent-black-75",
                font: "body-sm"
              })}>
              align_left_to_right: message 0.375 inches
            </div>
          </Content>
        </ContextualHelp>
      </DisclosureTitle>
      <DisclosurePanel>
        <CodeEditor code={customCode} setCode={updateCustomCode} />
        {/* <LiveEditor code={customCode} setCode={updateCustomCode} /> */}
      </DisclosurePanel>
    </Disclosure>
  );
};
