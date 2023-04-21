import { type FC } from "react";

type ChartBarProps = {
  percentage: number;
  inactive?: boolean;
};

const ChartBar: FC<ChartBarProps> = ({ percentage, inactive }) => {
  return (
    <svg
      className="rotate-180 data-[inactive='true']:blur fill-lime-200"
      data-inactive={inactive}
      width="32"
      height="80"
      viewBox="0 0 32 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height={`${Math.round(percentage * 80)}`} rx="2.5" />
    </svg>
  );
};

export default ChartBar;
