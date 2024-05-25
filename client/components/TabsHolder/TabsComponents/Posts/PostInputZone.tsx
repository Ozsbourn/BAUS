'use client';

import { Button, Flex, Textarea } from '@mantine/core';
import classes from './PostInputZone.module.css';
import { createPost } from '@/lib/groups/utils';
import { useState } from 'react';
import { IPost } from '@/lib/types/groupTypes/postTypes';
import { useStores } from '@/lib/store/useStore';

export const PostInputZone = () => {
  const [postInfo, setPostInfo] = useState<string | null>(null);
  const {
    groupStore: { getFullGroupInfo },
  } = useStores();

  const _savePost = () => {
    if (postInfo) {
      const post: IPost = { text: postInfo as string, groupId: getFullGroupInfo().groupId };
      createPost(post);
    }
  };

  return (
    <div>
      <Flex justify="center" align="center" gap={5}>
        <Textarea
          placeholder="Is there anything to tell to yours followers?"
          autosize
          minRows={1}
          onChange={(event) => setPostInfo(event.currentTarget.value)}
        />
        <Button onClick={() => _savePost()}>Publish</Button>
      </Flex>
    </div>
  );
};
