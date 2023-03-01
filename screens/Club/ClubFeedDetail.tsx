import React, { useCallback, useLayoutEffect, useState } from "react";
import { Alert, DeviceEventEmitter, FlatList, StatusBar, useWindowDimensions, View } from "react-native";
import { useModalize } from "react-native-modalize";
import { useToast } from "react-native-toast-notifications";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import { BaseResponse, ErrorResponse, Feed, FeedApi, FeedDeletionRequest, FeedLikeRequest, FeedReportRequest, UserApi, UserBlockRequest } from "../../api";
import CustomText from "../../components/CustomText";
import FeedDetail from "../../components/FeedDetail";
import { ClubFeedDetailScreenProps } from "../../Types/Club";
import FeedReportModal from "../Feed/FeedReportModal";
import FeedOptionModal from "../Feed/FeedOptionModal";
import { RootState } from "../../redux/store/reducers";
import { useAppDispatch } from "../../redux/store";
import clubSlice from "../../redux/slices/club";

const Container = styled.View``;
const HeaderTitleView = styled.View`
  justify-content: center;
  align-items: center;
`;
const HeaderClubName = styled(CustomText)`
  font-size: 14px;
  font-family: "NotoSansKR-Medium";
  color: #8e8e8e;
  line-height: 20px;
`;
const HeaderText = styled(CustomText)`
  font-size: 16px;
  font-family: "NotoSansKR-Medium";
  color: #2b2b2b;
  line-height: 20px;
`;

const ClubFeedDetail: React.FC<ClubFeedDetailScreenProps> = ({
  navigation: { setOptions, navigate },
  route: {
    params: { clubData, targetIndex },
  },
}) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const me = useSelector((state: RootState) => state.auth.user);
  const feeds = useSelector((state: RootState) => state.club.feeds);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { ref: myFeedOptionRef, open: openMyFeedOption, close: closeMyFeedOption } = useModalize();
  const { ref: otherFeedOptionRef, open: openOtherFeedOption, close: closeOtherFeedOption } = useModalize();
  const { ref: complainOptionRef, open: openComplainOption, close: closeComplainOption } = useModalize();
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const modalOptionButtonHeight = 45;
  const feedDetailHeaderHeight = 54;
  const feedDetailInfoHeight = 36;
  const feedDetailContentHeight = 40;
  const itemSeparatorGap = 30;
  const itemLength = SCREEN_WIDTH + feedDetailHeaderHeight + feedDetailInfoHeight + feedDetailContentHeight + itemSeparatorGap;
  const [selectFeedData, setSelectFeedData] = useState<Feed>();

  const complainMutation = useMutation<BaseResponse, ErrorResponse, FeedReportRequest>(FeedApi.reportFeed, {
    onSuccess: (res) => {
      toast.show(`신고 요청이 완료 되었습니다.`, { type: "success" });
      closeComplainOption();
    },
    onError: (error) => {
      console.log(`API ERROR | reportFeed ${error.code} ${error.status}`);
      toast.show(`${error.message ?? error.code}`, { type: "warning" });
    },
  });

  const deleteFeedMutation = useMutation<BaseResponse, ErrorResponse, FeedDeletionRequest>(FeedApi.deleteFeed, {
    onSuccess: (res) => {
      toast.show(`게시글이 삭제되었습니다.`, { type: "success" });
      DeviceEventEmitter.emit("ClubFeedRefetch");
      closeMyFeedOption();
    },
    onError: (error) => {
      console.log(`API ERROR | deleteFeed ${error.code} ${error.status}`);
      toast.show(`${error.message ?? error.code}`, { type: "warning" });
    },
  });

  const likeFeedMutation = useMutation<BaseResponse, ErrorResponse, FeedLikeRequest>(FeedApi.likeFeed);

  const blockUserMutation = useMutation<BaseResponse, ErrorResponse, UserBlockRequest>(UserApi.blockUser, {
    onSuccess: (res) => {
      toast.show(`사용자를 차단했습니다.`, { type: "success" });
      DeviceEventEmitter.emit("ClubFeedRefetch");
      closeOtherFeedOption();
    },
    onError: (error) => {
      console.log(`API ERROR | blockUser ${error.code} ${error.status}`);
      toast.show(`${error.message ?? error.code}`, { type: "warning" });
    },
  });

  const goToComplain = () => {
    closeOtherFeedOption();
    openComplainOption();
  };

  const goToFeedComments = (feedIndex: number, feedId: number) => {
    navigate("FeedStack", { screen: "FeedComments", feedIndex, feedId, clubId: clubData.id });
  };

  const goToUpdateFeed = () => {
    closeMyFeedOption();
    navigate("FeedStack", { screen: "ModifiyFeed", feedData: selectFeedData });
  };

  const openFeedOption = (feedData: Feed) => {
    setSelectFeedData(feedData);
    if (feedData?.userId === me?.id) openMyFeedOption();
    else openOtherFeedOption();
  };

  const deleteFeed = () => {
    if (selectFeedData === undefined || selectFeedData?.id === -1) {
      toast.show("게시글 정보가 잘못되었습니다.", {
        type: "warning",
      });
      return;
    }

    const requestData: FeedDeletionRequest = {
      feedId: selectFeedData.id,
    };

    Alert.alert(
      "게시물 삭제",
      "정말로 해당 게시물을 삭제하시겠습니까?",
      [
        {
          text: "아니요",
          style: "cancel",
        },
        {
          text: "네",
          onPress: () => {
            deleteFeedMutation.mutate(requestData);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const likeFeed = useCallback((feedIndex: number, feedId: number) => {
    const requestData: FeedLikeRequest = {
      feedId,
    };
    likeFeedMutation.mutate(requestData, {
      onSuccess: (res) => {
        dispatch(clubSlice.actions.likeToggle(feedIndex));
      },
      onError: (error) => {
        console.log(`API ERROR | likeFeed ${error.code} ${error.status}`);
        toast.show(`${error.message ?? error.code}`, { type: "warning" });
      },
    });
  }, []);

  const blockUser = () => {
    if (selectFeedData === undefined || selectFeedData?.id === -1) {
      toast.show("게시글 정보가 잘못되었습니다.", {
        type: "warning",
      });
      return;
    }

    const requestData: UserBlockRequest = {
      userId: selectFeedData.userId,
    };

    Alert.alert(
      "사용자 차단",
      "정말로 이 사용자를 차단하시겠습니까?",
      [
        {
          text: "아니요",
          style: "cancel",
        },
        {
          text: "네",
          onPress: () => {
            blockUserMutation.mutate(requestData);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const complainSubmit = () => {
    if (selectFeedData === undefined || selectFeedData?.id === -1) {
      toast.show("게시글 정보가 잘못되었습니다.", {
        type: "warning",
      });
      return;
    }
    const requestData: FeedReportRequest = {
      feedId: selectFeedData.id,
      reason: "SPAM",
    };
    complainMutation.mutate(requestData);
  };

  const loadMore = () => {
    console.log("ClubFeedDetail - Load more club feed!");
    DeviceEventEmitter.emit("ClubFeedLoadmore");
  };

  useLayoutEffect(() => {
    setOptions({
      headerTitle: () => (
        <HeaderTitleView>
          <HeaderClubName>{clubData.name}</HeaderClubName>
          <HeaderText>게시글</HeaderText>
        </HeaderTitleView>
      ),
    });
  }, []);

  const keyExtractor = useCallback((item: Feed, index: number) => String(index), []);
  const renderItem = useCallback(
    ({ item, index }: { item: Feed; index: number }) => (
      <FeedDetail
        key={`ClubFeed_${index}`}
        feedData={item}
        feedIndex={index}
        feedSize={SCREEN_WIDTH}
        headerHeight={feedDetailHeaderHeight}
        infoHeight={feedDetailInfoHeight}
        contentHeight={feedDetailContentHeight}
        openFeedOption={openFeedOption}
        goToFeedComments={goToFeedComments}
        likeFeed={likeFeed}
      />
    ),
    []
  );
  const ItemSeparatorComponent = useCallback(() => <View style={{ height: itemSeparatorGap }} />, []);
  const ListFooterComponent = useCallback(() => <View style={{ height: 100 }} />, []);
  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: itemLength,
      offset: itemLength * index,
      index,
    }),
    []
  );
  return (
    <Container>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      <FlatList
        // refreshing={refreshing}
        // onRefresh={onRefresh}
        onEndReached={loadMore}
        data={feeds}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        initialScrollIndex={targetIndex}
        removeClippedSubviews={true}
      />

      <FeedOptionModal
        modalRef={myFeedOptionRef}
        buttonHeight={modalOptionButtonHeight}
        isMyFeed={true}
        goToUpdateFeed={goToUpdateFeed}
        deleteFeed={deleteFeed}
        goToComplain={goToComplain}
        blockUser={blockUser}
      />
      <FeedOptionModal
        modalRef={otherFeedOptionRef}
        buttonHeight={modalOptionButtonHeight}
        isMyFeed={false}
        goToUpdateFeed={goToUpdateFeed}
        deleteFeed={deleteFeed}
        goToComplain={goToComplain}
        blockUser={blockUser}
      />
      <FeedReportModal modalRef={complainOptionRef} buttonHeight={modalOptionButtonHeight} complainSubmit={complainSubmit} />
    </Container>
  );
};

export default ClubFeedDetail;
