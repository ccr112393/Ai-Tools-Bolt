import {
  ActionButton,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Grid,
  Heading,
  Text,
} from "@adobe/react-spectrum";
import Settings from "@spectrum-icons/workflow/Settings";
import { Fragment } from "react/jsx-runtime";

interface PreferencesPopoverProps {
  heading?: String;
  options: Array<[string, React.ReactElement]>;
}

const PreferencesPopover: React.FC<PreferencesPopoverProps> = (props) => {
  return (
    <DialogTrigger type="popover">
      <ActionButton isQuiet>
        <Settings />
      </ActionButton>
      <Dialog>
        <Heading>{props.heading ? props.heading : "Preferences"}</Heading>
        <Divider />
        <Content>
          <Grid areas={["label field"]} gap={"size-100"} alignItems={"center"}>
            {props.options.map(([name, component], index) => (
              <Fragment key={index}>
                <Text>{name}</Text>
                {component}
              </Fragment>
            ))}
          </Grid>
        </Content>
      </Dialog>
    </DialogTrigger>
  );
};

export default PreferencesPopover;
