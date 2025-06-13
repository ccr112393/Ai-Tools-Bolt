import {
  Accordion,
  ActionButton,
  Content,
  Dialog,
  DialogTrigger,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Footer,
  Heading,
  Item,
  ListBox,
  StatusLight,
  TagGroup,
} from "@adobe/react-spectrum";
import { forEach, isEqual } from "lodash";
import { useState } from "react";
import {
  componentGap,
  deleteLocalStorage,
  getLocalStorageList,
  getLogger,
  postToast,
} from "../../../utils";
import type { Selection } from "@adobe/react-spectrum";
import Refresh from "@spectrum-icons/workflow/Refresh";
import Delete from "@spectrum-icons/workflow/Delete";

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

  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set<string>()
  );

  const handleAction = (action: string, value?: any) => {
    switch (action) {
      case "refresh":
        updateLog();
        break;

      case "removeStorage":
        deleteLocalStorage(value);
        updateLog();

      case "removeSelected":
        const keysArray = Array.from(selectedKeys);
        keysArray.forEach((key) => {
          deleteLocalStorage(key.toString());
          postToast("negative", key.toString());
        });
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
          <Footer>
            <ActionButton
              onPress={() => handleAction("refresh")}
              aria-label="Refresh"
            >
              <Refresh size="S" />
            </ActionButton>
            <ActionButton
              onPress={() => handleAction("removeSelected")}
              aria-label="Delete"
            >
              <Delete size="S" />
            </ActionButton>
          </Footer>
          <Content>
            <StatusLight
              variant={storageList.length > 0 ? "positive" : "negative"}
              marginY={componentGap}
            >
              {storageList.length > 0
                ? "Using Local Storage"
                : "Not using Local Storage"}
            </StatusLight>
            <Accordion>
              <Disclosure>
                <DisclosureTitle>
                  Stored File List [{storageList.length}]
                </DisclosureTitle>
                <DisclosurePanel>
                  <ListBox
                    selectionMode="multiple"
                    items={storageList}
                    onSelectionChange={(selected) => setSelectedKeys(selected)}
                  >
                    {(items) => <Item key={items.id}>{items.name}</Item>}
                  </ListBox>
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
