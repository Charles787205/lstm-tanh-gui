"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { modelConfigType, resultType } from "@/types";
import util from "util";
export default function Home() {
  const LineChart = dynamic(() => import("../components/linechart"), {
    ssr: false,
  });
  const [elu, setElu] = useState<resultType>({
    predictions: [],
    actuals: [],
    metrics: {
      rmse: 0,
      mae: 0,
      msa: 0,
      r2: 0,
    },
  });
  const [tanh, setTanh] = useState<resultType>({
    predictions: [],
    actuals: [],
    metrics: {
      rmse: 0,
      mae: 0,
      msa: 0,
      r2: 0,
    },
  });
  const [modelConfig, setModelConfig] = useState<modelConfigType>({
    ticker: "",
    startDate: "",
    endDate: "",
    sequence_length: 0,
    epochs: 0,
    train_split: 0,
    batch_size: 0,
    hidden_size: 0,
    learning_rate: 0,
    droppout: 0,
  });

  const onSubmit = () => {
    fetch("", {
      method: "POST",
      body: JSON.stringify(modelConfig),
    }).then((res) => {
      res.json().then((data) => {
        const elu = data.results.ELU;
        const tanh = data.results.Tanh;
        setElu(elu);
        setTanh(tanh);
      });
    });
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen  gap-16 font-[family-name:var(--font-geist-sans)]">
      <nav className="flex h-[50px] shadow w-full sticky top-0 py-4 px-3 ">
        <p>Thesis Prototype</p>
        <ul className="flex">
          <li></li>
        </ul>
      </nav>
      <main className="flex flex-col w-full h-full gap-8 row-start-2 items-center sm:items-start">
        <div className="flex justify-center w-full gap-10">
          <div className="flex flex-col gap-2">
            <label htmlFor="">Ticker</label>
            <input
              type="text"
              value={modelConfig.ticker}
              onChange={(e) =>
                setModelConfig({ ...modelConfig, ticker: e.target.value })
              }
              className="shadow border border-neutral-400 rounded outline-none px-2"
            />
            <label htmlFor="">Start Date:</label>
            <input
              value={modelConfig.startDate}
              onChange={(e) =>
                setModelConfig({ ...modelConfig, startDate: e.target.value })
              }
              type="date"
              className="shadow border border-neutral-400 rounded outline-none px-2"
            />
            <label htmlFor="">End Date:</label>
            <input
              value={modelConfig.endDate}
              onChange={(e) =>
                setModelConfig({ ...modelConfig, endDate: e.target.value })
              }
              type="date"
              className="shadow border border-neutral-400 rounded outline-none px-2"
            />
            <label htmlFor="">Sequence Length:</label>
            <input
              value={modelConfig.sequence_length}
              onChange={(e) =>
                setModelConfig({
                  ...modelConfig,
                  sequence_length: parseInt(e.target.value),
                })
              }
              type="number"
              className="shadow border border-neutral-400 rounded outline-none px-2"
            />
            <label htmlFor="">Epochs:</label>
            <input
              type="number"
              value={modelConfig.epochs}
              onChange={(e) =>
                setModelConfig({
                  ...modelConfig,
                  epochs: parseInt(e.target.value),
                })
              }
              className="shadow border border-neutral-400 rounded outline-none px-2"
            />
            <label htmlFor="">Train Split:</label>
            <input
              value={modelConfig.train_split}
              onChange={(e) =>
                setModelConfig({
                  ...modelConfig,
                  train_split: parseInt(e.target.value),
                })
              }
              type="number"
              className="shadow border border-neutral-400 rounded outline-none px-2"
            />
            <label htmlFor="">Batch Size:</label>
            <input
              value={modelConfig.batch_size}
              onChange={(e) =>
                setModelConfig({
                  ...modelConfig,
                  batch_size: parseInt(e.target.value),
                })
              }
              type="number"
              className="shadow border border-neutral-400 rounded outline-none px-2"
            />
            <label htmlFor="">Hidden Size:</label>
            <input
              value={modelConfig.hidden_size}
              onChange={(e) =>
                setModelConfig({
                  ...modelConfig,
                  hidden_size: parseInt(e.target.value),
                })
              }
              type="number"
              className="shadow border border-neutral-400 rounded outline-none px-2"
            />
            <label htmlFor="">Learning Rate:</label>
            <input
              value={modelConfig.learning_rate}
              onChange={(e) =>
                setModelConfig({
                  ...modelConfig,
                  learning_rate: parseInt(e.target.value),
                })
              }
              type="number"
              className="shadow border border-neutral-400 rounded outline-none px-2"
            />
            <label htmlFor="">Droppout:</label>
            <input
              value={modelConfig.droppout}
              onChange={(e) =>
                setModelConfig({
                  ...modelConfig,
                  droppout: parseInt(e.target.value),
                })
              }
              type="number"
              className="shadow border border-neutral-400 rounded outline-none px-2"
            />
            <button
              className="bg-blue-500 text-white shadow rounded"
              onClick={() => onSubmit()}
            >
              Submit
            </button>
          </div>
          <LineChart elu={elu} tanh={tanh} />
        </div>
      </main>
    </div>
  );
}
