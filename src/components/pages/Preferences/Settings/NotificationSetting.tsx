import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Switch, Platform, TouchableOpacity, ActivityIndicator, Linking, Alert } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components/native";
import { BaseResponse, ErrorResponse, PushAlarmResponse, UserApi, UserPushAlarmRequest } from "api";
import messaging from "@react-native-firebase/messaging";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { lightTheme } from "app/theme";
import { ProfileStackParamList } from "@navigation/ProfileStack";

const Loader = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;
const Header = styled.View`
  padding: 10px 20px;
  margin-top: 3px;
`;
const HeaderTitle = styled.Text`
  font-family: ${(props) => props.theme.koreanFontB};
  font-size: 18px;
  line-height: 22px;
  color: #2b2b2b;
  margin-bottom: 5px;
`;

const HeaderText = styled.Text`
  font-family: ${(props) => props.theme.koreanFontR};
  font-size: 12px;
  line-height: 18px;
  color: #b0b0b0;
  margin-top: 1px;
`;

const Main = styled.View`
  padding: 0px 20px;
  margin-top: 5px;
`;

const Item = styled.View`
  margin: 5px 0px;
`;

const ItemSub = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 30px;
`;

const ItemTitle = styled.Text`
  font-family: ${(props) => props.theme.koreanFontR};
  font-size: 18px;
  line-height: 21px;
  color: #2b2b2b;
`;

const ItemText = styled.Text`
  font-family: ${(props) => props.theme.koreanFontR};
  font-size: 12px;
  color: #b0b0b0;
`;

const NotificationSetting: React.FC<NativeStackScreenProps<ProfileStackParamList, "NotificationSetting">> = ({ navigation: { navigate, goBack, setOptions } }) => {
  const toast = useToast();
  const [permission, setPermission] = useState<boolean>(false);
  const [userPush, setUserPush] = useState<boolean>(false);
  const [clubPush, setClubPush] = useState<boolean>(false);

  const { isLoading: isLoadingPushData } = useQuery<PushAlarmResponse, ErrorResponse>(["getPushAlaram"], UserApi.getPushAlarm, {
    onSuccess: (res) => {
      if (res?.data?.userPushAlarm === "Y") setUserPush(true);
      else setUserPush(false);
      if (res?.data?.clubPushAlarm === "Y") setClubPush(true);
      else setClubPush(false);
    },
    onError: (error) => {
      console.log(`API ERROR | getPushAlaram ${error.code} ${error.status}`);
      toast.show(`${error.message ?? error.code}`, { type: "warning" });
    },
    enabled: permission,
  });

  const setPushAlarmMutation = useMutation<BaseResponse, ErrorResponse, UserPushAlarmRequest>(UserApi.setPushAlarm, {
    onSuccess: (res) => {},
    onError: (error) => {
      console.log(`API ERROR | setPushAlarm ${error.code} ${error.status}`);
      toast.show(`${error.message ?? error.code}`, { type: "warning" });
    },
  });

  const checkPermission = async () => {
    const authStatus = await messaging().hasPermission();
    if (authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      setPermission(true);
    } else {
      Alert.alert("기기 알림을 켜주세요.", "알림을 받기 위해서 기기 알림을 켜주세요.", [{ text: "아니요" }, { text: "네", onPress: () => openNotificationSettings() }], { cancelable: false });
    }
  };

  const openNotificationSettings = async () => {
    try {
      await Linking.openSettings();
    } catch (error) {
      console.error("알림 설정 화면을 열 수 없습니다.", error);
    }
  };

  useLayoutEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => goBack()}>
          <Entypo name="chevron-thin-left" size={20} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    checkPermission();
  }, []);

  const onValueChange = async (alarmType: "USER" | "CLUB") => {
    if (!permission) {
      checkPermission();
      return;
    }

    let isOnOff: "Y" | "N" = "Y";
    if (alarmType === "USER") {
      isOnOff = userPush ? "N" : "Y";
      setUserPush((prev) => !prev);
    }
    if (alarmType === "CLUB") {
      isOnOff = clubPush ? "N" : "Y";
      setClubPush((prev) => !prev);
    }

    const requestData: UserPushAlarmRequest = {
      alarmType,
      isOnOff,
    };
    setPushAlarmMutation.mutate(requestData);
  };

  return isLoadingPushData ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Header>
        <HeaderTitle>{`푸시 알림`}</HeaderTitle>
        <HeaderText>{`모임 가입과 관련된 메세지의 푸시 알림을 설정합니다.\n알람이 오지 않을 경우 휴대폰 > 설정 > 알림 > OnYou를 확인해주세요.`}</HeaderText>
      </Header>
      <Main>
        <Item>
          <ItemSub>
            <ItemTitle>{`개인 알람`}</ItemTitle>
            <Switch
              trackColor={{ false: "#D4D4D4", true: lightTheme.primaryColor }}
              thumbColor={"white"}
              onValueChange={() => onValueChange("USER")}
              value={userPush}
              style={Platform.OS === "ios" ? { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] } : {}}
            />
          </ItemSub>
          <ItemText>{`홈화면 알림창에서 확인 할 수 있는 모임 가입 신청 결과`}</ItemText>
        </Item>
        <Item>
          <ItemSub>
            <ItemTitle>{`모임 알람`}</ItemTitle>
            <Switch
              trackColor={{ false: "#D4D4D4", true: lightTheme.primaryColor }}
              thumbColor={"white"}
              onValueChange={() => onValueChange("CLUB")}
              value={clubPush}
              style={Platform.OS === "ios" ? { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] } : {}}
            />
          </ItemSub>
          <ItemText>{`관리자로 있는 모임에서 가입 신청서를 확인할 수 있는 메세지 박스`}</ItemText>
        </Item>
      </Main>
    </Container>
  );
};

export default NotificationSetting;
