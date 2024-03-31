import { useEffect, useState } from "react";
import Pokemon from "./components/Pokemon.jsx";
import PokemonChart from "./components/PokemonChart.jsx";
import "./App.css";

function App() {
  const [list, setList] = useState();
  const [filteredResults, setFilteredResults] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [all, setAll] = useState();
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
      const json = await response.json();

      const pokemonList = await Promise.all(
        json.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const data = await response.json();
          return { ...data, url: pokemon.url };
        })
      );
      setAll(pokemonList);

      setList(json);
    };
    fetchAll().catch(console.error);
  }, []);

  // useEffect(() => {
  //   console.log("all:", all);
  // }, [all]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue.toLowerCase());

    if (!searchValue && !selectedType) {
      setFilteredResults(list.results);
    } else {
      const filteredData = list.results.filter((pokemon, index) => {
        const nameMatch = pokemon.name.includes(searchValue.toLowerCase());

        const typeMatch =
          selectedType === "" ||
          all[index].types.some((type) => type.type.name === selectedType);

        return nameMatch && typeMatch;
      });
      setFilteredResults(filteredData);
    }
  };

  const calculateMeanWeight = () => {
    if (!all || all.length === 0) {
      return 0;
    }
    const totalWeight = all.reduce(
      (total, pokemon) => total + pokemon.weight,
      0
    );
    return totalWeight / all.length;
  };

  const calculateMeanHeight = () => {
    if (!all || all.length === 0) {
      return 0;
    }
    const totalHeight = all.reduce(
      (total, pokemon) => total + pokemon.height,
      0
    );
    return totalHeight / all.length;
  };

  return (
    <div className="whole-page">
      <h1 className="title">Pokemon</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          onChange={(inputString) => searchItems(inputString.target.value)}
        />

        <select onChange={(e) => setSelectedType(e.target.value)}>
          <option value="">All Types</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
        </select>
      </div>

      <div className="pokemon-body">
        <PokemonChart />
        <div>
          {searchInput.length > 0
            ? filteredResults && (
                <>
                  <p>Currently Viewing: {filteredResults.length}</p>
                  {filteredResults.map((pokemon) => (
                      <Pokemon
                        key={pokemon.name}
                        name={pokemon.name}
                        url={pokemon.url}
                      />
                  ))}
                </>
              )
            : list && (
                <>
                  <p>Currently Viewing: {list.results.length}</p>
                  <p>Mean Weight: {calculateMeanWeight()}</p>
                  <p>Mean Height: {calculateMeanHeight()}</p>
                  <ul>
                    {list.results.map((pokemon) => (
                      <Pokemon
                        key={pokemon.name}
                        name={pokemon.name}
                        url={pokemon.url}
                      />
                    ))}
                  </ul>
                </>
              )}
        </div>
      </div>
    </div>
  );
}

export default App;
