// FROM https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
export const iOS = () => {
  const platform =
    (window.navigator as any).userAgentData?.platform || navigator.platform;

  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
};

export const isIOS = iOS();
