'use client';

import React, { createContext, useContext, useState } from 'react';

type UIContextType = {
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <UIContext.Provider
      value={{
        showModal,
        openModal: () => setShowModal(true),
        closeModal: () => setShowModal(false),
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI must be used within UIProvider');
  return context;
};
