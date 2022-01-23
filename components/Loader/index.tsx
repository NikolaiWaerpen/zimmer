import AbsoluteContainer from "components/AbsoluteContainer";
import FullscreenContainer from "components/FullscreenContainer";
import { replaceColor } from "lottie-colorify";
import lottie from "lottie-web";
import loaderAnimation from "public/lottie/loader.json";
import { useEffect } from "react";

type LoaderProps = {
  message?: string;
  fullscreen?: boolean;
};

export default function Loader({ message, fullscreen }: LoaderProps) {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#animationContainer") as Element,
      animationData: replaceColor("#eeeeee", "#eeeeee", loaderAnimation),
    });
  }, []);

  return (
    <>
      {fullscreen ? (
        <FullscreenContainer>
          <AbsoluteContainer>
            <div id="animationContainer" className="w-56" />
            {message && <h5>{message}</h5>}
          </AbsoluteContainer>
        </FullscreenContainer>
      ) : (
        <AbsoluteContainer>
          <div id="animationContainer" className="w-56" />
          {message && <h5>{message}</h5>}
        </AbsoluteContainer>
      )}
    </>
  );
}
