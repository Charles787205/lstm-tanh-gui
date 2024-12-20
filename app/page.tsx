"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { modelConfigType, resultType } from "@/types";

const LineChart = dynamic(() => import("../components/linechart"), {
  ssr: false,
});
export default function Home() {
  const ref = useRef(null);

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

  const [modelConfigInput, setModelConfigInput] = useState({
    ticker: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    sequence_length: "",
    epochs: "",
    train_split: "",
    batch_size: "",
    hidden_size: "",
    learning_rate: "",
    dropout: "",
  });

  const [modelConfig, setModelConfig] = useState<modelConfigType>({
    ticker: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    sequence_length: 0,
    epochs: 0,
    train_split: 0,
    batch_size: 0,
    hidden_size: 0,
    learning_rate: 0,
    dropout: 0,
  });

  const onSubmit = () => {
    fetch("/api/your-endpoint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modelConfig),
    })
      .then((res) => res.json())
      .then((data) => {
        setElu(data.results.ELU);
        setTanh(data.results.Tanh);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      <nav className="flex h-[50px] shadow w-full sticky top-0 py-4 px-3">
        <p>Thesis Prototype</p>
      </nav>

      <main className="flex flex-col w-full h-full gap-8 row-start-2 items-center sm:items-start">
        <div className="flex justify-center w-full gap-10">
          <div className="flex flex-col gap-2">
            <label htmlFor="ticker">Ticker</label>
            <input
              type="text"
              value={modelConfigInput.ticker}
              onChange={(e) =>
                setModelConfigInput({
                  ...modelConfigInput,
                  ticker: e.target.value,
                })
              }
              className="shadow border border-neutral-400 rounded outline-none px-2"
            />

            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              value={modelConfigInput.startDate}
              onChange={(e) =>
                setModelConfigInput({
                  ...modelConfigInput,
                  startDate: e.target.value,
                })
              }
              className="shadow border border-neutral-400 rounded outline-none px-2"
            />

            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              value={modelConfigInput.endDate}
              onChange={(e) =>
                setModelConfigInput({
                  ...modelConfigInput,
                  endDate: e.target.value,
                })
              }
              className="shadow border border-neutral-400 rounded outline-none px-2"
            />

            <label htmlFor="sequence_length">Sequence Length:</label>
            <input
              type="number"
              value={modelConfigInput.sequence_length}
              onChange={(e) =>
                setModelConfigInput({
                  ...modelConfigInput,
                  sequence_length: e.target.value,
                })
              }
              className="shadow border border-neutral-400 rounded outline-none px-2"
            />

            <label htmlFor="epochs">Epochs:</label>
            <input
              type="number"
              value={modelConfigInput.epochs}
              onChange={(e) =>
                setModelConfigInput({
                  ...modelConfigInput,
                  epochs: e.target.value,
                })
              }
              className="shadow border border-neutral-400 rounded outline-none px-2"
            />

            <label htmlFor="train_split">Train Split:</label>
            <input
              type="number"
              value={modelConfigInput.train_split}
              onChange={(e) =>
                setModelConfigInput({
                  ...modelConfigInput,
                  train_split: e.target.value,
                })
              }
              className="shadow border border-neutral-400 rounded outline-none px-2"
            />

            <label htmlFor="batch_size">Batch Size:</label>
            <input
              type="number"
              value={modelConfigInput.batch_size}
              onChange={(e) =>
                setModelConfigInput({
                  ...modelConfigInput,
                  batch_size: e.target.value,
                })
              }
              className="shadow border border-neutral-400 rounded outline-none px-2"
            />

            <label htmlFor="hidden_size">Hidden Size:</label>
            <input
              type="number"
              value={modelConfigInput.hidden_size}
              onChange={(e) =>
                setModelConfigInput({
                  ...modelConfigInput,
                  hidden_size: e.target.value,
                })
              }
              className="shadow border border-neutral-400 rounded outline-none px-2"
            />

            <label htmlFor="learning_rate">Learning Rate:</label>
            <input
              type="number"
              value={modelConfigInput.learning_rate}
              onChange={(e) =>
                setModelConfigInput({
                  ...modelConfigInput,
                  learning_rate: e.target.value,
                })
              }
              className="shadow border border-neutral-400 rounded outline-none px-2"
            />

            <label htmlFor="dropout">Dropout:</label>
            <input
              type="number"
              value={modelConfigInput.dropout}
              onChange={(e) =>
                setModelConfigInput({
                  ...modelConfigInput,
                  dropout: e.target.value,
                })
              }
              className="shadow border border-neutral-400 rounded outline-none px-2"
            />

            <button
              className="bg-blue-500 text-white shadow rounded px-4 py-2"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>

          <div className="flex">
            <LineChart elu={elu} tanh={tanh} />
          </div>
        </div>
      </main>
    </div>
  );
}
