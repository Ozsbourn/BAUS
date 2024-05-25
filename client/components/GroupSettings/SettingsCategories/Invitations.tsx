'use client';

import { getExpiringTime } from '@/lib/groups/mappers';
import { createInvite } from '@/lib/groups/utils';
import { useStores } from '@/lib/store/useStore';
import { ExpiringDuration, InvitationInfo } from '@/lib/types/groupTypes/invites';
import { RoleInGroup } from '@/lib/types/groupTypes/rolesInGroup';
import { Button, Combobox, InputBase, TextInput, useCombobox } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';

const roleOptions: RoleInGroup[] = ['OWNER', 'ADMIN', 'EDITOR', 'DEVELOPER', 'DESIGNER', 'ANALYST'];
const expiringOptions: ExpiringDuration[] = [
  '30 Minutes',
  '1 Hour',
  '6 Hours',
  '12 Hours',
  '1 Day',
  '2 Days',
  '7 Days',
  'Never',
];

export const Invitations = () => {
  const [inviteInfo, setInviteInfo] = useState<InvitationInfo>({
    email: '',
    role: null,
    expired: '1 Hour',
    groupId: '',
  });
  const {
    groupStore: { getFullGroupInfo },
  } = useStores();

  /* roles */
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');

  const shouldFilterOptions = roleOptions.every((item) => item !== search);
  const filteredOptions = shouldFilterOptions
    ? roleOptions.filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()))
    : roleOptions;
  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  /* expiring date options */
  const expCombobox = useCombobox({
    onDropdownClose: () => expCombobox.resetSelectedOption(),
  });
  const [exp, setExp] = useState<string | null>(null);
  const expOptions = expiringOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  useEffect(() => {
    const { groupId } = getFullGroupInfo();
    if (!groupId) {
      notifications.show({
        title: 'Error',
        message:
          'Something went wrong! It seems like your session expired. Try to authorize again!',
      });
    }
    setInviteInfo({ ...inviteInfo, groupId: groupId });
  }, []);

  return (
    <>
      <TextInput
        required
        label="Email"
        placeholder="Type email for invite here"
        value={inviteInfo.email}
        onChange={(event) => setInviteInfo({ ...inviteInfo, email: event.currentTarget.value })}
        radius="md"
      />

      {/* User role */}
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
          setValue(val);
          setInviteInfo({ ...inviteInfo, role: val as RoleInGroup });
          setSearch(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            label="Choose role in group"
            rightSection={<Combobox.Chevron />}
            value={search}
            onChange={(event) => {
              combobox.openDropdown();
              combobox.updateSelectedOptionIndex();
              setSearch(event.currentTarget.value);
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => {
              combobox.closeDropdown();
              setSearch(value || '');
            }}
            placeholder="Search value"
            rightSectionPointerEvents="none"
            required
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

      {/* Expiring duration */}
      <Combobox
        store={expCombobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
          // setValue(val);
          // setInviteInfo({ ...inviteInfo, expired: val as RoleInGroup });
          setInviteInfo({ ...inviteInfo, expired: getExpiringTime(val as ExpiringDuration) });
          setExp(val);
          expCombobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            label="Choose time for expiring of invitation"
            rightSection={<Combobox.Chevron />}
            value={exp}
            onChange={(event) => {
              expCombobox.openDropdown();
              expCombobox.updateSelectedOptionIndex();
              setExp(event.currentTarget.value);
            }}
            onClick={() => expCombobox.openDropdown()}
            onFocus={() => expCombobox.openDropdown()}
            onBlur={() => {
              expCombobox.closeDropdown();
              // setSearch(value || '');
            }}
            placeholder="Choose time to expire"
            rightSectionPointerEvents="none"
            required
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{expOptions}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

      <Button variant="filled" mt={25} onClick={() => createInvite(inviteInfo)}>
        Invite
      </Button>
    </>
  );
};
