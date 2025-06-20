import { View } from "@adobe/react-spectrum";
import { GettingStartedDisclosure } from "./components";
import { ProfileView } from "./components/ProfileView";
import { SignAgentComponent } from "./SignAgentComponent";
import { useMemo, useState } from "react";
import { TabContext } from "./contexts";

export const SignAgentTabs = () => {
  const loadedTabs = [
    {
      key: "signagent",
      name: "SignAgent",
      component: SignAgentComponent,
    },
    {
      key: "profiles",
      name: "Profiles",
      component: ProfileView,
    },
    {
      key: "colors",
      name: "colors",
      component: GettingStartedDisclosure,
    },
  ];

  const [selectedTab, setSelectedTab] = useState<string>(loadedTabs[0].key);

  const memoizedTabs = useMemo(() => {
    return loadedTabs.map((item) => (
      <View key={item.key} isHidden={selectedTab !== item.key}>
        <item.component />
      </View>
    ));
  }, [selectedTab]);

  return (
    <TabContext.Provider value={{ selectedTab, setSelectedTab }}>
      {memoizedTabs}
    </TabContext.Provider>
  );
};
