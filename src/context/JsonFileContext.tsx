// src/context/JsonFileContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface JsonFileContextType {
  selectedFile: string;
  setSelectedFile: (file: string) => void;
}

const JsonFileContext = createContext<JsonFileContextType | undefined>(undefined);

export const JsonFileProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFile, setSelectedFile] = useState<string>('tabelas/balcão/PARTICULAR CREMASCO.json');

  return (
    <JsonFileContext.Provider value={{ selectedFile, setSelectedFile }}>
      {children}
    </JsonFileContext.Provider>
  );
};

export const useJsonFile = () => {
  const context = useContext(JsonFileContext);
  if (context === undefined) {
    throw new Error('useJsonFile must be used within a JsonFileProvider');
  }
  return context;
};
