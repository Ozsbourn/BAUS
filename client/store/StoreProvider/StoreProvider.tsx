'use client';

import React, { createContext, ReactNode } from 'react';
import { rootStore } from '@/store/rootStore';

export const StoreContext = createContext(rootStore);

export const StoreWrapper = ({ children }: { children: ReactNode }) => {
  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
};
