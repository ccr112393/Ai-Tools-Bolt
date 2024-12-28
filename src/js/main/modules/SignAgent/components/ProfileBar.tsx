import { ComboBox, Flex, Item } from "@adobe/react-spectrum";
import { ProfilesDialog, useProfile } from "../";
import { componentGap, componentGapDouble } from "../../../utils";

export const ProfileBar = () => {
  const { profileList, activeProfile, setActiveProfile, readProfile } =
    useProfile();

  const handleProfileChange = (profileID: string) => {
    setActiveProfile(readProfile(profileID));
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
      <ProfilesDialog />
    </Flex>
  );
};
