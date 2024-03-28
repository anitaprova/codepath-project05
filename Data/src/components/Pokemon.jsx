import { useEffect, useState } from "react";
import "./Pokemon.css";

// eslint-disable-next-line react/prop-types
function Pokemon({ name, url }) {
  const [info, setInfo] = useState({});

  useEffect(() => {
    const fetchPokemonInfo = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setInfo(json);
    };

    fetchPokemonInfo().catch(console.error);
  }, []);

  // useEffect(() => {
  //   console.log("list:", info);
  // }, [info]);

  return (
    <div className="pokemon-main">
      <li className="pokemon">
        <p>{name}</p>
        <p className="item"> Weight: {info.weight}</p>
        <p className="item"> Height: {info.height}</p>
        <p className="item">
          {" "}
          Type(s):
          {info.types &&
            info.types.map((t, index) => (
              <span key={index}> {t.type.name} </span>
            ))}
        </p>
      </li>
    </div>
  );
}

export default Pokemon;
