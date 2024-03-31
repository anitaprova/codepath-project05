import React, { Component, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from "recharts";

const PokemonChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getCoinHist = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/berry/");
      const json = await response.json();

      const list = await Promise.all(
        json.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const data = await response.json();
          return { ...data, url: pokemon.url };
        })
      );
      setData(list);
    };
    getCoinHist().catch(console.error);
  }, []);

  const cleanData = (d) => {
    let filteredData = [];
    if (d) {
      filteredData = d.map((item) => ({
        name: item.name,
        size: item.size,
      }));
    }
    return filteredData;
  };

  // console.log(cleanData(data));

  return (
    <div>
      {data ? (
          <div className="chart">
            <br></br>
            <h2>Size of Berries for Pokemon</h2>
            <LineChart
              width={800}
              height={400}
              data={cleanData(data)}
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 30,
              }}
            >
              <Line
                type="monotone"
                dataKey="size"
                activeDot={{ r: 5 }}
              />
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="name" interval={0} angle={35} dx={20}>
                <Label
                  value="Berries"
                  offset={-20}
                  position="insideBottom"
                />
              </XAxis>

              <YAxis
                label={{
                  value: "size",
                  angle: -90,
                  position: "insideLeft",
                  textAnchor: "middle",
                }}
              />
              <Tooltip />
            </LineChart>
          </div>
        ) : null}
    </div>
  );
};

export default PokemonChart;
