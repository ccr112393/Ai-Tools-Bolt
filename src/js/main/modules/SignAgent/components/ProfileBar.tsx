import { ComboBox, Flex, Item } from "@adobe/react-spectrum";
import { ProfilesDialog } from "./ProfilesDialog";
import { componentGapDouble, componentGap } from "../../../utils";
import { useProfile } from "../contexts";

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
