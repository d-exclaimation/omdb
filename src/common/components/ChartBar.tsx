import { type Base } from "@d-exclaimation/common/lib/tailwind";
import { useMemo, type FC } from "react";

type ChartBarProps = {
  percentage: number;
  inactive?: boolean;
};

const ChartBar: FC<ChartBarProps> = ({ percentage, inactive }) => {
  const color = useMemo((): `fill-${Base}` => {
    if (percentage < 0.125) return "fill-rose-200";
    if (percentage < 0.25) return "fill-red-200";
    if (percentage < 0.375) return "fill-orange-200";
    if (percentage < 0.5) return "fill-amber-200";
    if (percentage < 0.625) return "fill-yellow-200";
    if (percentage < 0.75) return "fill-lime-200";
    if (percentage < 0.875) return "fill-emerald-200";
    return "fill-cyan-200";
  }, [percentage]);

  return (
    <svg
      className={`rotate-180 data-[inactive='true']:blur ${color}`}
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
