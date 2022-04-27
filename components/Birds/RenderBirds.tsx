import { ReactNode, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import BIRDS from "./birds";

type BirdsPropTypes = React.ComponentPropsWithoutRef<"div"> & {
  children?: ReactNode;
};

export default function RenderBirds({ children, ...props }: BirdsPropTypes) {
  const [vantaEffect, setVantaEffect] = useState();
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          scale: 1.0,
          scaleMobile: 0.7,
          quantity: 4,
          // birdSize: 1,
          // speedLimit: 5.5,
          // alignment: 100,
          // cohesion: 30,
          // separation: 18,
          color1: "#306E38",
          color2: "#7EDA84",
          // colorMode: "lerp",
          backgroundColor: "#000000",
          // backgroundColor: "#ffffff",
          backgroundAlpha: 0,
        })
      );
    }

    return () => {
      // @ts-ignore
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} {...props} />;
}
