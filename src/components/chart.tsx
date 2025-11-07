"use client";

import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

type Props = {
  option: EChartsOption;
  height?: number | string;
  className?: string;
};

export default function Chart({ option, height = 320, className }: Props) {
  return (
    <div className={className}>
      <ReactECharts option={option} style={{ height }} notMerge lazyUpdate />
    </div>
  );
}
