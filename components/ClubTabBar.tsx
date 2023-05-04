import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import React from "react";
import styled from "styled-components/native";

const TabBarContainer = styled.View<{ height: number }>`
  width: 100%;
  background-color: white;
  padding: 0px 20px;
  flex-direction: row;
  align-items: center;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-top-color: rgba(0, 0, 0, 0.2);
  border-bottom-color: rgba(0, 0, 0, 0.2);
`;

const TabButton = styled.TouchableOpacity<{ isFocused: boolean; height: number }>`
  flex: 1;
  height: ${(props: any) => props.height}px;
  justify-content: center;
  align-items: center;
  border-bottom-width: 2px;
  border-bottom-color: ${(props: any) => (props.isFocused ? props.theme.primaryColor : "transparent")};
`;

const TextWrap = styled.View<{ height: number }>`
  height: ${(props: any) => props.height}px;
  justify-content: center;
`;

const TabText = styled.Text<{ isFocused: boolean }>`
  font-family: ${(props: any) => (props.isFocused ? props.theme.koreanFontM : props.theme.koreanFontR)};
  font-size: 14px;
  line-height: ${(props: any) => (props.isFocused ? 15 : 16)}px;
  color: ${(props: any) => (props.isFocused ? "black" : "#818181")};
`;

interface TabBarProps {
  height: number;
}

const ClubTabBar: React.FC<MaterialTopTabBarProps & TabBarProps> = ({ state, descriptors, navigation, height }) => {
  return (
    <TabBarContainer height={height}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        return (
          <TabButton
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            height={height}
            isFocused={isFocused}
          >
            <TextWrap height={height}>
              <TabText isFocused={isFocused}>{label}</TabText>
            </TextWrap>
          </TabButton>
        );
      })}
    </TabBarContainer>
  );
};

export default ClubTabBar;
