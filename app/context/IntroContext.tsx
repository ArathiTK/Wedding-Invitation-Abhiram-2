"use client";
import { createContext, useContext } from "react";

export const IntroContext = createContext({ opened: false, tapped: false });
export const useIntro = () => useContext(IntroContext);
