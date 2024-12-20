"use client";
import React from "react";
import dynamic from "next/dynamic";
import { resultType } from "@/types";
import { ApexOptions } from "apexcharts";
// Dynamically import ApexCharts with SSR disabled for Next.js
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChart = ({ elu, tanh }: { elu: resultType; tanh: resultType }) => {
  console.log(elu, tanh);
  const options: ApexOptions = {
    chart: {
      type: "line",
    },
    markers: {
      size: 5,
    },
    series: [
      {
        name: "ELU Predictions",
        data: elu.predictions.length > 0 ? elu.predictions : [0],
      },
      {
        name: "Tanh Predictions",
        data: tanh.predictions.length > 0 ? tanh.predictions : [0],
      },
      {
        name: "Actual",
        data: elu.actuals.length > 0 ? elu.actuals : [0],
      },
    ],
  };

  return (
    <div className="flex justify-center shadow">
      <ApexChart options={options} series={options.series} />
    </div>
  );
};

export default React.memo(LineChart);
