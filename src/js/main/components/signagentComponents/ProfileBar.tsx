import { Flex, Item, Picker } from "@adobe/react-spectrum";
import { componentGap, componentGapDouble } from "../../modules";
import { ProfilesDialog } from "./ProfilesDialog";
import { useProfile } from "../../contexts";

export const ProfileBar = () => {
  const { activeProfileID, setActiveProfileID, profileList, setActiveProfile } =
    useProfile();

  const handleProfileChange = (profileID: string) => {
    setActiveProfileID(profileID);
  };

  return (
    <Flex
      direction="row"
      alignItems="end"
      marginBottom={componentGapDouble}
      gap={componentGap}
    >
      <Picker
        selectedKey={activeProfileID}
        onSelectionChange={(key) => handleProfileChange(key as string)}
        items={profileList.filter((item) => item.name !== "")}
      >
        {(item) => <Item key={item.id}>{item.name}</Item>}
      </Picker>
      <ProfilesDialog profiles={profileList} />
    </Flex>
  );
};
