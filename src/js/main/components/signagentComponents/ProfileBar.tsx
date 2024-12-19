import { Flex, Item, Picker } from "@adobe/react-spectrum";
import {
  componentGap,
  componentGapDouble,
  SignAgentProfile,
} from "../../modules";
import { ProfilesDialog } from "./ProfilesDialog";

export interface ProfileBarProps {
  profiles: SignAgentProfile[];
  setProfiles: React.Dispatch<React.SetStateAction<SignAgentProfile[]>>;
  activeProfile: string;
  setActiveProfile: React.Dispatch<React.SetStateAction<string>>;
}

export const ProfileBar: React.FC<ProfileBarProps> = ({
  profiles,
  setProfiles,
  activeProfile,
  setActiveProfile,
}) => {
  return (
    <Flex
      direction="row"
      alignItems="end"
      marginBottom={componentGapDouble}
      gap={componentGap}
    >
      <Picker
        selectedKey={activeProfile}
        onSelectionChange={(key) => setActiveProfile(key as string)}
        items={profiles}
      >
        {(item) => <Item key={item.id}>{item.name}</Item>}
      </Picker>
      <ProfilesDialog profiles={profiles} setProfiles={setProfiles} />
    </Flex>
  );
};
