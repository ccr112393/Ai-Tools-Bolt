import {
  Accordion,
  ActionButton,
  Content,
  Dialog,
  DialogTrigger,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Heading,
  Item,
  StatusLight,
  TagGroup,
} from "@adobe/react-spectrum";
import { isEqual } from "lodash";
import { useState } from "react";
import {
  componentGap,
  deleteLocalStorage,
  getLocalStorageList,
  getLogger,
} from "../../../utils";

export function Inspector() {
  const logger = getLogger();
  const storageList = getLocalStorageList().map((filename) => ({
    id: filename,
    name: filename,
  }));
  const [logStatus, setLogStatus] = useState({
    isStored: false,
    sessionLogs: [""],
    logs: [""],
  });

  const updateLog = () => {
    const newLogStatus = logger.getLoggerStatus();
    if (!isEqual(newLogStatus, logStatus)) {
      setLogStatus(newLogStatus);
    }
  };

  const handleAction = (action: string, value?: any) => {
    switch (action) {
      case "refresh":
        updateLog();
        break;

      case "removeStorage":
        deleteLocalStorage(value);
        updateLog();

      default:
        break;
    }
  };

  return (
    <DialogTrigger isDismissable onOpenChange={() => updateLog()}>
      <ActionButton isQuiet>Inspector</ActionButton>
      {(closeDialog) => (
        <Dialog
          size="S"
          onDismiss={() => {
            closeDialog();
          }}
        >
          <Heading>Inspector</Heading>
          {/* <Footer>
            <ActionButton onPress={() => handleAction("refresh")}>
              <Refresh size="S" />
            </ActionButton>
          </Footer> */}
          <Content>
            <StatusLight
              variant={logger.isStored() ? "positive" : "negative"}
              marginY={componentGap}
            >
              {logger.isStored()
                ? "Using Local Storage"
                : "Not using Local Storage"}
            </StatusLight>
            <Accordion>
              <Disclosure>
                <DisclosureTitle>
                  Stored File List [{storageList.length}]
                </DisclosureTitle>
                <DisclosurePanel>
                  <TagGroup
                    items={storageList}
                    onRemove={(keys) =>
                      keys.forEach((key) =>
                        handleAction("removeStorage", key as string)
                      )
                    }
                  >
                    {(items) => <Item key={items.id}>{items.name}</Item>}
                  </TagGroup>
                </DisclosurePanel>
              </Disclosure>
              <Disclosure>
                <DisclosureTitle>Session Logs</DisclosureTitle>
                <DisclosurePanel>
                  <pre>{logStatus.sessionLogs}</pre>
                </DisclosurePanel>
              </Disclosure>
              {logger.isStored() ? (
                <Disclosure>
                  <DisclosureTitle>Stored Logs</DisclosureTitle>
                  <DisclosurePanel>
                    <pre>{logStatus.sessionLogs}</pre>
                  </DisclosurePanel>
                </Disclosure>
              ) : null}
            </Accordion>
          </Content>
        </Dialog>
      )}
    </DialogTrigger>
  );
}
