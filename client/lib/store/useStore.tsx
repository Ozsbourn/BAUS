import { useContext } from 'react';
import { StoreContext } from '@/store/StoreProvider/StoreProvider';

export const useStores = () => {
  return useContext(StoreContext);
};
