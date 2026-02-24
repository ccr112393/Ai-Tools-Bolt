import {
  Popover,
  ActionButton,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Heading,
  Text,
} from "@react-spectrum/s2";

import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import Settings from "@react-spectrum/s2/icons/Settings";
import { Fragment } from "react/jsx-runtime";

interface PreferencesPopoverProps {
  heading?: String;
  options: Array<[string, React.ReactElement]>;
}

const PreferencesPopover: React.FC<PreferencesPopoverProps> = (
  props
) => {
  return (
    <DialogTrigger>
      <ActionButton isQuiet>
        <Settings size="S" />
      </ActionButton>
      <Popover
        styles={style({
          maxWidth: 128
        })}
        placement="bottom end">
        <Heading>{props.heading ? props.heading : "Preferences"}</Heading>
        <Divider />
        <Content>
          <div
            className={style({
              display: "grid",
              gridTemplateAreas: ["label component"],
              gap: 8,
              justifyContent: "space-between",
              alignItems: "center"
            })}>
            {props.options.map(([name, component], index) => (
              <Fragment key={index}>
                <Text>{name}</Text>
                <>{component}</>
              </Fragment>
            ))}
          </div>
        </Content>
      </Popover>
    </DialogTrigger>
  );
};
