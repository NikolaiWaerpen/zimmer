import AbsoluteContainer from "components/AbsoluteContainer";
import { replaceColor } from "lottie-colorify";
import lottie from "lottie-web";
import loaderAnimation from "public/lottie/loader.json";
import { useEffect } from "react";

type LoaderProps = {
  message?: string;
};

export default function Loader({ message }: LoaderProps) {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#animationContainer") as Element,
      animationData: replaceColor("#eeeeee", "#eeeeee", loaderAnimation),
    });
  }, []);

  return (
    <AbsoluteContainer>
      <div id="animationContainer" className="w-56" />
      {message && <h5>{message}</h5>}
    </AbsoluteContainer>
  );
}
