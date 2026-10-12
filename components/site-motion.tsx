"use client";
import {createContext,useContext,type ReactNode} from 'react';
import {MotionConfig} from 'motion/react';
const MotionContext=createContext({enabled:true});
export function useSiteMotion(){return useContext(MotionContext)}
export function SiteMotion({children}:{children:ReactNode}){return <MotionContext.Provider value={{enabled:true}}><MotionConfig reducedMotion="never"><div className="site-motion" data-motion="playing">{children}</div></MotionConfig></MotionContext.Provider>}
