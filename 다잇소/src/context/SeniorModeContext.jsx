import { createContext, useContext, useState } from 'react';

const SeniorModeContext = createContext(null);

export function SeniorModeProvider({ children }) {
  const [senior, setSenior] = useState(false);

  function toggle() {
    setSenior(v => {
      const next = !v;
      if (next) {
        document.documentElement.classList.add('senior-mode');
      } else {
        document.documentElement.classList.remove('senior-mode');
      }
      return next;
    });
  }

  return (
    <SeniorModeContext.Provider value={{ senior, toggle }}>
      {children}
    </SeniorModeContext.Provider>
  );
}

export function useSeniorMode() {
  return useContext(SeniorModeContext);
}
