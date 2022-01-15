import Tippy, { TippyProps } from "@tippyjs/react";

type TooltipProps = TippyProps & {};

export default function Tooltip({
  children,
  className,
  ...props
}: TooltipProps) {
  return (
    // TODO: Make tippy work
    <Tippy className={`${className} z-1 shadow-lg w-12 h-12`} {...props}>
      {children}
    </Tippy>
  );
}
