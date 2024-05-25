'use client';

import { PostList, PostType } from '@/lib/types/groupTypes/tabs/postTypes';
import { useEffect, useState } from 'react';
import { Post } from './Post';
import { URLs } from '@/configs/urls';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { observer } from 'mobx-react';
import { useStores } from '@/lib/store/useStore';
import { usePathname } from 'next/navigation';
import { NothingSeeHereYetPlaceholder } from '../NothingSeeHereYetPlaceholder';
import classes from './PostsFeed.module.css';
import { PostInputZone } from './PostInputZone';

export const PostsFeed = observer(() => {
  const [posts, setPosts] = useState<PostList>([]);
  const {
    groupStore: { getFullGroupInfo },
    userInGroupStore: { getRole },
  } = useStores();
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlNameChecker = getFullGroupInfo().urlName;
        const urlName = urlNameChecker ? urlNameChecker : pathname[2];

        const res = await axios.get(URLs.getAllPosts + urlName, {
          withCredentials: true,
        });
        setPosts(res.data);
      } catch (err) {
        notifications.show({
          color: 'red',
          message: "Couldn't get a posts!",
        });
      }
    };

    fetchData();
  }, []);

  if (posts.length === 0) {
    return (
      <>
        <div className={classes.inputZone}>
          {(getRole() === 'OWNER' || 'EDITOR') && <PostInputZone />}
        </div>

        <div className={classes.posts}>
          <NothingSeeHereYetPlaceholder />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={classes.inputZone}>
          {(getRole() === 'OWNER' || 'EDITOR') && <PostInputZone />}
        </div>

        <div className={classes.posts}>
          {posts.map((post: PostType) => {
            return (
              <>
                <div key={post._id}>
                  <Post
                    label={post.label}
                    content={post.content}
                    createdAt={post.createdAt}
                    updatedAt={post.updatedAt}
                  />
                </div>
              </>
            );
          })}
        </div>
      </>
    );
  }
});
