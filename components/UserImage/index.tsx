type UserImageProps = React.ComponentPropsWithoutRef<"img"> & {};

export default function UserImage({ src, alt }: UserImageProps) {
  return (
    <img
      className="inline-block h-full w-10 rounded-full"
      src={src}
      alt={!alt ? alt : "/images/duck.jpg"}
    />
  );
}
