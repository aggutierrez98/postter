import { FieldValue } from "firebase/firestore";

export interface TrendingResultInterface {
  description: string;
  heading: string;
  img: string;
  tags: string[];
}
export interface FollowResultInterface {
  tag: string;
  userImg: string;
  username: string;
}

export interface PostwittInterface {
  id?: string;
  userId: string;
  userName: string;
  userImg?: string;
  text: string;
  tag: string;
  image?: string;
  commented?: string;
  hashtags?: string[];
  // timestamp: () => FieldValue;
  timestamp: any;
  repostedBy?: string;
  idOriginal?: string;
  timePostedOriginal?: () => FieldValue;
}

export interface LikeInterface {
  userName: string;
  userId: string;
  timestamp: () => FieldValue;
  postwittId: string;
}

// export interface RepostInterface {
//   idPostwitt: string;
//   timestamp: () => FieldValue;
//   userId: string;
// }

export interface UserInterface {
  uid: string;
  name: string;
  email: string;
  tag: string;
  image?: string;
  bannerImg?: string;
  biography?: Date;
  location?: string;
  birthday?: string;
  pinned?: string;
  bookmarks?: string[];
  following?: string[];
  followers?: string[];
}

export interface HashtagInterface {
  hashtag: string;
  postwitts: number;
}
