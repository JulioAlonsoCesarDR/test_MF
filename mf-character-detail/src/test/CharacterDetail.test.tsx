import { render, screen, waitFor } from "@testing-library/react";
import CharacterDetail from "../CharacterDetail";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const mockCharacter = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  gender: "Male",
  origin: { name: "Earth" },
  location: { name: "Earth" },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
};

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("CharacterDetail component", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  test("renders loading state initially", () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockCharacter),
    });

    render(
      <MemoryRouter initialEntries={["/characterdetail/1"]}>
        <Routes>
          <Route path="/characterdetail/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();
  });

  test("renders character details after fetch", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockCharacter),
    });

    render(
      <MemoryRouter initialEntries={["/characterdetail/1"]}>
        <Routes>
          <Route path="/characterdetail/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockCharacter.status, "i"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockCharacter.species, "i"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockCharacter.gender, "i"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockCharacter.origin.name, "i"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockCharacter.location.name, "i"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(String(mockCharacter.id), "i"))
    ).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", mockCharacter.image);
  });
});
