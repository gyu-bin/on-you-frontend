import { apiAxios } from "app/connection";
import { API_BASE_URL } from "app/properties";

export interface BaseResponse {
  resultCode?: string;
  transactionTime?: string;
  status?: number;
}

export interface ErrorResponse {
  error?: string;
  message?: string;
  transactionTime?: string;
  status?: number;
  code: string;
}

export interface Category {
  id: number;
  description: string;
  name: string;
  thumbnail: string | null;
  order: number | null;
}

export interface Club {
  id: number;
  name?: string;
  clubShortDesc?: string | null;
  clubLongDesc?: string | null;
  announcement?: string | null;
  organizationName?: string;
  isApprovedRequired?: string;
  members?: Member[];
  maxNumber?: number;
  recruitNumber?: number;
  thumbnail?: string | null;
  recruitStatus?: "OPEN" | "CLOSE" | null;
  creatorName?: string;
  created?: string;
  categories?: Category[];
  contactPhone?: string | null;
  customCursor?: string;
  feedNumber?: number;

  // For MyClub
  applyStatus?: string;

  // For Profile
  role?: string;
}

export interface Notification {
  actionClubName: string;
  actionClubId: number;
  actionFeedId: number;
  actionId: number;
  actionerId?: number | null;
  actionerName?: string | null;
  actioneeId?: number | null;
  actioneeName?: string | null;
  actionType?: string;
  message?: string | null;
  created?: string;
  read?: boolean;
  done?: boolean;
  processDone?: boolean; // lagacy
}

export interface Member {
  id: number;
  organizationName: string;
  thumbnail: string;
  name: string;
  birthday: string;
  applyStatus: string;
  sex: string;
  email: string;
  created: string;
  role: string | null;
  phoneNumber: string | null;
}

export interface Schedule {
  id?: number;
  name?: string;
  content?: string;
  members?: Member[];
  location?: string;
  startDate?: string;
  endDate?: string | null;
}

export interface RefinedSchedule extends Schedule {
  year?: string;
  month?: string;
  day?: string;
  dayOfWeek?: string;
  hour?: string;
  minute?: string;
  ampm?: string;
  participation?: boolean;
  isEnd?: boolean;
}

export interface User {
  applyStatus: string;
  birthday: string | null;
  created: string;
  email: string;
  id: number;
  name: string;
  organizationName: string;
  role: string;
  sex: string | null;
  thumbnail: string | null;
  phoneNumber: string | null;
  interests: [];
}

export interface UserProfile {
  name: string;
  about: string;
  birthday: string;
  isBirthdayPublic: "Y" | "N";
  clubs: Club[];
  isClubPublic: "Y" | "N";
  contact: string;
  isContactPublic: "Y" | "N";
  email: string;
  isEmailPublic: "Y" | "N";
  isFeedPublic: "Y" | "N";
  thumbnail: string | null;
  backgroundImage: string | null;
  feedNumber: number;
}

export interface BlockUser {
  userId: number;
  userName: string;
  thumbnail: string | null;
  organizationName: string;
}

export interface LikeUser {
  thumbnail: string;
  userName: string;
  likeDate: string;
  userId: number;
}

export interface Feed {
  id: number;
  clubId: number;
  clubName: string;
  userId: number;
  userName: string;
  thumbnail: string;
  content: string;
  imageUrls: string[] | null;
  hashtags: string | null;
  likeYn: boolean;
  likesCount: number;
  commentCount: number;
  created: string;
  customCursor?: string;
  likeUserList?: LikeUser[];
}

export interface FeedComment {
  commentId: number;
  userId: number;
  userName: string;
  content: string;
  created: string;
  thumbnail: string;
  likeCount: number;
  likeYn: boolean;
  replies: FeedComment[];
  likeUserResponseList: LikeUser[];
}

export interface Reply {
  commentId: number;
  userId: number;
  userName: string;
  content: string;
  created: string;
  updated: string;
  thumbnail: string;
}

export interface Report {
  userId: number;
  reason: string;
}
export interface ClubRole {
  clubId: number;
  userId: number;
  role?: "MASTER" | "MANAGER" | "MEMBER" | "PENDING";
  applyStatus?: "APPLIED" | "APPROVED";
}

export interface GuestComment {
  id: number;
  content: string;
  created: string;
  thumbnail: string;
  userId: number;
  userName: string;
}

export interface LoginResponse extends BaseResponse {
  token: string;
}

export interface CategoryResponse extends BaseResponse {
  data: Category[];
}

export interface ClubResponse extends BaseResponse {
  data: Club;
}

export interface MyClubsResponse extends BaseResponse {
  data: Club[];
}

export interface ClubCreationResponse extends BaseResponse {
  data: Club;
}

export interface ClubsResponse extends BaseResponse {
  hasData: boolean;
  responses: {
    content: Club[];
    size: number;
  };
}

export interface NotificationsResponse extends BaseResponse {
  data: Notification[];
}

export interface FeedResponse extends BaseResponse {
  data: Feed;
}

export interface FeedsResponse extends BaseResponse {
  hasData: boolean;
  responses: {
    content: Feed[];
    size: number;
  };
}

export interface FeedCommentsResponse extends BaseResponse {
  data: FeedComment[];
}

export interface FeedsLikeReponse extends BaseResponse {
  data: Feed[];
}
export interface UserInfoResponse extends BaseResponse {
  data: User;
}

export interface ProfileResponse extends BaseResponse {
  data: UserProfile;
}

export interface BlockUserListResponse extends BaseResponse {
  data: BlockUser[];
}
export interface ReplyReponse extends BaseResponse {
  data: Reply[];
}
export interface ReportResponse extends BaseResponse {
  data: Report[];
}
export interface ClubsParams {
  categoryId?: number | null;
  minMember?: number | null;
  maxMember?: number | null;
  showRecruiting?: number;
  sortType?: string;
  orderBy?: string;
  showMy?: number;
  keyword?: string;
}

export interface ReplyParams {
  id: number;
  token: string | null;
}
export interface ClubSchedulesResponse extends BaseResponse {
  data: Schedule[];
}

export interface ClubRoleResponse extends BaseResponse {
  data: ClubRole;
}

export interface DuplicateCheckResponse extends BaseResponse {
  data: {
    isDuplicated: "Y" | "N";
  };
}

export interface GuestCommentResponse extends BaseResponse {
  data: GuestComment[];
}

export interface SendCheckEmailResponse extends BaseResponse {
  data: string;
}

export interface ValidCheckEmailResponse extends BaseResponse {
  message: string;
}

export interface PushAlarmResponse extends BaseResponse {
  data: {
    clubPushAlarm: string;
    userPushAlarm: string;
  };
}

export interface MetaInfoResponse extends BaseResponse {
  data: {
    latestVersion: string;
    updateRequired: string;
  };
}

export interface ClubCreationData {
  category1Id: number;
  category2Id?: number | null;
  isApproveRequired: string;
  clubShortDesc: string;
  clubLongDesc: string | null;
  clubName: string;
  clubMaxMember: number;
  contactPhone: string;
  organizationName: string;
}

export interface ImageType {
  uri: string;
  type: string;
  name?: string;
}

export interface ClubCreationRequest {
  image?: ImageType | null;
  data: ClubCreationData;
}

export interface ClubDeletionRequest {
  clubId: number;
}

export interface FeedCreationRequest {
  image?: ImageType[] | null;
  data: {
    clubId?: number;
    content?: string;
  };
}

export interface FeedUpdateRequest {
  image?: ImageType[] | null;
  data: {
    id: number | undefined;
    // access: string
    content: string;
  };
}

export interface FeedReportRequest {
  feedId: number;
  data: {
    reason: string;
  };
}

export interface ClubUpdateRequest {
  image?: ImageType;
  data?: {
    clubName?: string;
    clubMaxMember?: number;
    isApproveRequired?: string;
    clubShortDesc?: string;
    clubLongDesc?: string | null;
    contactPhone?: string | null;
    recruitStatus?: string | null;
    category1Id?: number;
    category2Id?: number;
  };
  clubId: number;
}

export interface ClubWithdrawRequest {
  clubId: number;
}

export interface ClubScheduleCreationRequest {
  clubId: number;
  content: string;
  location: string;
  name: string;
  startDate: string;
  endDate: string;
}

export interface ClubScheduleUpdateRequest {
  clubId: number;
  scheduleId: number;
  body: {
    content: string;
    location: string;
    name: string;
    startDate: string;
    endDate: string;
  };
}

export interface ClubScheduleDeletionRequest {
  clubId: number;
  scheduleId: number;
}

export interface ClubScheduleJoinOrCancelRequest {
  clubId: number;
  scheduleId: number;
}

export interface ClubApplyRequest {
  clubId: number;
  message: string;
}

export interface ClubApproveRequest {
  clubId: number;
  actionId: number;
  userId: number;
}

export interface ClubRejectRequest {
  clubId: number;
  actionId: number;
  userId: number;
  message?: string;
}

export interface ChangeRoleRequest {
  clubId: number;
  data: ChangeRole[];
  token: string | null;
}

export interface ChangeRole {
  role: string | null;
  userId: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface EmailCheckRequest {
  email: string;
}

export interface EmailValidRequest {
  email: string;
  checkString: string;
}

export interface DuplicateClubNameCheckRequest {
  clubName: string;
}

export interface GuestCommentRequest {
  clubId: number;
  content: string;
}

export interface GuestCommentDeletionRequest {
  guestCommentId: number;
}

export interface FindEmailRequest {
  phoneNumber?: string;
  username?: string;
}

export interface FindPasswordRequest {
  birthday?: string;
  email?: string;
  phoneNumber?: string;
  username?: string;
}

export interface UserUpdateRequest {
  image?: ImageType | null;
  data?: {
    birthday?: string | null;
    name?: string;
    organizationName?: string;
    sex?: string | null;
    phoneNumber?: string | null;
  };
}

export interface ProfileUpdateRequest {
  thumbnail?: ImageType | null;
  backgroundImage?: ImageType | null;
  data?: {
    about?: string | null;
    isBirthdayPublic?: "Y" | "N" | null;
    isClubPublic?: "Y" | "N" | null;
    isContactPublic?: "Y" | "N" | null;
    isEmailPublic?: "Y" | "N" | null;
    isFeedPublic?: "Y" | "N" | null;
  };
}

export interface SignUpRequest {
  birthday: string | null;
  email: string;
  name: string;
  password: string;
  organizationName: string;
  sex: string | null;
  phoneNumber: string | null;
}

export interface PasswordChangeRequest {
  password: string;
}

export interface UserBlockRequest {
  userId: number;
}

export interface UserPushAlarmRequest {
  alarmType: "USER" | "CLUB";
  isOnOff: "Y" | "N";
}

export interface TargetTokenUpdateRequest {
  targetToken: string | null;
}

export interface SuggestionSubmitRequest {
  content: string;
}

export interface MetaInfoRequest {
  currentVersion: string;
  deviceInfo: string;
}

export interface FeedLikeRequest {
  feedId: number;
}

export interface FeedCommentCreationRequest {
  feedId: number;
  content: string;
  parentId?: number;
}

export interface FeedCommentDefaultRequest {
  commentId: number;
}

export interface FeedDeletionRequest {
  feedId: number;
}

export interface ReadActionRequest {
  actionId: number;
}

// Categories
const getCategories = ({ queryKey }: any) => apiAxios.get<string, CategoryResponse>(`/api/categories`);

// Club
const getClub = ({ queryKey }: any) => {
  const [_key, clubId]: [string, number] = queryKey;
  return apiAxios.get<string, ClubResponse>(`/api/clubs/${clubId}`);
};
const getClubs = ({ queryKey, pageParam }: any) => {
  const [_key, clubsParams]: [string, ClubsParams] = queryKey;
  let params = "";
  if (clubsParams.keyword) {
    params += `keyword=${clubsParams.keyword}`;
  } else {
    params += `categoryId=${clubsParams.categoryId ?? 0}&showMy=${clubsParams.showMy}&showRecruitingOnly=${clubsParams.showRecruiting}`;
    params += clubsParams.minMember !== null ? `&min=${clubsParams.minMember}` : "";
    params += clubsParams.maxMember !== null ? `&max=${clubsParams.maxMember}` : "";
    params += `&sort=${clubsParams.sortType}&orderBy=${clubsParams.orderBy}`;
  }
  params += pageParam ? `&cursor=${pageParam}` : "";

  return apiAxios.get<string, ClubsResponse>(`/api/clubs?${params}`);
};
const getClubRole = ({ queryKey }: any) => {
  const [_key, clubId]: [string, number] = queryKey;
  return apiAxios.get<string, ClubRoleResponse>(`/api/clubs/${clubId}/role`);
};
const withdrawClub = (req: ClubWithdrawRequest) => apiAxios.post<string, BaseResponse>(`/api/clubs/${req.clubId}/withdraw`);
const applyClub = (req: ClubApplyRequest) => apiAxios.post<string, BaseResponse>(`/api/clubs/apply`, req);
const getClubSchedules = ({ queryKey }: any) => {
  const [_key, clubId]: [string, number] = queryKey;
  return apiAxios.get<string, ClubSchedulesResponse>(`/api/clubs/${clubId}/schedules`);
};
const getClubFeeds = ({ queryKey, pageParam }: any) => {
  const [_key, clubId]: [string, number] = queryKey;
  const params = pageParam ? `cursor=${pageParam}` : "";
  return apiAxios.get<string, FeedsResponse>(`/api/clubs/${clubId}/feeds?${params}`);
};
const createClub = (req: ClubCreationRequest) => {
  const body = new FormData();
  if (req.image !== null) body.append("file", req.image);
  body.append("clubCreateRequest", {
    string: JSON.stringify(req.data),
    type: "application/json",
  });

  return apiAxios.post<string, ClubCreationResponse>(`/api/clubs`, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
const updateClub = (req: ClubUpdateRequest) => {
  const body = new FormData();
  if (req.image) body.append("file", req.image);
  if (req.data) {
    body.append("clubUpdateRequest", {
      string: JSON.stringify(req.data),
      type: "application/json",
    });
  }
  return apiAxios.put<string, ClubResponse>(`api/clubs/${req.clubId}`, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
const deleteClub = (req: ClubDeletionRequest) => apiAxios.delete<string, BaseResponse>(`/api/clubs/${req.clubId}`);
const duplicateClubNameCheck = (req: DuplicateClubNameCheckRequest) => apiAxios.post<string, DuplicateCheckResponse>(`/api/clubs/duplicateCheck`, req);

// Guest Comment
const getGuestComment = ({ queryKey }: any) => {
  const [_key, clubId]: [string, number] = queryKey;
  return apiAxios.get<string, GuestCommentResponse>(`/api/clubs/${clubId}/guestComment`);
};
const createGuestComment = (req: GuestCommentRequest) => apiAxios.post<string, BaseResponse>(`/api/clubs/${req.clubId}/guestComment`, req);

const deleteGuestComment = (req: GuestCommentDeletionRequest) => apiAxios.delete<string, BaseResponse>(`/api/clubs/guestComment/${req.guestCommentId}`);

// Club Management
const approveToClubJoin = (req: ClubApproveRequest) => apiAxios.post<string, BaseResponse>(`/api/clubs/approve`, req);
const rejectToClubJoin = (req: ClubRejectRequest) => apiAxios.post<string, BaseResponse>(`/api/clubs/reject`, req);

const changeRole = (req: ChangeRoleRequest) => apiAxios.post<string, BaseResponse>(`/api/clubs/${req.clubId}/changeRole`, req.data);

// Club Schedule
const createClubSchedule = (req: ClubScheduleCreationRequest) => apiAxios.post<string, BaseResponse>(`/api/clubs/schedules`, req);
const updateClubSchedule = (req: ClubScheduleUpdateRequest) => apiAxios.put<string, BaseResponse>(`api/clubs/${req.clubId}/schedules/${req.scheduleId}`, req.body);
const deleteClubSchedule = (req: ClubScheduleDeletionRequest) => apiAxios.delete<string, BaseResponse>(`api/clubs/${req.clubId}/schedules/${req.scheduleId}`);
const joinOrCancelClubSchedule = (req: ClubScheduleJoinOrCancelRequest) => apiAxios.post<string, BaseResponse>(`/api/clubs/${req.clubId}/schedules/${req.scheduleId}/joinOrCancel`);

// Feed
const getFeed = ({ queryKey }: any) => {
  const [_key, feedId]: [string, number] = queryKey;
  return apiAxios.get<string, FeedResponse>(`/api/feeds/${feedId}`);
};
const getFeeds = ({ pageParam }: any) => {
  const params = pageParam ? `cursor=${pageParam}` : "";
  return apiAxios.get<string, FeedsResponse>(`/api/feeds?${params}`);
};
const createFeed = (req: FeedCreationRequest) => {
  const body = new FormData();

  if (req.image) {
    for (let i = 0; i < req.image?.length; i++) body.append("file", req.image[i]);
  }

  body.append("feedCreateRequest", {
    string: JSON.stringify(req.data),
    type: "application/json",
  });

  return apiAxios.post<string, BaseResponse>(`/api/feeds`, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
const updateFeed = (req: FeedUpdateRequest) => apiAxios.put<string, BaseResponse>(`/api/feeds/${req.data.id}`, req.data);

// Feed Option
const reportFeed = (req: FeedReportRequest) => apiAxios.post<string, BaseResponse>(`/api/feeds/${req.feedId}/report`, req.data);
const likeFeed = (req: FeedLikeRequest) => apiAxios.post<string, BaseResponse>(`/api/feeds/${req.feedId}/likes`);
const deleteFeed = (req: FeedDeletionRequest) => apiAxios.delete<string, BaseResponse>(`/api/feeds/${req.feedId}`);

// Feed Comment
const getFeedComments = ({ queryKey }: any) => {
  const [_key, feedId]: [string, number] = queryKey;
  return apiAxios.get<string, FeedCommentsResponse>(`/api/feeds/${feedId}/comments`);
};
const createFeedComment = (req: FeedCommentCreationRequest) => apiAxios.post<string, BaseResponse>(`/api/feeds/${req.feedId}/comment`, req);
const deleteFeedComment = (req: FeedCommentDefaultRequest) => apiAxios.delete<string, BaseResponse>(`/api/comments/${req.commentId}`);
const likeFeedComment = (req: FeedCommentDefaultRequest) => apiAxios.post<string, BaseResponse>(`/api/comments/${req.commentId}/likes`);

// Account Info
const getUserInfo = ({ queryKey }: any) => {
  const [_key]: [string, string] = queryKey;
  return apiAxios.get<string, UserInfoResponse>(`/api/user`);
};
const updateUserInfo = (req: UserUpdateRequest) => {
  const body = new FormData();
  if (req.image) body.append("file", req.image);
  if (req.data) {
    body.append("userUpdateRequest", {
      string: JSON.stringify(req.data),
      type: "application/json",
    });
  }
  return apiAxios.put<string, BaseResponse>(`/api/user`, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Profile
const getMyProfile = ({ queryKey }: any) => apiAxios.get<string, ProfileResponse>(`/api/user/myProfile`);
const updateMyProfile = (req: ProfileUpdateRequest) => {
  const body = new FormData();
  if (req.thumbnail) body.append("thumbnail", req.thumbnail);
  if (req.backgroundImage) body.append("backgroundImage", req.backgroundImage);
  if (req.data) {
    body.append("updateMyProfileRequest", {
      string: JSON.stringify(req.data),
      type: "application/json",
    });
  }
  return apiAxios.put<string, ProfileResponse>(`/api/user/myProfile`, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const getMyFeeds = ({ queryKey, pageParam }: any) => {
  const [_key]: [string, number] = queryKey;
  const params = pageParam ? `cursor=${pageParam}` : "";
  return apiAxios.get<string, FeedsResponse>(`/api/feeds/my?${params}`);
};

const getProfile = ({ queryKey }: any) => {
  const [_key, userId]: [string, number] = queryKey;
  return apiAxios.get<string, ProfileResponse>(`/api/user/${userId}/profile`);
};

const getUserFeeds = ({ queryKey, pageParam }: any) => {
  const [_key, userId]: [string, number] = queryKey;
  const params = pageParam ? `cursor=${pageParam}` : "";
  return apiAxios.get<string, FeedsResponse>(`/api/users/${userId}/feeds?${params}`);
};

const changePassword = (req: PasswordChangeRequest) => apiAxios.post<string, BaseResponse>(`/api/user/changePassword`, req);
// User Block
const blockUser = (req: UserBlockRequest) => apiAxios.post<string, BaseResponse>(`/api/user/block`, req);
const getBlockUserList = ({ queryKey }: any) => apiAxios.get<string, BlockUserListResponse>(`/api/user/blockUserList`);

// Account Setting
const getPushAlarm = ({ queryKey }: any) => apiAxios.get<string, PushAlarmResponse>(`/api/user/pushAlarm`);
const setPushAlarm = (req: UserPushAlarmRequest) => apiAxios.put<string, BaseResponse>(`/api/user/pushAlarm`, req);
const withdrawAccount = () => apiAxios.post<string, BaseResponse>(`/api/user/withdraw`);
const getMyClubs = ({ queryKey }: any) => apiAxios.get<string, MyClubsResponse>(`/api/clubs/my`);
const submitSuggestion = (req: SuggestionSubmitRequest) => apiAxios.post<string, BaseResponse>(`/api/user/suggestion`, req);
const metaInfo = (req: MetaInfoRequest) => apiAxios.post<string, MetaInfoResponse>(`/api/user/metaInfo`, req);

// Notification
const getClubNotifications = ({ queryKey }: any) => {
  const [_key, clubId]: [string, number] = queryKey;
  return apiAxios.get<string, NotificationsResponse>(`/api/notifications/club/${clubId}`);
};
const getUserNotifications = () => apiAxios.get<string, NotificationsResponse>(`/api/notifications/user`);
const readAction = (req: ReadActionRequest) => apiAxios.post<string, BaseResponse>(`/api/notifications/${req.actionId}/readAction`);

// FCM
const updateTargetToken = (req: TargetTokenUpdateRequest) => apiAxios.post<string, BaseResponse>(`/api/user/updateTargetToken`, req);

// Login
const login = async (req: LoginRequest) => {
  const res = await fetch(`${API_BASE_URL}/api/user/login`, {
    method: "POST",
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify(req),
  });
  return { status: res.status, ...(await res.json()) };
};

const duplicateEmailCheck = async (req: EmailCheckRequest) => {
  const res = await fetch(`${API_BASE_URL}/api/user/duplicateEmailCheck`, {
    method: "POST",
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify(req),
  });
  return { status: res.status, ...(await res.json()) };
};

const sendCheckEmail = async (req: EmailCheckRequest) => {
  const res = await fetch(`${API_BASE_URL}/api/mail/sendCheckEmail`, {
    method: "POST",
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify(req),
  });
  return { status: res.status, ...(await res.json()) };
};

const validCheckEmail = async (req: EmailValidRequest) => {
  const res = await fetch(`${API_BASE_URL}/api/mail/validCheck`, {
    method: "POST",
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify(req),
  });
  return { status: res.status, ...(await res.json()) };
};

// Sign Up
const registerUserInfo = async (req: SignUpRequest) => {
  const res = await fetch(`${API_BASE_URL}/api/user/signup`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(req),
  });
  return { status: res.status, ...(await res.json()) };
};

const FindUserId = async (req: FindEmailRequest) => {
  const res = await fetch(`${API_BASE_URL}/api/user/findId`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(req),
  });
  return { status: res.status, ...(await res.json()) };
};

const FindUserPw = async (req: FindPasswordRequest) => {
  const res = await fetch(`${API_BASE_URL}/api/mail/findPw`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(req),
  });
  return { status: res.status, ...(await res.json()) };
};

export const ClubApi = {
  getCategories,
  getClub,
  getClubs,
  getClubFeeds,
  createClub,
  deleteClub,
  updateClub,
  withdrawClub,
  changeRole,
  getClubSchedules,
  createClubSchedule,
  updateClubSchedule,
  deleteClubSchedule,
  joinOrCancelClubSchedule,
  getClubRole,
  applyClub,
  getClubNotifications,
  approveToClubJoin,
  rejectToClubJoin,
  duplicateClubNameCheck,
  createGuestComment,
  getGuestComment,
  deleteGuestComment,
};

export const UserApi = {
  getCategories,
  getUserInfo,
  registerUserInfo,
  updateUserInfo,
  getMyClubs,
  FindUserId,
  FindUserPw,
  changePassword,
  withdrawAccount,
  blockUser,
  getBlockUserList,
  getPushAlarm,
  setPushAlarm,
  updateTargetToken,
  submitSuggestion,
  getUserNotifications,
  metaInfo,
  getMyProfile,
  updateMyProfile,
  getMyFeeds,
  getProfile,
  getUserFeeds,
};

export const FeedApi = {
  getFeed,
  getFeeds,
  getFeedComments,
  createFeedComment,
  deleteFeedComment,
  likeFeedComment,
  createFeed,
  deleteFeed,
  reportFeed,
  updateFeed,
  likeFeed,
};

export const CommonApi = { login, duplicateEmailCheck, sendCheckEmail, validCheckEmail, readAction };
