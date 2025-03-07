import React, { useLayoutEffect, useState } from "react";
import { ActivityIndicator, DeviceEventEmitter, KeyboardAvoidingView, Platform, StatusBar, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import CustomText from "@components/atoms/CustomText";
import { Calendar } from "react-native-calendars";
import Collapsible from "react-native-collapsible";
import DatePicker from "react-native-date-picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useToast } from "react-native-toast-notifications";
import { BaseResponse, ClubApi, ClubScheduleCreationRequest, ErrorResponse } from "api";
import { useMutation } from "react-query";
import moment from "moment";
import { Entypo } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ClubStackParamList } from "@navigation/ClubStack";

const Container = styled.SafeAreaView`
  flex: 1;
`;
const MainView = styled.ScrollView``;

const CalendarHeader = styled.View`
  align-items: center;
  padding: 10px 0px;
`;

const CalendarMonthText = styled.Text`
  font-family: ${(props) => props.theme.englishFontB};
  font-size: 18px;
  line-height: 24px;
`;
const CalendarYearText = styled.Text`
  font-family: ${(props) => props.theme.englishFontR};
  font-size: 12px;
  color: #737373;
`;

const Content = styled.View`
  border-top-width: 1px;
  border-top-color: rgba(0, 0, 0, 0.1);
  padding: 0px 20px;
  margin-bottom: 300px;
`;

const ItemView = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
`;

const TouchableItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0px;
`;

const InputItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0px;
`;

const ItemTitle = styled.Text`
  font-family: ${(props) => props.theme.koreanFontR};
  font-size: 14px;
  line-height: 20px;
`;
const ItemText = styled.Text`
  font-family: ${(props) => props.theme.koreanFontR};
  font-size: 16px;
  line-height: 23px;
  color: #6f6f6f;
`;

const InfoText = styled.Text`
  font-family: ${(props) => props.theme.koreanFontR};
  font-size: 12px;
  color: #b5b5b5;
`;

const ItemTextInput = styled.TextInput`
  font-family: ${(props) => props.theme.koreanFontR};
  font-size: 16px;
  line-height: 18px;
  color: #6f6f6f;
  flex: 1;
`;

const MemoView = styled.View`
  padding: 15px 0px;
`;

const ItemTitleView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MemoInput = styled.TextInput`
  font-family: ${(props) => props.theme.koreanFontR};
  margin-top: 15px;
  width: 100%;
  height: 300px;
  font-size: 13px;
  line-height: 20px;
  padding: 12px;
  background-color: #f3f3f3;
`;

const ClubScheduleAdd: React.FC<NativeStackScreenProps<ClubStackParamList, "ClubScheduleAdd">> = ({
  navigation: { navigate, goBack, setOptions },
  route: {
    params: { clubData },
  },
}) => {
  const toast = useToast();
  const [place, setPlace] = useState<string>("");
  const [memo, setMemo] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [dateTime, setDateTime] = useState(new Date(moment.tz("Asia/Seoul").format("YYYY-MM-DDTHH:mm:ss")));
  const [selectedDate, setSelectedDate] = useState<string>("");
  const markedDate = { [selectedDate]: { selected: true } };
  const memoMax = 1000;

  const scheduleMutation = useMutation<BaseResponse, ErrorResponse, ClubScheduleCreationRequest>(ClubApi.createClubSchedule, {
    onSuccess: (res) => {
      toast.show("일정 등록이 완료되었습니다.", { type: "success" });
      DeviceEventEmitter.emit("SchedulesRefetch");
      goBack();
    },
    onError: (error) => {
      console.log(`API ERROR | createClubSchedule ${error.code} ${error.status}`);
      toast.show(`${error.message ?? error.code}`, { type: "warning" });
    },
  });

  const save = () => {
    /** Data Validation */
    let validate = true;
    let dangerMsg = "";
    if (selectedDate === "") {
      validate = false;
      dangerMsg = "달력에서 날짜를 선택하세요.";
    } else if (place === "") {
      validate = false;
      dangerMsg = "모임 장소를 입력하세요.";
    } else if (memo === "") {
      validate = false;
      dangerMsg = "메모를 입력하세요.";
    }

    if (!validate) {
      toast.show(dangerMsg, {
        type: "danger",
      });
      return;
    }

    const startDate = `${selectedDate}T${dateTime.toTimeString().split(" ")[0]}`;
    const endDate = `${startDate.split("T")[0]}T23:59:59`;

    const requestData: ClubScheduleCreationRequest = {
      clubId: clubData?.id,
      content: memo,
      location: place,
      name: "schedule",
      startDate,
      endDate,
    };

    scheduleMutation.mutate(requestData);
  };

  useLayoutEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigate("ClubTopTabs", { clubId: clubData?.id })}>
          <Entypo name="chevron-thin-left" size={20} color="black" />
        </TouchableOpacity>
      ),
      headerRight: () =>
        scheduleMutation.isLoading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity onPress={save}>
            <CustomText style={{ color: "#2995FA", fontSize: 14, lineHeight: 20 }}>저장</CustomText>
          </TouchableOpacity>
        ),
    });
  }, [selectedDate, dateTime, place, memo, scheduleMutation.isLoading]);

  return (
    <Container>
      <StatusBar translucent backgroundColor={"transparent"} barStyle={"dark-content"} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={10} style={{ flex: 1 }}>
        <MainView>
          <Calendar
            theme={{
              arrowColor: "#6F6F6F",
              dotColor: "#FF6534",
              selectedDayBackgroundColor: "#FF6534",
              todayTextColor: "#FF6534",
            }}
            minDate={moment.tz("Asia/Seoul").format("YYYY-MM-DD")}
            context={{ date: "" }}
            markedDates={markedDate}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
            }}
            onPressArrowLeft={(subtractMonth) => subtractMonth()}
            onPressArrowRight={(addMonth) => addMonth()}
            renderHeader={(date) => (
              <CalendarHeader>
                <CalendarMonthText>{date.getMonth() + 1}</CalendarMonthText>
                <CalendarYearText>{date.getFullYear()}</CalendarYearText>
              </CalendarHeader>
            )}
          />
          <Content>
            <ItemView>
              <TouchableItem onPress={() => setShowDatePicker((prev) => !prev)}>
                <ItemTitle>모임 시간</ItemTitle>
                <ItemText>
                  {dateTime.getHours() < 12 ? "오전" : "오후"} {dateTime.getHours() > 12 ? dateTime.getHours() - 12 : dateTime.getHours() === 0 ? 12 : dateTime.getHours()}시{" "}
                  {dateTime.getMinutes().toString().padStart(2, "0")}분
                </ItemText>
              </TouchableItem>
            </ItemView>

            {Platform.OS === "android" ? (
              <Collapsible collapsed={!showDatePicker}>
                <ItemView style={{ width: "100%", alignItems: "center" }}>
                  <DatePicker date={dateTime} mode="time" onDateChange={setDateTime} textColor="black" />
                </ItemView>
              </Collapsible>
            ) : (
              <Collapsible collapsed={!showDatePicker}>
                <ItemView>
                  <RNDateTimePicker mode="time" value={dateTime} display="spinner" onChange={(_, value: Date) => setDateTime(value)} textColor="black" />
                </ItemView>
              </Collapsible>
            )}

            <ItemView>
              <InputItem>
                <ItemTitle>모임 장소</ItemTitle>
                <ItemTextInput
                  value={place}
                  placeholder="직접 입력"
                  placeholderTextColor="#B0B0B0"
                  maxLength={16}
                  onChangeText={(text: string) => setPlace(text)}
                  onEndEditing={() => setPlace((prev) => prev.trim())}
                  returnKeyType="done"
                  returnKeyLabel="done"
                  textAlign="right"
                  includeFontPadding={false}
                />
              </InputItem>
            </ItemView>
            <MemoView>
              <ItemTitleView>
                <ItemTitle>메모</ItemTitle>
                <InfoText>{`${memo.length} / ${memoMax} 자`}</InfoText>
              </ItemTitleView>
              <MemoInput
                placeholder="스케줄에 대한 메모를 남겨주세요."
                placeholderTextColor="#B0B0B0"
                value={memo}
                textAlignVertical="top"
                textAlign="left"
                multiline={true}
                maxLength={memoMax}
                onChangeText={(value: string) => setMemo(value)}
                onEndEditing={() => setMemo((prev: string) => prev.trim())}
                includeFontPadding={false}
              />
            </MemoView>
          </Content>
        </MainView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default ClubScheduleAdd;
