import { View } from "@adobe/react-spectrum";
import { useMemo, useState } from "react";
import { ColorView, ProfileView } from "./components";
import { ColorProvider, TabContext } from "./contexts";
import { SignAgentComponent } from "./SignAgentComponent";

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
      key: "color",
      name: "color",
      component: ColorView,
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
      <ColorProvider>{memoizedTabs}</ColorProvider>
    </TabContext.Provider>
  );
};
