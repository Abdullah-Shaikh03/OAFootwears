"use client"
import { ThemeProvider as Themes } from "next-themes";

import { ReactNode } from "react";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Themes attribute="class" defaultTheme="system" enableSystem >
      {children}
    </Themes>
  );
};


export default ThemeProvider;