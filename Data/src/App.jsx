import { useEffect, useState } from "react";
import './App.css'

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const response = await fetch(
        ""
      );
      const json = await response.json();
      setList(json);
    };
    // console.log(list);
    fetchAll().catch(console.error);

  }, []);


  return (
    <div className="whole-page">
      <h1>View the Current Air Quality</h1>
      <ul>
        {list &&
          Object.entries(list).map((art) => <li key={art.id}>{art.title}</li>)}
      </ul>
    </div>
  );
}

export default App
