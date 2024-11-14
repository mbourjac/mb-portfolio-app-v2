import { createContext } from 'react';

type LoaderContextProps = {
  showLoader: boolean;
  setShowLoader: (showLoader: boolean) => void;
};

export const LoaderContext = createContext<LoaderContextProps | null>(null);
