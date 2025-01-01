import { Icon } from "@adobe/react-spectrum";
import { ModuleType, RenameComponent } from "..";

export const RenameIcon = (
  <Icon>
    <svg x="0px" y="0px" viewBox="0 0 18 18">
      <rect x="15.5" width="1" height="18" />
      <path
        d="M12.8,15.9l-5-13.7C7.8,2,7.8,2,7.7,2H5.6C5.6,2,5.5,2,5.5,2.1c0,0,0,0,0,0v0c0,0.3,0,0.6-0.2,0.9L0.7,15.8
	c0,0.1,0,0.2,0.1,0.2h1.4c0.1,0,0.2,0,0.2-0.1L4,11.5h5.3l1.6,4.4C11,16,11,16,11.1,16h1.6C12.8,16,12.8,15.9,12.8,15.9z M6.7,3.4
	L6.7,3.4c0.4,1.4,1.7,5,2.2,6.6H4.5C5.3,7.7,6.3,4.7,6.7,3.4z"
      />
    </svg>
  </Icon>
);

export const RenameKey = "RNM";

export default RenameComponent;

export const RenameModule: ModuleType = {
  key: RenameKey,
  name: "Rename",
  component: RenameComponent,
  icon: RenameIcon,
};
