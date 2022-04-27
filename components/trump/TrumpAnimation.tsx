import AbsoluteContainer from "components/AbsoluteContainer";
import FullscreenContainer from "components/FullscreenContainer";
import { replaceColor } from "lottie-colorify";
import lottie from "lottie-web";
import trumpAnimation from "public/lottie/trump.json";
import { useEffect } from "react";

export default function TrumpAnimation() {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#animationContainer") as Element,
      animationData: replaceColor("#eeeeee", "#eeeeee", trumpAnimation),
    });
  }, []);

  return (
    <div className="w-96 h-96">
      <div className="absolute left-0 right-0 bottom-0 top-0">
        <div className="w-full h-full relative">
          <div className="absolute right-0 left-0 bottom-0 top-[80%] z-50">
            <div className="w-full h-full bg-gradient-to-t from-white absolute"></div>
          </div>
          <div className="flex w-full h-full justify-center items-end">
            <div id="animationContainer" className="w-96 lg:w-[32rem]" />
          </div>
        </div>
      </div>
    </div>
  );
}
