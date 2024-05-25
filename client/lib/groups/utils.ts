import axios, { AxiosError, AxiosResponse } from 'axios';
import { GroupInfo } from '../types/groupTypes/groupInfo';
import { URLs } from '@/configs/urls';
import { notifications } from '@mantine/notifications';
import { InvitationInfo } from '../types/groupTypes/invites';
import { UserInGroupRequest } from '../types/groupTypes/permissionsTypes';
import { userInGroupStore } from '@/store/userInGroupStore';
import { RoleInGroup } from '../types/groupTypes/rolesInGroup';
import { IPost } from '../types/groupTypes/postTypes';

export type ExtendedGroupInfo = GroupInfo & { userId: string };

export const createNewGroup = async (data: ExtendedGroupInfo) => {
  axios
    .post(
      URLs.createGroup,
      {
        ...data,
      },
      {
        withCredentials: true,
      }
    )
    .then((res: AxiosResponse) => {
      notifications.show({
        title: 'Succesfully created!',
        message: res.data.message,
      });
    })
    .catch((err: AxiosError) => {
      if (err.response) {
        notifications.show({
          color: 'red',
          title: 'Error',
          message: err.response.data.message,
        });
      }
    });
};

export const deleteCurrGroup = async (groupId: string) => {
  axios
    .delete(URLs.deleteGroup + groupId, {
      withCredentials: true,
    })
    .then((res: AxiosResponse) => {
      notifications.show({
        title: 'Succesfully deleted!',
        message: res.data.message,
      });
    })
    .catch((err: AxiosError) => {
      if (err.response) {
        notifications.show({
          color: 'red',
          title: 'Error',
          message: err.response.data.message,
        });
      }
    });
};

export const getGroup = async (groupId: string) => {
  const response = await axios.get(URLs.getGroup + groupId, {
    withCredentials: true,
  });

  return response.data;
};

export const createInvite = async (inviteInfo: InvitationInfo) => {
  axios
    .post(URLs.createInvitation, inviteInfo, {
      withCredentials: true,
    })
    .then((res: AxiosResponse) => {
      notifications.show({
        title: 'Succesfully invited!',
        message: res.data.message,
      });
    })
    .catch((err: AxiosError) => {
      if (err.response) {
        notifications.show({
          color: 'red',
          title: 'Error',
          message: err.response.data.message,
        });
      }
    });
};

export const getPermissions = async (data: UserInGroupRequest) => {
  axios
    .post(URLs.getUserPermissions, data, {
      withCredentials: true,
    })
    .then((res: AxiosResponse) => {
      userInGroupStore.setRole(res.data.userRole as RoleInGroup);
    })
    .catch((err: AxiosError) => {});
};

export const createPost = async (data: IPost) => {
  axios
    .post(URLs.savePost, data, {
      withCredentials: true,
    })
    .then((res: AxiosResponse) => {
      notifications.show({
        title: 'Post succesfully published!',
        message: 'Your post was succesfully published',
      });
    })
    .catch((err: AxiosError) => {
      if (err.response) {
        notifications.show({
          color: 'red',
          title: 'Error',
          message: err.response.data.message,
        });
      }
    });
};
