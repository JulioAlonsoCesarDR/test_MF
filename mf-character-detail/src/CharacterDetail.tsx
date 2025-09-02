import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Image } from "react-bootstrap";

function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!character) return <p>No se encontró el personaje.</p>;

  return (
    <Card>
      <Card.Body>
        <Image
          src={character.image}
          alt={character.name}
          rounded
          fluid
          style={{ width: "100%" }}
        />
        <h2>{character.name}</h2>
        <p>
          <strong>Estado:</strong> {character.status}
        </p>
        <p>
          <strong>Especie:</strong> {character.species}
        </p>
        <p>
          <strong>Género:</strong> {character.gender}
        </p>
        <p>
          <strong>Origen:</strong> {character.origin?.name}
        </p>
        <p>
          <strong>Ubicación:</strong> {character.location?.name}
        </p>
        <p>
          <strong>ID:</strong> {character.id}
        </p>
      </Card.Body>
    </Card>
  );
}

export default CharacterDetail;
