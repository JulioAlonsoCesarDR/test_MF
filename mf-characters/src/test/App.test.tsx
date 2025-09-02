import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("App component", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  test("renders loading state initially", () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          results: [],
        }),
    });

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();
  });

  test("renders character list after fetch", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          results: [
            {
              id: 1,
              name: "Rick Sanchez",
              status: "Alive",
              species: "Human",
              image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            },
          ],
        }),
    });

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    expect(
      screen.getByText("Personajes de Rick and Morty")
    ).toBeInTheDocument();
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText(/Alive - Human/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Ver detalles/i })
    ).toBeInTheDocument();
  });

  test("renders error message on fetch failure", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Failed to fetch"));

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument();
  });
});
