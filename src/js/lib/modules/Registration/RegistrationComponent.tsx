import { Heading } from "@react-spectrum/s2";
import {
  PlacementOptionsDisclosure,
  RegistrationActionBar,
  RegistrationDisclosure,
} from "./components";
import { RegistrationProvider } from "./contexts/RegistrationContext";

export function RegistrationComponent() {
  return (
    <RegistrationProvider>
      {/* <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        alignContent={"center"}
      >
        <Heading level={2}>Registration</Heading>
      </Flex> */}
      <Heading level={2}>Registration</Heading>
      <RegistrationDisclosure />
      <PlacementOptionsDisclosure />
      <RegistrationActionBar />
    </RegistrationProvider>
  );
}
