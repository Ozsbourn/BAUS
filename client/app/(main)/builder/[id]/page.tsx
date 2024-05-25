'use client';

import { useState } from 'react';
import { observer } from 'mobx-react';
import { Button, Checkbox, Group, Modal, Stack, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Data } from '@measured/puck';
import { PageBuilder } from '@/components/PageBuilder/PageBuilder';
import { saveLandingPage } from '@/lib/pageBuilder/util';
import { useStores } from '@/lib/store/useStore';
import { initialData } from '@/configs/puck.initialData.config';

export interface ISaveForm {
  name: string;
  data: Data;
  isDraft: boolean;
  // userId: string;
  groupId: string;
}

const BuilderPage = observer(() => {
  const [opened, { open, close }] = useDisclosure(false);
  const {
    // userStore: { getUserInfo },
    groupStore: { getFullGroupInfo },
  } = useStores();
  const [saveForm, setSaveForm] = useState<ISaveForm>({
    name: '',
    data: { content: [], root: {} },
    isDraft: false,
    // userId: '',
    groupId: '',
  });
  // const initialData = {
  //   content: [],
  //   root: {},
  // };

  const _save = (data: Data) => {
    // const { userId, ...other } = getUserInfo();
    const { groupId, ...other } = getFullGroupInfo();
    setSaveForm({ ...saveForm, groupId: groupId, data: data });
    open();
  };
  const serveSaveForm = () => {
    saveLandingPage(saveForm);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Save landing page" centered>
        <Stack>
          <TextInput
            required
            label="Name"
            placeholder="Type a name for your landing page"
            value={saveForm.name}
            onChange={(event) => setSaveForm({ ...saveForm, name: event.currentTarget.value })}
            radius="md"
            maxLength={100}
          />

          <Checkbox
            label="Is it a draft?"
            checked={saveForm.isDraft}
            onChange={(event) => setSaveForm({ ...saveForm, isDraft: event.currentTarget.checked })}
          />

          <Group justify="space-between" mt="xl">
            <Button type="submit" radius="md" size="md" onClick={() => serveSaveForm()}>
              Save
            </Button>
            <Button type="submit" radius="md" size="md" onClick={close}>
              Cancel
            </Button>
          </Group>
        </Stack>
      </Modal>

      <div>
        <PageBuilder save={_save} initialData={initialData} />
      </div>
    </>
  );
});

export default BuilderPage;
