import { Invitations } from './SettingsCategories/Invitations';

export type RenderSettingsComponentResolver = 'INVITATION' | '';

export const renderComponentsResolve = (resolverState: string) => {
  switch (resolverState) {
    case 'INVITATION': {
      return <Invitations />;
    }
    default: {
      return <Invitations />;
    }
  }
};
