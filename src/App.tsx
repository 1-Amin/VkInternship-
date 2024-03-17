import "@vkontakte/vkui/dist/vkui.css";
import React from "react";
import CatFacts from "./components/CatFacts";
import AgeDefiner from "./components/AgeDefiner";
import {
  SplitLayout,
  SplitCol,
  Panel,
  Group,
  Cell,
  Epic,
  Tabbar,
  TabbarItem,
  View,
  PanelHeader,
  usePlatform,
  useAdaptivityConditionalRender,
} from "@vkontakte/vkui";
import { Icon28PawOutline, Icon28UserOutline } from "@vkontakte/icons";

const App = () => {
  const platform = usePlatform();
  const { viewWidth } = useAdaptivityConditionalRender();
  const [activeStory, setActiveStory] = React.useState("feed");
  const activeStoryStyles = {
    backgroundColor: "var(--vkui--color_background_secondary)",
    borderRadius: 8,
  };
  const onStoryChange = (e: any) =>
    setActiveStory(e.currentTarget.dataset.story);
  const hasHeader = platform !== "vkcom";

  return (
    <SplitLayout
      header={hasHeader && <PanelHeader delimiter="none" />}
      style={{ justifyContent: "center" }}
    >
      {viewWidth.tabletPlus && (
        <SplitCol
          className={viewWidth.tabletPlus.className}
          fixed
          width={280}
          maxWidth={280}
        >
          <Panel>
            {hasHeader && <PanelHeader />}
            <Group>
              <Cell
                disabled={activeStory === "feed"}
                style={activeStory === "feed" ? activeStoryStyles : undefined}
                data-story="feed"
                onClick={onStoryChange}
                before={<Icon28PawOutline />}
              >
                Cat Facts
              </Cell>
              <Cell
                disabled={activeStory === "services"}
                style={
                  activeStory === "services" ? activeStoryStyles : undefined
                }
                data-story="services"
                onClick={onStoryChange}
                before={<Icon28UserOutline />}
              >
                Age Definer
              </Cell>
            </Group>
          </Panel>
        </SplitCol>
      )}

      <SplitCol width="100%" maxWidth="560px" stretchedOnMobile autoSpaced>
        <Epic
          activeStory={activeStory}
          tabbar={
            viewWidth.tabletMinus && (
              <Tabbar className={viewWidth.tabletMinus.className}>
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === "feed"}
                  data-story="feed"
                  text="Cat Facts"
                >
                  <Icon28PawOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === "services"}
                  data-story="services"
                  text="Age Definer"
                >
                  <Icon28UserOutline />
                </TabbarItem>
              </Tabbar>
            )
          }
        >
          <View id="feed" activePanel="feed">
            <Panel id="feed">
              <PanelHeader>Cat Facts</PanelHeader>
              <Group style={{ height: "1000px" }}>
                <CatFacts />
              </Group>
            </Panel>
          </View>
          <View id="services" activePanel="services">
            <Panel id="services">
              <PanelHeader>Age Definer</PanelHeader>
              <Group style={{ height: "1000px" }}>
                <AgeDefiner />
              </Group>
            </Panel>
          </View>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};

export default App;
