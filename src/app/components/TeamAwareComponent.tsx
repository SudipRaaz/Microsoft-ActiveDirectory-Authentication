'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import * as microsoftTeams from "@microsoft/teams-js";

interface TeamsContextType {
  isTeamsContext: boolean;
  context: microsoftTeams.app.Context | null;
}

interface TeamsContextProviderProps {
  children: React.ReactNode;
}

const TeamsContext = createContext<TeamsContextType>({
  isTeamsContext: false,
  context: null,
});

export function TeamsAwareProvider({ children }: TeamsContextProviderProps) {
  const [teamsContext, setTeamsContext] = useState<TeamsContextType>({
    isTeamsContext: false,
    context: null,
  });

  useEffect(() => {
    const initializeTeams = async () => {
      try {
        await microsoftTeams.app.initialize();
        const context = await microsoftTeams.app.getContext();
        setTeamsContext({
          isTeamsContext: true,
          context,
        });
      } catch (error) {
        console.log('Not running in Teams context');
        // Optionally log the error details
        if (error instanceof Error) {
          console.error('Teams initialization error:', error.message);
        }
      }
    };

    initializeTeams();
  }, []);

  return (
    <TeamsContext.Provider value={teamsContext}>
      {children}
    </TeamsContext.Provider>
  );
}

export const useTeams = () => {
  const context = useContext(TeamsContext);
  if (context === undefined) {
    throw new Error('useTeams must be used within a TeamsAwareProvider');
  }
  return context;
};