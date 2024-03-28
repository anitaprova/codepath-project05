import { useEffect, useState } from "react";
import "./Pokemon.css";

// eslint-disable-next-line react/prop-types
function Stats({ pokemonList }) {
 

  useEffect(() => {
    const fetchPokemonInfo = async () => {
      
    };

    fetchPokemonInfo().catch(console.error);
  }, []);

  // useEffect(() => {
  //   console.log("list:", info);
  // }, [info]);

  return (
    <div className="stats">
      <p>Mean Height: </p>
      <p>Mean Weight: </p>
    </div>
  );
}

export default Stats;
