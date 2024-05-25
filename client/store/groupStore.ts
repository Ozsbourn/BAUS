import { makeAutoObservable } from 'mobx';
import { GroupInfoWithTimestamps } from '@/lib/types/groupTypes/groupInfo';

export class GroupStore {
  isThereGroup: boolean;
  info?: GroupInfoWithTimestamps;

  constructor() {
    makeAutoObservable(this);
    this.isThereGroup = false;
    this.info = {} as GroupInfoWithTimestamps;
  }

  _fetchGroupData = (groupInfo: GroupInfoWithTimestamps) => {
    this.isThereGroup = true;
    this.info = {
      id: groupInfo.id, // groupInfo.groupId
      urlName: groupInfo.urlName,
      name: groupInfo.name,
      description: groupInfo.description,
      avatarUrl: groupInfo.avatarUrl,
      bannerUrl: groupInfo.bannerUrl,
      createdAt: groupInfo.createdAt,
      updatedAt: groupInfo.updatedAt,
      status: groupInfo.status,
    };
  };
  _clearUserData = () => {
    this.isThereGroup = false;
    this.info = {
      id: '',
      urlName: '',
      name: '',
      description: '',
      avatarUrl: '',
      bannerUrl: '',
      createdAt: '',
      updatedAt: '',
      status: '',
    };
  };

  getFullGroupInfo = () => {
    return {
      groupId: this.info!.id,
      urlName: this.info!.urlName,
      name: this.info!.name,
      description: this.info!.description,
      avatarUrl: this.info!.avatarUrl,
      bannerUrl: this.info!.bannerUrl,
      createdAt: this.info?.createdAt,
      updatedAt: this.info?.updatedAt,
      status: this.info!.status,
    };
  };
  setFullGroupInfo = (groupInfo: GroupInfoWithTimestamps) => {
    this._fetchGroupData(groupInfo);
  };

  getGroupStatus = () => {
    return this.isThereGroup;
  };
}

export const groupStore = new GroupStore();
