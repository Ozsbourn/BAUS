import { ISaveForm } from '@/app/(main)/builder/[id]/page';
import { URLs } from '@/configs/urls';
import { notifications } from '@mantine/notifications';
import axios, { AxiosError, AxiosResponse } from 'axios';

export const saveLandingPage = async (data: ISaveForm) => {
  axios
    .post(
      URLs.savePage,
      {
        ...data,
      },
      {
        withCredentials: true,
      }
    )
    .then((res: AxiosResponse) => {
      notifications.show({
        title: 'Succesfully saved!',
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
