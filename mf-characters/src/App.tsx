import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { Button, Image } from "react-bootstrap";

function App() {
  type Character = {
    id: number;
    name: string;
    status: string;
    species: string;
    image: string;
  };

  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Personajes de Rick and Morty</h1>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      <div
        className="d-flex flex-wrap justify-content-center gap-1"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        {characters.map((char) => (
          <div
            key={char.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              width: "180px",
              textAlign: "center",
              background: "#f9f9f9",
            }}
          >
            <Image
              src={char.image}
              alt={char.name}
              rounded
              fluid
              style={{ width: "100%" }}
            />
            <h3 style={{ fontSize: "1rem", margin: "0.5rem 0" }}>
              {char.name}
            </h3>
            <p style={{ margin: 0 }}>
              {char.status} - {char.species}
            </p>
            <Link
              to={`/characterdetail/${char.id}`}
              style={{ textDecoration: "none" }}
            >
              <Button style={{ marginTop: "0.5rem" }}>Ver detalles</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
