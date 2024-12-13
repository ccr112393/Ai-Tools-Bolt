import { Icon } from "@adobe/react-spectrum";
import { ModuleType } from "./moduleInterface";
import { SignAgentComponent } from "./signagentComponent";

export const SignAgentIcon = (
  <Icon>
    <svg width=".2165in" height=".25in" viewBox="0 0 15.58794 18">
      <polygon points="10.68983 8.9997 15.58794 6.14818 4.93898 0 4.91855 5.66765 10.68983 8.9997" />
      <polygon points="4.91855 12.33235 4.93898 18 15.58794 11.85182 10.68983 9.0003 4.91855 12.33235" />
      <polygon points="4.91855 5.66766 0 2.85153 0 15.14789 4.91855 12.33176 4.91855 5.66766" />
    </svg>
  </Icon>
);

export default SignAgentComponent;

export const SignAgentModule: ModuleType = {
  key: "sat",
  name: "SignAgent™ Tools",
  component: SignAgentComponent,
  icon: SignAgentIcon,
};
