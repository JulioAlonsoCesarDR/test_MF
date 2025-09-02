import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

const Characters = lazy(() => import("mf_characters/App"));
const CharacterDetail = lazy(
  () => import("mf_character_detail/CharacterDetail")
);

function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "1rem",
            background: "#222",
            color: "#fff",
          }}
        >
          <nav style={{ marginLeft: "2rem" }}>
            <Link to="/" style={{ color: "#fff", marginRight: "1rem" }}>
              Personajes
            </Link>
          </nav>
        </header>
        <main style={{ padding: "2rem" }}>
          <Suspense fallback={<div>Cargando...</div>}>
            <Routes>
              <Route path="/" element={<Characters />} />
              <Route
                path="/characterdetail/:id"
                element={<CharacterDetail />}
              />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
