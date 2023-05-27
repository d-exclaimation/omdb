import { Opacity } from "@d-exclaimation/common/tailwind";
import { useMemo, type FC } from "react";

type ChartBarProps = {
  percentage: number;
  inactive?: boolean;
};

const ChartBar: FC<ChartBarProps> = ({ percentage, inactive }) => {
  const color =
    useMemo((): `fill-chart/${Opacity} dark:fill-chart-dark/${Opacity}` => {
      if (percentage < 0.125) return "fill-chart/20 dark:fill-chart-dark/20";
      if (percentage < 0.25) return "fill-chart/30 dark:fill-chart-dark/30";
      if (percentage < 0.375) return "fill-chart/40 dark:fill-chart-dark/40";
      if (percentage < 0.5) return "fill-chart/50 dark:fill-chart-dark/50";
      if (percentage < 0.625) return "fill-chart/60 dark:fill-chart-dark/60";
      if (percentage < 0.75) return "fill-chart/70 dark:fill-chart-dark/70";
      if (percentage < 0.875) return "fill-chart/80 dark:fill-chart-dark/80";
      return "fill-chart/100 dark:fill-chart-dark/100";
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
      <rect
        className="animate-to-full-height"
        width="32"
        height={`${Math.round(percentage * 80)}`}
        rx="2.5"
      />
    </svg>
  );
};

export default ChartBar;
