import { Chart } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import React from "react";
import { Bar } from "react-chartjs-2";
export default function PayinChart({graphData}) {
  const [graphs, setGraphs] = React.useState(graphData);

  const option = {
    responsive: true,
    plugins: {
      legend: { position: "chartArea" },
      title: {
        display: true,
        // text: "Modular Bar Chart",
      },
    },
  };
  const data = {
    labels: [
      graphs[0].label.split(" ")[0].slice(0,3)+" "+graphs[0].label.split(" ")[1].slice(2),
      graphs[1].label.split(" ")[0].slice(0,3)+" "+graphs[1].label.split(" ")[1].slice(2),
      graphs[2].label.split(" ")[0].slice(0,3)+" "+graphs[2].label.split(" ")[1].slice(2),
      graphs[3].label.split(" ")[0].slice(0,3)+" "+graphs[3].label.split(" ")[1].slice(2),
      graphs[4].label.split(" ")[0].slice(0,3)+" "+graphs[4].label.split(" ")[1].slice(2),
      graphs[5].label.split(" ")[0].slice(0,3)+" "+graphs[5].label.split(" ")[1].slice(2),
      graphs[6].label.split(" ")[0].slice(0,3)+" "+graphs[6].label.split(" ")[1].slice(2),
      graphs[7].label.split(" ")[0].slice(0,3)+" "+graphs[7].label.split(" ")[1].slice(2),
      graphs[8].label.split(" ")[0].slice(0,3)+" "+graphs[8].label.split(" ")[1].slice(2),
      graphs[9].label.split(" ")[0].slice(0,3)+" "+graphs[9].label.split(" ")[1].slice(2),
      graphs[10].label.split(" ")[0].slice(0,3)+" "+graphs[10].label.split(" ")[1].slice(2),
      graphs[11].label.split(" ")[0].slice(0,3)+" "+graphs[11].label.split(" ")[1].slice(2),
    ],
  
    datasets: [
      {
        label: "Total collected",
        data: [        
        graphs[0].successVolume,graphs[1].successVolume,graphs[2].successVolume,graphs[3].successVolume,graphs[4].successVolume,
        graphs[5].successVolume,graphs[6].successVolume,graphs[7].successVolume,graphs[8].successVolume,graphs[9].successVolume,graphs[10].successVolume,
        graphs[11].successVolume],
        backgroundColor: "#8D9CDB",
      },
    ],
  };
return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",

      }}
    >
      <Bar options={option} data={data} />
    </div>
  );
}
