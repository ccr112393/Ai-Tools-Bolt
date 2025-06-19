import {
  Content,
  ContextualHelp,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Heading,
  StatusLight,
  Text,
  Well,
} from "@adobe/react-spectrum";
import { useProfile } from "../contexts";
import { componentGap } from "../../../utils";
import LiveEditor from "./Editor";

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
        <Heading level={5} margin={0} flex>
          Custom Code
        </Heading>
        <StatusLight
          isDisabled={customCode.length === 0}
          variant="info"
          marginTop={-7}
          marginBottom={-10}
        />
        <ContextualHelp variant="help" placement="bottom end">
          <Content marginTop={0}>
            <Text>
              Allows adding custom formatting commands. Recognized commands,
              numbers, and units will automatically highlight for readability.
            </Text>
            <Well marginTop={componentGap}>
              align_left_to_right: message 0.375 inches
            </Well>
          </Content>
        </ContextualHelp>
      </DisclosureTitle>
      <DisclosurePanel>
        <LiveEditor code={customCode} setCode={updateCustomCode} />
      </DisclosurePanel>
    </Disclosure>
  );
};
