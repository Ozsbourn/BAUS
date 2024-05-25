export type GroupInfo = {
  groupId: string;
  urlName: string;
  name: string;
  description: string;
  avatarUrl: string;
  bannerUrl: string;
  status: string;
};

export type GroupInfoWithTimestamps = {
  id: string;
  urlName: string;
  name: string;
  description: string;
  avatarUrl: string;
  bannerUrl: string;
  createdAt: string;
  updatedAt: string;
  status: string;
};
