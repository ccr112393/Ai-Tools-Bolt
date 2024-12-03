import {
  ActionButton,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Grid,
  Heading,
  Text,
  View,
} from "@adobe/react-spectrum";
import Settings from "@spectrum-icons/workflow/Settings";
import { Fragment } from "react/jsx-runtime";

interface PreferencesPopoverProps {
  heading?: String;
  options: Array<[string, React.ReactElement]>;
}

const PreferencesPopover: React.FC<PreferencesPopoverProps> = (props) => {
  return (
    <DialogTrigger type="popover" placement="bottom end">
      <ActionButton isQuiet>
        <Settings size="S" />
      </ActionButton>
      <Dialog maxWidth={"size-1600"}>
        <Heading>{props.heading ? props.heading : "Preferences"}</Heading>
        <Divider />
        <Content>
          <Grid
            areas={["label component"]}
            gap={"size-100"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            {props.options.map(([name, component], index) => (
              <Fragment key={index}>
                <Text>{name}</Text>
                <>{component}</>
              </Fragment>
            ))}
          </Grid>
        </Content>
      </Dialog>
    </DialogTrigger>
  );
};

export default PreferencesPopover;
