import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function PokemonDetails() {
  let params = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + params.symbol
      );
      const json = await response.json();

      setFullDetails({
        name: json.name,
        types: json.types.map((item) => item.type.name),
        img: json.sprites.front_default,
        abilities: json.abilities.map((item) => item.ability.name),
        base_experince: json.base_experience,
        stats: json.stats,
        height: json.height,
        weight: json.weight,
      });
    };

    fetchDetails().catch(console.error);
  }, [params.symbol]);

  // console.log("here", fullDetails.stats);

  return (
    <div className="details-container">
      {fullDetails && (
        <div className="pokemon-details">
          <h1>{fullDetails.name.toUpperCase()}</h1>
          <img src={fullDetails.img} />
          <p>Height: {fullDetails.height}</p>
          <p>Weight: {fullDetails.weight}</p>
          <p>Types: {fullDetails.types.join(" ")}</p>
          <p>Abilities: {fullDetails.abilities.join(", ")}</p>
          <p>Base Experince: {fullDetails.base_experince}</p>
        </div>
      )}

      <div>
        {fullDetails && fullDetails.stats && (
          <div className="stats">
            Stats:
            {fullDetails.stats.map((item, index) => (
              
              <div key={index}>{item.stat.name} : {item.base_stat}</div>
            ) 
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonDetails;
