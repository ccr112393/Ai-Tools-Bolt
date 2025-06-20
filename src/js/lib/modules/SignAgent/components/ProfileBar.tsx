import { ActionButton, ComboBox, Flex, Item } from "@adobe/react-spectrum";
import {
  componentGap,
  componentGapDouble,
  componentWidth,
} from "../../../utils";
import { useProfile, useTabContext } from "../contexts";

export const ProfileBar = () => {
  const { profileList, activeProfile, setActiveProfile, readProfile } =
    useProfile();

  const handleProfileChange = (profileID: string) => {
    setActiveProfile(readProfile(profileID));
  };

  const { setSelectedTab } = useTabContext();

  const handleManageProfiles = () => {
    setSelectedTab("profiles");
  };

  return (
    <Flex
      direction="row"
      alignItems="end"
      marginBottom={componentGapDouble}
      gap={componentGap}
    >
      <ComboBox
        selectedKey={activeProfile.id}
        onSelectionChange={(key) => handleProfileChange(key as string)}
        items={profileList}
        flex
      >
        {(item) => <Item key={item.id}>{item.name}</Item>}
      </ComboBox>
      {/* <ProfilesDialog /> */}
      <ActionButton
        gridColumn={"field"}
        width={componentWidth}
        alignSelf={"end"}
        onPress={() => {
          handleManageProfiles();
        }}
      >
        Manage Profiles
      </ActionButton>
    </Flex>
  );
};
