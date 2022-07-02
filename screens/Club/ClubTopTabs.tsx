import React, { useState, useRef, useCallback, useMemo } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  Animated,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ClubHome from "../Club/ClubHome";
import ClubFeed from "../Club/ClubFeed";
import styled from "styled-components/native";
import ClubHeader from "../../components/ClubHeader";
import ClubTabBar from "../../components/ClubTabBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FloatingActionButton from "../../components/FloatingActionButton";

const Container = styled.View`
  flex: 1;
`;

const HeaderView = styled.View`
  position: absolute;
  z-index: 3;
  width: 100%;
  top: 40px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LeftHeaderView = styled.View`
  flex-direction: row;
  margin-left: 10px;
`;
const RightHeaderView = styled.View`
  flex-direction: row;
  margin-right: 10px;
`;

const TopTab = createMaterialTopTabNavigator();

const HEADER_HEIGHT_EXPANDED = 210;
const HEADER_HEIGHT = 100;

const ClubTopTabs = ({
  route: {
    params: { clubData },
  },
  navigation,
}) => {
  const [heartSelected, setHeartSelected] = useState<boolean>(false);
  // Header Height Definition
  const { top } = useSafeAreaInsets();
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const headerConfig = useMemo(
    () => ({
      heightCollapsed: top + HEADER_HEIGHT,
      heightExpanded: HEADER_HEIGHT_EXPANDED,
    }),
    [top, HEADER_HEIGHT, HEADER_HEIGHT_EXPANDED]
  );
  const { heightCollapsed, heightExpanded } = headerConfig;
  const headerDiff = heightExpanded - heightCollapsed;

  // Animated Variables
  const scrollY = useRef(new Animated.Value(0)).current;
  const translateY = scrollY.interpolate({
    inputRange: [0, headerDiff],
    outputRange: [0, -headerDiff],
    extrapolate: "clamp",
  });

  const renderClubHome = useCallback(
    (props) => (
      <ClubHome {...props} scrollY={scrollY} headerDiff={headerDiff} />
    ),
    [headerDiff]
  );

  const clubEdit = () => {
    console.log("edit button click!");
  };

  return (
    <Container>
      <StatusBar barStyle={"light-content"} />
      <HeaderView>
        <LeftHeaderView>
          <TouchableOpacity onPress={() => navigation.popToTop()}>
            <Ionicons name="md-chevron-back-sharp" size={24} color="white" />
          </TouchableOpacity>
        </LeftHeaderView>
        <RightHeaderView>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
              console.log(visible);
            }}
            style={{ marginRight: 10 }}
          >
            {heartSelected ? (
              <Ionicons name="md-heart" size={24} color="white" />
            ) : (
              <Ionicons name="md-heart-outline" size={24} color="white" />
            )}
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <Ionicons
              name="ellipsis-vertical"
              size={24}
              color="white"
            />
          </TouchableOpacity> */}
        </RightHeaderView>
      </HeaderView>

      <ClubHeader
        imageURI={clubData.thumbnail}
        name={clubData.name}
        shortDesc={clubData.clubShortDesc}
        category1Name={clubData.category1Name}
        category2Name={clubData.category2Name}
        recruitStatus={clubData.recruitStatus}
        heightExpanded={heightExpanded}
        heightCollapsed={heightCollapsed}
        headerDiff={headerDiff}
        scrollY={scrollY}
      />

      <Animated.View
        style={{
          position: "absolute",
          zIndex: 2,
          flex: 1,
          width: "100%",
          height: SCREEN_HEIGHT + headerDiff,
          paddingTop: heightExpanded,
          transform: [{ translateY }],
        }}
      >
        <TopTab.Navigator
          initialRouteName="ClubHome"
          screenOptions={{
            swipeEnabled: false,
          }}
          tabBar={(props) => <ClubTabBar {...props} />}
          sceneContainerStyle={{ position: "absolute", zIndex: 1 }}
        >
          <TopTab.Screen
            options={{ tabBarLabel: "모임 정보" }}
            name="ClubHome"
            component={renderClubHome}
            initialParams={{ clubData }}
          />
          <TopTab.Screen
            options={{ tabBarLabel: "게시물" }}
            name="ClubFeed"
            component={ClubFeed}
          />
        </TopTab.Navigator>
      </Animated.View>

      <FloatingActionButton onPressEdit={clubEdit} />
    </Container>
  );
};

export default ClubTopTabs;
