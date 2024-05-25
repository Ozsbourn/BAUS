import { userStore } from '@/store/userStore';
import { groupStore } from '@/store/groupStore';
import { flowgraphStore } from '@/store/flowGraphStore';
import { userInGroupStore } from '@/store/userInGroupStore';

export const rootStore = {
  userStore,
  groupStore,
  userInGroupStore,
  flowgraphStore,
};
