import RenderBirds from "./RenderBirds";

export default function Birds() {
  return (
    <div className="absolute left-0 right-0 bottom-0 top-0 z-[-1]">
      {/* DIV FOR BIRDS TO BE IN */}
      <div className="w-full h-full relative">
        {/* LEFT BORDER */}
        <div className="absolute left-0 right-[95%] bottom-0 top-0">
          <div className="w-full h-full bg-gradient-to-l from-transparent to-white absolute"></div>
        </div>
        {/* RIGHT BORDER */}
        <div className="absolute right-0 left-[95%] bottom-0 top-0">
          <div className="w-full h-full bg-gradient-to-r from-transparent to-white absolute"></div>
        </div>
        {/* TOP BORDER */}
        <div className="absolute right-0 left-0 bottom-[90%] top-0">
          <div className="mt-16 w-full h-full bg-gradient-to-t from-transparent to-white absolute"></div>
        </div>
        {/* BOTTOM BORDER */}
        <div className="absolute right-0 left-0 bottom-0 top-[70%]">
          <div className="w-full h-full bg-gradient-to-b from-transparent to-white absolute"></div>
        </div>
        {/* DIV MAKING BIRDS LESS OPAQUE */}
        <div className="w-full h-full bg-white opacity-[0.2] absolute" />
        <RenderBirds className="w-full h-full z-[-2]" />
      </div>
    </div>
  );
}
