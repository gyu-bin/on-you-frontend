import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const BackgroundView = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ContentView = styled.View`
  margin-bottom: 240px;
  justify-content: center;
  align-items: center;
`;

const ContentText = styled.Text`
  font-family: "AppleSDGothicNeoM";
  font-size: 18px;
  margin-bottom: 10px;
`;

const ContentTitle = styled.Text`
  font-family: "TT-Commons-Bold";
  font-size: 40px;
`;

const ButtonView = styled.View`
  position: absolute;
  bottom: 7%;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const JoinButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 48px;
  margin-right: 25px;
  border: 1px white solid;
  border-radius: 30px;
  background-color: black;
`;

const LoginButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 48px;
  border: 1px white solid;
  border-radius: 30px;
  background-color: black;
`;

const JoinTitle = styled.Text`
  font-family: "AppleSDGothicNeoM";
  color: white;
  font-size: 20px;
  line-height: 21px;
`;

const LoginTitle = styled.Text`
  font-family: "AppleSDGothicNeoM";
  color: white;
  font-size: 20px;
  line-height: 21px;
`;

const Logo = styled.Image`
  height: 120px;
  width: 120px;
`;

const Main: React.FC<NativeStackScreenProps<any, "Main">> = ({ navigation: { navigate } }) => {
  const goToLogin = () => {
    navigate("LoginStack", {
      screen: "Login",
    });
  };

  const goToJoinStepOne = () => {
    navigate("SignUpStack", {
      screen: "JoinStepOne",
    });
  };

  return (
    <Container>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      <BackgroundView source={require("../../assets/main_background.jpg")} resizeMode="cover">
        <ContentView>
          <ContentText>공동체와 함께하는 즐거운 시간</ContentText>
          <ContentTitle>ON YOU</ContentTitle>
        </ContentView>
        <ButtonView>
          <JoinButton onPress={goToJoinStepOne}>
            <JoinTitle>회원가입</JoinTitle>
          </JoinButton>
          <LoginButton onPress={goToLogin}>
            <LoginTitle>로그인</LoginTitle>
          </LoginButton>
        </ButtonView>
      </BackgroundView>
    </Container>
  );
};

export default Main;
