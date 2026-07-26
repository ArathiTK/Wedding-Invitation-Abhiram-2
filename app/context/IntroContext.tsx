"use client";
import { createContext, useContext } from "react";

export const IntroContext = createContext({ opened: false });
export const useIntro = () => useContext(IntroContext);
