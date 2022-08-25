import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

export type IconType = IconDefinition;

type IconProps = FontAwesomeIconProps;

export default function Icon({ ...props }: IconProps) {
  return <FontAwesomeIcon {...props} />;
}
