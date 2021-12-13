import Button from "components/Button";
import ReactTooltip from "react-tooltip";

type TooltipProps = {};

export default function Tooltip({}: TooltipProps) {
  return (
    <div>
      <p data-for="tooltip">AYO</p>
      <ReactTooltip place="top" effect="solid" />
    </div>
  );
}
