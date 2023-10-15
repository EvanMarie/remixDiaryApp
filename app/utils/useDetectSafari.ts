// useDetectSafari.ts
import { useEffect, useState } from "react";

export const useDetectSafari = (): boolean => {
  const [isSafariMobile, setIsSafariMobile] = useState<boolean>(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isSafari = /safari/.test(userAgent);
    const isChrome = /chrome/.test(userAgent);
    const isMobile = /iphone|ipod|ipad/.test(userAgent);

    if (isSafari && !isChrome && isMobile) {
      setIsSafariMobile(true);
    }
  }, []);

  return isSafariMobile;
};


export const useSafeArea = () => {
  const [safeArea, setSafeArea] = useState<string>('0px');

  useEffect(() => {
    // this function checks if CSS environment variables are supported
    const isEnvSupported = window.CSS && window.CSS.supports && window.CSS.supports('top: env(safe-area-inset-top)');
    
    if (isEnvSupported) {
      // we set the safe area bottom inset
      const safeAreaInsetBottom = getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-bottom');
      setSafeArea(safeAreaInsetBottom);
    }
  }, []);

  return safeArea;
};

