import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { resultType } from "@/types";

const LineChart = ({ elu, tanh }: { elu: resultType; tanh: resultType }) => {
  const chartRef = useRef(null);
  // Removed dynamic import
  useEffect(() => {
    const options = {
      chart: {
        type: "line",
      },
      markers: {
        size: 5,
      },
      series: [
        {
          name: "Example Series 1",
          data: elu.predictions,
        },
        {
          name: "Example Series 2",
          data: tanh.predictions,
        },
        {
          name: "Actual",
          data: elu.actuals,
        },
      ],
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);
  return (
    <div className="flex  justify-center shadow">
      <div ref={chartRef} className="w-[800px]" />
    </div>
  );
};

export default LineChart;
