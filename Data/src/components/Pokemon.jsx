import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Pokemon.css";

// eslint-disable-next-line react/prop-types
function Pokemon({ index, name, url }) {
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
        <Link
          style={{ color: "Black" }}
          to={`/Pokemon/${url.charAt(url.length - 2)}`}
          key={url.charAt(url.length - 2)}
        >
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
        </Link>
      </li>
    </div>
  );
}

export default Pokemon;
