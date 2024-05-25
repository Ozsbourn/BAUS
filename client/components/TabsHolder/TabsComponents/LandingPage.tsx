'use client';

import { Render } from '@measured/puck';
import { config } from '@/configs/puck.config';
import { useEffect, useState } from 'react';
import { initialData } from '@/configs/puck.initialData.config';
import { URLs } from '@/configs/urls';
import { usePathname } from 'next/navigation';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { ClientUrl } from '@/configs/clientUrl';
import { observer } from 'mobx-react';
import { useStores } from '@/lib/store/useStore';

export const LandingPage = observer(() => {
  const [data, setData] = useState(initialData);
  const pathname = usePathname();
  const router = useRouter();
  const {
    userInGroupStore: { getRole },
  } = useStores();

  useEffect(() => {
    const urlName = pathname.split('/')[2]; // pathname here is /group/:urlName
    axios
      .get(URLs.getPage, {
        params: {
          urlName: urlName,
        },
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        setData(res.data.content);
      })
      .catch((err: AxiosError) => {
        setData(initialData);
      });
  }, []);

  return (
    <>
      {data !== initialData ? (
        <>
          <Render config={config} data={data} />
        </>
      ) : (
        <>
          {
            /* Get role of current user for this group, if designer or owner - then they can modify a landing page; TODO: REFACTOR THIS CODE */
            (getRole() === 'OWNER' || 'DESIGNER') && (
              <Button
                radius="md"
                mt="xs"
                size="md"
                variant="default"
                onClick={() => {
                  const urlName = pathname.split('/')[2];
                  router.push(ClientUrl.LandingPageBuilder + urlName);
                }}
              >
                Create a landing page
              </Button>
            )
          }
        </>
      )}
    </>
  );
});
